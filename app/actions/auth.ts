"use server";

import { UserRole } from "@prisma/client";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";

type RegisterState = {
  error: string;
  success: string;
};

export async function registerUser(_: RegisterState, formData: FormData): Promise<RegisterState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return {
      error: "Please complete all fields with valid information.",
      success: "",
    };
  }

  if (isMockMode()) {
    redirect("/login?registered=1");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (existingUser) {
    return {
      error: "An account with that email already exists.",
      success: "",
    };
  }

  const passwordHash = await hash(parsed.data.password, 10);
  const role = parsed.data.role as UserRole;

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role,
      studentProfile: role === UserRole.STUDENT ? { create: {} } : undefined,
      tutorProfile:
        role === UserRole.TUTOR
          ? {
              create: {
                hourlyRate: 40,
                headline: "New tutor profile awaiting approval",
                yearsExperience: 1,
              },
            }
          : undefined,
    },
  });

  redirect("/login?registered=1");
}
