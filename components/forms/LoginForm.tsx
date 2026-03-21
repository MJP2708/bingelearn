"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

type LoginFormProps = {
  callbackUrl: string;
};

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);

    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: false,
    });

    setPending(false);

    if (result?.error) {
      setError("Incorrect email or password.");
      return;
    }

    window.location.href = result?.url ?? callbackUrl;
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-sm text-zinc-300">Email</span>
        <input name="email" type="email" required className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none ring-0 transition focus:border-[var(--color-accent)]/50" />
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-zinc-300">Password</span>
        <input name="password" type="password" required className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none ring-0 transition focus:border-[var(--color-accent)]/50" />
      </label>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <button disabled={pending} className="netflix-button w-full rounded-full px-5 py-3 font-semibold transition">
        {pending ? "Signing in..." : "Sign in"}
      </button>
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl })}
        className="netflix-button-secondary w-full rounded-full px-5 py-3 font-semibold transition"
      >
        Continue with Google
      </button>
    </form>
  );
}
