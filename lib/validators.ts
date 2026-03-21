import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(["STUDENT", "TUTOR"]),
});

export const lessonSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  subjectId: z.string().min(1),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  durationMinutes: z.coerce.number().int().min(15).max(180),
  isPublished: z.boolean().optional(),
});

export const bookingSchema = z.object({
  tutorId: z.string().min(1),
  lessonId: z.string().optional(),
  startTime: z.coerce.date(),
  durationMinutes: z.coerce.number().int().min(30).max(180),
});

export const availabilitySchema = z.object({
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
});
