"use server";

import { revalidatePath } from "next/cache";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";

export async function updateTutorApproval(formData: FormData) {
  await requireAdmin();
  const tutorProfileId = formData.get("tutorProfileId")?.toString();
  const isApproved = formData.get("isApproved")?.toString() === "true";

  if (!tutorProfileId) {
    return;
  }

  if (isMockMode()) {
    revalidatePath("/admin");
    revalidatePath("/tutors");
    return;
  }

  await prisma.tutorProfile.update({
    where: { id: tutorProfileId },
    data: { isApproved },
  });

  revalidatePath("/admin");
  revalidatePath("/tutors");
}
