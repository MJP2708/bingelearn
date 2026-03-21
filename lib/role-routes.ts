import { UserRole } from "@prisma/client";

export function getDefaultRouteForRole(role: UserRole) {
  switch (role) {
    case UserRole.TUTOR:
      return "/tutor/dashboard";
    case UserRole.ADMIN:
      return "/admin";
    case UserRole.STUDENT:
    default:
      return "/dashboard";
  }
}
