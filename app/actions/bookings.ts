"use server";

import { addMinutes } from "date-fns";
import { revalidatePath } from "next/cache";
import { generateMeetingUrl } from "@/lib/meeting";
import { createMockBooking } from "@/lib/mock-data";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/rbac";

export async function createBooking(formData: FormData) {
  const student = await requireStudent();
  const tutorId = formData.get("tutorId")?.toString();
  const lessonId = formData.get("lessonId")?.toString() || null;
  const startTimeRaw = formData.get("startTime")?.toString();
  const durationMinutes = Number(formData.get("durationMinutes")?.toString() ?? "60");

  if (!tutorId || !startTimeRaw) {
    return;
  }

  const startTime = new Date(startTimeRaw);
  const endTime = addMinutes(startTime, durationMinutes);
  const meetingUrl = generateMeetingUrl();

  if (isMockMode()) {
    if (!Number.isNaN(startTime.getTime())) {
      createMockBooking({
        studentId: student.id,
        tutorId,
        lessonId,
        startTime,
        endTime,
        meetingUrl,
      });
    }
    revalidatePath("/dashboard");
    revalidatePath("/student");
    revalidatePath(`/tutors/${tutorId}`);
    return;
  }

  await prisma.booking.create({
    data: {
      studentId: student.id,
      tutorId,
      lessonId,
      startTime,
      endTime,
      status: "PENDING",
      meetingUrl,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/tutors/${tutorId}`);
}
