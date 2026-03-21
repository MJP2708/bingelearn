import { addMinutes } from "date-fns";
import { NextResponse } from "next/server";
import { generateMeetingUrl } from "@/lib/meeting";
import { mockBookings } from "@/lib/mock-data";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/rbac";
import { bookingSchema } from "@/lib/validators";

export async function GET() {
  const student = await requireStudent();

  if (isMockMode()) {
    return NextResponse.json(mockBookings.filter((booking) => booking.studentId === student.id));
  }

  const bookings = await prisma.booking.findMany({
    where: { studentId: student.id },
    include: {
      tutor: {
        include: {
          tutorProfile: true,
        },
      },
      lesson: true,
    },
    orderBy: { startTime: "asc" },
  });

  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  const student = await requireStudent();
  const parsed = bookingSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (isMockMode()) {
    return NextResponse.json(
      {
        id: "mock-booking-created",
        studentId: student.id,
        tutorId: parsed.data.tutorId,
        lessonId: parsed.data.lessonId || null,
        startTime: parsed.data.startTime,
        endTime: addMinutes(parsed.data.startTime, parsed.data.durationMinutes),
        meetingUrl: generateMeetingUrl(),
        status: "PENDING",
      },
      { status: 201 },
    );
  }

  const booking = await prisma.booking.create({
    data: {
      studentId: student.id,
      tutorId: parsed.data.tutorId,
      lessonId: parsed.data.lessonId || null,
      startTime: parsed.data.startTime,
      endTime: addMinutes(parsed.data.startTime, parsed.data.durationMinutes),
      meetingUrl: generateMeetingUrl(),
      status: "PENDING",
    },
  });

  return NextResponse.json(booking, { status: 201 });
}
