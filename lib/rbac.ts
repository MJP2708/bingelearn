import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getMockUserForRole } from "@/lib/mock-data";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { getDefaultRouteForRole } from "@/lib/role-routes";

export async function getSession() {
  return getServerSession(authOptions);
}

export async function getCurrentUser() {
  if (isMockMode()) {
    return getMockUserForRole(UserRole.STUDENT);
  }

  const session = await getSession();

  if (!session?.user?.id) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      studentProfile: true,
      tutorProfile: {
        include: {
          tutorSubjects: {
            include: {
              subject: true,
            },
          },
        },
      },
    },
  });
}

async function requireRole(role: UserRole) {
  if (isMockMode()) {
    return getMockUserForRole(role);
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(getDefaultRouteForRole(role))}`);
  }

  if (user.role !== role) {
    redirect(getDefaultRouteForRole(user.role));
  }

  return user;
}

export async function requireStudent() {
  return requireRole(UserRole.STUDENT);
}

export async function requireTutor() {
  return requireRole(UserRole.TUTOR);
}

export async function requireAdmin() {
  return requireRole(UserRole.ADMIN);
}
