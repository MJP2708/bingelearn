"use server";

import { revalidatePath } from "next/cache";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { requireTutor } from "@/lib/rbac";

export async function createLesson(formData: FormData) {
  const tutor = await requireTutor();

  if (isMockMode()) {
    revalidatePath("/tutor/lessons");
    revalidatePath("/lessons");
    return;
  }

  await prisma.lesson.create({
    data: {
      tutorId: tutor.id,
      title: formData.get("title")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
      subjectId: formData.get("subjectId")?.toString() ?? "",
      difficulty: (formData.get("difficulty")?.toString() ?? "BEGINNER") as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
      durationMinutes: Number(formData.get("durationMinutes")?.toString() ?? "60"),
      isPublished: formData.get("isPublished")?.toString() === "true",
    },
  });

  revalidatePath("/tutor/lessons");
  revalidatePath("/lessons");
}

export async function toggleLessonPublish(formData: FormData) {
  const tutor = await requireTutor();
  const lessonId = formData.get("lessonId")?.toString();
  const isPublished = formData.get("isPublished")?.toString() === "true";

  if (!lessonId) {
    return;
  }

  if (isMockMode()) {
    revalidatePath("/tutor/lessons");
    revalidatePath("/lessons");
    return;
  }

  await prisma.lesson.updateMany({
    where: {
      id: lessonId,
      tutorId: tutor.id,
    },
    data: {
      isPublished,
    },
  });

  revalidatePath("/tutor/lessons");
  revalidatePath("/lessons");
}

export async function deleteLesson(formData: FormData) {
  const tutor = await requireTutor();
  const lessonId = formData.get("lessonId")?.toString();

  if (!lessonId) {
    return;
  }

  if (isMockMode()) {
    revalidatePath("/tutor/lessons");
    revalidatePath("/lessons");
    return;
  }

  await prisma.lesson.deleteMany({
    where: {
      id: lessonId,
      tutorId: tutor.id,
    },
  });

  revalidatePath("/tutor/lessons");
  revalidatePath("/lessons");
}

export async function createAvailabilitySlot(formData: FormData) {
  const tutor = await requireTutor();

  if (isMockMode()) {
    revalidatePath("/tutor/availability");
    return;
  }

  const profile = await prisma.tutorProfile.findUnique({
    where: { userId: tutor.id },
  });

  if (!profile) {
    return;
  }

  await prisma.availabilitySlot.create({
    data: {
      tutorProfileId: profile.id,
      startsAt: new Date(formData.get("startsAt")?.toString() ?? ""),
      endsAt: new Date(formData.get("endsAt")?.toString() ?? ""),
    },
  });

  revalidatePath("/tutor/availability");
  revalidatePath(`/tutors/${profile.id}`);
}

export async function deleteAvailabilitySlot(formData: FormData) {
  await requireTutor();
  const slotId = formData.get("slotId")?.toString();

  if (!slotId) {
    return;
  }

  if (isMockMode()) {
    revalidatePath("/tutor/availability");
    return;
  }

  await prisma.availabilitySlot.delete({
    where: { id: slotId },
  });

  revalidatePath("/tutor/availability");
}
