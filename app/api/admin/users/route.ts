import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { getMockAdminDashboardData } from "@/lib/mock-data";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";

export async function GET(request: Request) {
  await requireAdmin();
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  if (isMockMode()) {
    return NextResponse.json(getMockAdminDashboardData(role && role !== "ALL" ? (role as UserRole) : undefined).users);
  }

  const users = await prisma.user.findMany({
    where: role && role !== "ALL" ? { role: role as UserRole } : undefined,
    include: {
      tutorProfile: true,
      studentProfile: true,
    },
  });

  return NextResponse.json(users);
}
