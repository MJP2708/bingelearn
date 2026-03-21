import { NextResponse } from "next/server";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";

export async function PATCH(request: Request, context: RouteContext<"/api/admin/tutors/[id]/approval">) {
  await requireAdmin();
  const { id } = await context.params;
  const body = (await request.json()) as { isApproved?: boolean };

  if (isMockMode()) {
    return NextResponse.json({
      id,
      isApproved: Boolean(body.isApproved),
    });
  }

  const profile = await prisma.tutorProfile.update({
    where: { id },
    data: {
      isApproved: Boolean(body.isApproved),
    },
  });

  return NextResponse.json(profile);
}
