"use server";

import { revalidatePath } from "next/cache";
import { LessonDifficulty } from "@prisma/client";
import { createMockAvailabilitySlot, createMockLesson, deleteMockAvailabilitySlot, deleteMockLesson, updateMockLessonPublish } from "@/lib/mock-data";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { requireTutor } from "@/lib/rbac";

export async function createLesson(formData: FormData) {
  const tutor = await requireTutor();
  const title = formData.get("title")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";
  const subjectId = formData.get("subjectId")?.toString() ?? "";
  const difficulty = (formData.get("difficulty")?.toString() ?? "BEGINNER") as LessonDifficulty;
  const durationMinutes = Number(formData.get("durationMinutes")?.toString() ?? "60");
  const isPublished = formData.get("isPublished")?.toString() === "true";

  if (isMockMode()) {
    createMockLesson({
      tutorId: tutor.id,
      title,
      description,
      subjectId,
      difficulty,
      durationMinutes,
      isPublished,
    });
    revalidatePath("/tutor/lessons");
    revalidatePath("/lessons");
    revalidatePath(`/tutors/${tutor.tutorProfile?.id ?? ""}`);
    return;
  }

  await prisma.lesson.create({
    data: {
      tutorId: tutor.id,
      title,
      description,
      subjectId,
      difficulty,
      durationMinutes,
      isPublished,
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
    updateMockLessonPublish(lessonId, tutor.id, isPublished);
    revalidatePath("/tutor/lessons");
    revalidatePath("/lessons");
    revalidatePath(`/tutors/${tutor.tutorProfile?.id ?? ""}`);
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
    deleteMockLesson(lessonId, tutor.id);
    revalidatePath("/tutor/lessons");
    revalidatePath("/lessons");
    revalidatePath(`/tutors/${tutor.tutorProfile?.id ?? ""}`);
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
  const startsAt = new Date(formData.get("startsAt")?.toString() ?? "");
  const endsAt = new Date(formData.get("endsAt")?.toString() ?? "");

  if (isMockMode()) {
    if (!Number.isNaN(startsAt.getTime()) && !Number.isNaN(endsAt.getTime()) && endsAt > startsAt) {
      createMockAvailabilitySlot({ tutorId: tutor.id, startsAt, endsAt });
    }
    revalidatePath("/tutor/availability");
    revalidatePath(`/tutors/${tutor.tutorProfile?.id ?? ""}`);
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
    deleteMockAvailabilitySlot(slotId);
    revalidatePath("/tutor/availability");
    return;
  }

  await prisma.availabilitySlot.delete({
    where: { id: slotId },
  });

  revalidatePath("/tutor/availability");
}
