"use client";

import { useActionState } from "react";
import { registerUser } from "@/app/actions/auth";

const initialState = {
  error: "",
  success: "",
};

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerUser, initialState);

  return (
    <form action={action} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-sm text-zinc-300">Name</span>
        <input name="name" required className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/50" />
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-zinc-300">Email</span>
        <input name="email" type="email" required className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/50" />
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-zinc-300">Password</span>
        <input name="password" type="password" required className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/50" />
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-zinc-300">Role</span>
        <select name="role" defaultValue="STUDENT" className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/50">
          <option value="STUDENT">Student</option>
          <option value="TUTOR">Tutor</option>
        </select>
      </label>
      {state.error ? <p className="text-sm text-rose-300">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-emerald-300">{state.success}</p> : null}
      <button disabled={pending} className="netflix-button w-full rounded-full px-5 py-3 font-semibold transition">
        {pending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
