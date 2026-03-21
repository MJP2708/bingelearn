import Link from "next/link";
import { LoginForm } from "@/components/forms/LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  const safeCallbackUrl = callbackUrl?.startsWith("/") ? callbackUrl : "/auth/redirect";

  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#1a1a1a_0%,#0b0b0b_100%)] shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
      <div className="h-28 bg-[radial-gradient(circle_at_top_left,_rgba(229,9,20,0.45),_transparent_38%),linear-gradient(135deg,#250709_0%,#111_100%)]" />
      <div className="p-8">
        <div className="mb-6 space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">Welcome back</p>
          <h1 className="text-4xl font-black tracking-[-0.04em] text-white">Enter demo</h1>
          <p className="text-sm leading-6 text-zinc-400">Auth is disabled. Pick a role and continue directly to that part of the app.</p>
        </div>
        <LoginForm callbackUrl={safeCallbackUrl} />
        <p className="mt-6 text-sm text-zinc-400">
          Need a fast start?{" "}
          <Link href="/register" className="text-[var(--color-accent-soft)]">
            Open demo shortcuts
          </Link>
        </p>
      </div>
    </div>
  );
}
