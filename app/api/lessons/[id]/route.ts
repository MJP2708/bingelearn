import { NextResponse } from "next/server";
import { getMockPublishedLessons } from "@/lib/mock-data";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { requireTutor } from "@/lib/rbac";
import { lessonSchema } from "@/lib/validators";

export async function GET(_: Request, context: RouteContext<"/api/lessons/[id]">) {
  const { id } = await context.params;

  if (isMockMode()) {
    const lesson = getMockPublishedLessons().find((item) => item.id === id);

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found." }, { status: 404 });
    }

    return NextResponse.json(lesson);
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      subject: true,
      tutor: {
        include: { tutorProfile: true },
      },
    },
  });

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found." }, { status: 404 });
  }

  return NextResponse.json(lesson);
}

export async function PATCH(request: Request, context: RouteContext<"/api/lessons/[id]">) {
  const tutor = await requireTutor();
  const { id } = await context.params;
  const parsed = lessonSchema.partial().safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (isMockMode()) {
    return NextResponse.json({
      count: 1,
      id,
      tutorId: tutor.id,
      ...parsed.data,
    });
  }

  const result = await prisma.lesson.updateMany({
    where: {
      id,
      tutorId: tutor.id,
    },
    data: parsed.data,
  });

  return NextResponse.json(result);
}

export async function DELETE(_: Request, context: RouteContext<"/api/lessons/[id]">) {
  const tutor = await requireTutor();
  const { id } = await context.params;

  if (isMockMode()) {
    return NextResponse.json({ ok: true, id, tutorId: tutor.id });
  }

  await prisma.lesson.deleteMany({
    where: {
      id,
      tutorId: tutor.id,
    },
  });

  return NextResponse.json({ ok: true });
}
