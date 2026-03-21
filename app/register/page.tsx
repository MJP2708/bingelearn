import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#1a1a1a_0%,#0b0b0b_100%)] shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
      <div className="h-28 bg-[radial-gradient(circle_at_top_left,_rgba(229,9,20,0.45),_transparent_38%),linear-gradient(135deg,#250709_0%,#111_100%)]" />
      <div className="p-8">
        <div className="mb-6 space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">Start watching</p>
          <h1 className="text-4xl font-black tracking-[-0.04em] text-white">Create your account</h1>
          <p className="text-sm leading-6 text-zinc-400">Students get personalized recommendations. Tutors get a profile, lesson tools, and approval flow.</p>
        </div>
        <RegisterForm />
        <p className="mt-6 text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--color-accent-soft)]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
