import { NextResponse } from "next/server";
import { getMockPublishedLessons } from "@/lib/mock-data";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { requireTutor } from "@/lib/rbac";
import { lessonSchema } from "@/lib/validators";

export async function GET() {
  if (isMockMode()) {
    return NextResponse.json(getMockPublishedLessons());
  }

  const lessons = await prisma.lesson.findMany({
    where: { isPublished: true },
    include: {
      subject: true,
      tutor: {
        include: {
          tutorProfile: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(lessons);
}

export async function POST(request: Request) {
  const tutor = await requireTutor();
  const parsed = lessonSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (isMockMode()) {
    return NextResponse.json(
      {
        id: "mock-created-lesson",
        tutorId: tutor.id,
        ...parsed.data,
        isPublished: parsed.data.isPublished ?? false,
      },
      { status: 201 },
    );
  }

  const lesson = await prisma.lesson.create({
    data: {
      tutorId: tutor.id,
      ...parsed.data,
      isPublished: parsed.data.isPublished ?? false,
    },
    include: {
      subject: true,
    },
  });

  return NextResponse.json(lesson, { status: 201 });
}
