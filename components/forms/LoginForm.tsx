"use client";

import { useMemo, useState } from "react";

type LoginFormProps = {
  callbackUrl: string;
};

type DemoRole = "student" | "tutor" | "admin";

const roleRoutes: Record<DemoRole, string> = {
  student: "/student",
  tutor: "/tutor/dashboard",
  admin: "/admin",
};

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const [role, setRole] = useState<DemoRole>("student");
  const destination = useMemo(() => {
    if (callbackUrl.startsWith("/") && callbackUrl !== "/auth/redirect") {
      return callbackUrl;
    }

    return roleRoutes[role];
  }, [callbackUrl, role]);

  return (
    <form action={destination} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-sm text-zinc-300">Demo role</span>
        <select
          name="role"
          value={role}
          onChange={(event) => setRole(event.target.value as DemoRole)}
          className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/50"
        >
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <p className="text-sm text-zinc-400">Auth is disabled in demo mode. Continue directly to explore that role&apos;s dashboard.</p>
      <button className="netflix-button w-full rounded-full px-5 py-3 font-semibold transition">Continue as {role}</button>
    </form>
  );
}
