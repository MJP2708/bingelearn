"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5">
      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5">
      <path d="M6 9A6 6 0 1118 9V14L20 17H4L6 14V9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 20C10.5 20.6 11.2 21 12 21C12.8 21 13.5 20.6 14 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function NavbarNetflixLike() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { key: "home", label: "Home", href: "/" },
    { key: "school-levels", label: "School Levels", href: "/subjects" },
    { key: "university-prep", label: "University Prep", href: "/subjects#university-prep" },
    { key: "tutors", label: "Tutors", href: "/tutors" },
    { key: "my-list", label: "My List", href: "/student" },
  ] as const;

  function isActive(item: (typeof navItems)[number]) {
    if (item.key === "school-levels") {
      return pathname === "/subjects" || pathname.startsWith("/subjects/");
    }

    if (item.key === "university-prep") {
      return pathname.startsWith("/faculties");
    }

    return pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-white/50 bg-white/72 backdrop-blur-xl">
      <div className="mx-auto max-w-[96rem] px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-soft))] text-sm font-black text-white shadow-lg shadow-blue-400/30">
                BL
              </span>
              <div className="min-w-0">
                <p className="text-lg font-black tracking-[-0.04em] text-slate-900 sm:text-xl">BingeLearn</p>
                <p className="hidden text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 sm:block">Study smarter daily</p>
              </div>
            </Link>
            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={
                    isActive(item)
                      ? "rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200"
                      : "rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 text-slate-600 sm:gap-3">
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full bg-white/80 transition hover:bg-white hover:text-slate-900"
              aria-label="Search"
            >
              <IconSearch />
            </button>
            <button
              type="button"
              className="hidden size-10 items-center justify-center rounded-full bg-white/80 transition hover:bg-white hover:text-slate-900 sm:flex"
              aria-label="Notifications"
            >
              <IconBell />
            </button>
            <div className="hidden rounded-full bg-amber-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-700 sm:block">
              Focus
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="flex size-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800 lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-5">
                <path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M4 17H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="mt-3 rounded-[1.75rem] border border-white/70 bg-white/90 p-3 shadow-xl shadow-blue-100/80 lg:hidden">
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={
                    isActive(item)
                      ? "rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
                      : "rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </div>
    </div>
  );
}
