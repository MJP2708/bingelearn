import { redirect } from "next/navigation";
import { isMockMode } from "@/lib/mock-mode";
import { getSession } from "@/lib/rbac";
import { getDefaultRouteForRole } from "@/lib/role-routes";

type AuthRedirectPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function AuthRedirectPage({ searchParams }: AuthRedirectPageProps) {
  if (isMockMode()) {
    const { callbackUrl } = await searchParams;

    if (callbackUrl && callbackUrl.startsWith("/") && callbackUrl !== "/auth/redirect") {
      redirect(callbackUrl);
    }

    redirect("/dashboard");
  }

  const session = await getSession();
  const { callbackUrl } = await searchParams;

  if (!session?.user) {
    redirect("/login");
  }

  if (callbackUrl && callbackUrl.startsWith("/") && callbackUrl !== "/auth/redirect") {
    redirect(callbackUrl);
  }

  redirect(getDefaultRouteForRole(session.user.role));
}
