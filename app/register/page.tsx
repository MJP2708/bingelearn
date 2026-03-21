import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#1a1a1a_0%,#0b0b0b_100%)] shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
      <div className="h-28 bg-[radial-gradient(circle_at_top_left,_rgba(229,9,20,0.45),_transparent_38%),linear-gradient(135deg,#250709_0%,#111_100%)]" />
      <div className="p-8">
        <div className="mb-6 space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">Start watching</p>
          <h1 className="text-4xl font-black tracking-[-0.04em] text-white">Demo mode enabled</h1>
          <p className="text-sm leading-6 text-zinc-400">
            Registration is disabled for the fully-operational demo experience. Use role shortcuts to explore the platform without auth or database setup.
          </p>
        </div>
        <div className="space-y-3">
          <Link href="/student" className="netflix-button block w-full rounded-full px-5 py-3 text-center font-semibold transition">
            Continue as Student
          </Link>
          <Link href="/tutor/dashboard" className="netflix-button-secondary block w-full rounded-full px-5 py-3 text-center font-semibold transition">
            Continue as Tutor
          </Link>
          <Link href="/admin" className="netflix-button-secondary block w-full rounded-full px-5 py-3 text-center font-semibold transition">
            Continue as Admin
          </Link>
        </div>
        <p className="mt-6 text-sm text-zinc-400">
          Want the quick role switcher?{" "}
          <Link href="/login" className="text-[var(--color-accent-soft)]">
            Open sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
