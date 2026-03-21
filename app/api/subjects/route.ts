import { NextResponse } from "next/server";
import { mockSubjects } from "@/lib/mock-data";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";

export async function GET() {
  if (isMockMode()) {
    return NextResponse.json(mockSubjects);
  }

  const subjects = await prisma.subject.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(subjects);
}

export async function POST(request: Request) {
  await requireAdmin();

  if (isMockMode()) {
    const body = (await request.json()) as { name?: string; slug?: string };
    return NextResponse.json(
      {
        id: `subject-${body.slug ?? "mock"}`,
        name: body.name ?? "Mock Subject",
        slug: body.slug ?? "mock-subject",
      },
      { status: 201 },
    );
  }

  const body = (await request.json()) as { name?: string; slug?: string };

  if (!body.name || !body.slug) {
    return NextResponse.json({ error: "Name and slug are required." }, { status: 400 });
  }

  const subject = await prisma.subject.create({
    data: {
      name: body.name,
      slug: body.slug,
    },
  });

  return NextResponse.json(subject, { status: 201 });
}
