"use client";

import Link from "next/link";
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
  const navItems = [
    { key: "home", label: "Home", href: "/" },
    { key: "subjects", label: "Subjects", href: "/lessons" },
    { key: "tutors", label: "Tutors", href: "/tutors" },
    { key: "my-list", label: "My List", href: "/student" },
  ] as const;

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-[linear-gradient(180deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.42)_72%,transparent_100%)]">
      <div className="mx-auto flex max-w-[96rem] items-center justify-between px-5 py-5 text-white sm:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
            BingeLearn
          </Link>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    ? "text-white"
                    : "text-zinc-400 transition hover:text-white"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-zinc-200">
          <button type="button" className="transition hover:text-white" aria-label="Search">
            <IconSearch />
          </button>
          <button type="button" className="transition hover:text-white" aria-label="Notifications">
            <IconBell />
          </button>
          <div className="flex size-9 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white shadow-lg shadow-red-950/40">
            JS
          </div>
        </div>
      </div>
    </div>
  );
}
