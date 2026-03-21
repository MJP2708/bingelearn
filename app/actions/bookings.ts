"use server";

import { addMinutes } from "date-fns";
import { revalidatePath } from "next/cache";
import { generateMeetingUrl } from "@/lib/meeting";
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

  if (isMockMode()) {
    revalidatePath("/dashboard");
    revalidatePath(`/tutors/${tutorId}`);
    return;
  }

  const startTime = new Date(startTimeRaw);

  await prisma.booking.create({
    data: {
      studentId: student.id,
      tutorId,
      lessonId,
      startTime,
      endTime: addMinutes(startTime, durationMinutes),
      status: "PENDING",
      meetingUrl: generateMeetingUrl(),
    },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/tutors/${tutorId}`);
}
