import Link from "next/link";
import { ContentItem } from "@/lib/content-items";

type HeroBannerProps = {
  item: ContentItem;
  eyebrow?: string;
  rowLabel?: string;
};

export function HeroBanner({ item, eyebrow = "Featured", rowLabel }: HeroBannerProps) {
  return (
    <section
      className="surface-panel relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]"
      style={{ backgroundImage: `${item.image}, linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.16))` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.82),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.9)_0%,rgba(243,247,255,0.72)_55%,rgba(225,235,255,0.4)_100%)]" />
      <div className="float-gentle absolute -right-10 top-8 hidden h-40 w-40 rounded-full bg-amber-300/60 blur-3xl sm:block" />
      <div className="absolute -left-8 bottom-6 h-28 w-28 rounded-full bg-blue-300/40 blur-3xl sm:h-40 sm:w-40" />

      <div className="relative z-10 grid gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.7fr)] lg:items-end lg:px-12 lg:py-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/78 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-700 shadow-sm shadow-blue-100">
            <span className="inline-block size-2 rounded-full bg-amber-400" />
            {eyebrow}
          </div>
          <h1 className="text-balance mt-5 text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-7xl">{item.title}</h1>
          <p className="text-balance mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{item.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={item.href} className="netflix-button rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5">
              {item.ctaLabel}
            </Link>
            <Link
              href={item.href}
              className="netflix-button-secondary rounded-full border border-blue-100 px-6 py-3 font-semibold transition hover:-translate-y-0.5"
            >
              View details
            </Link>
          </div>

          {rowLabel ? <p className="mt-8 text-sm font-semibold text-slate-500">{rowLabel}</p> : null}
        </div>

        <div className="surface-card relative overflow-hidden rounded-[1.75rem] p-5 sm:p-6">
          <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.38),transparent)]" />
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-600">Study momentum</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Format</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{item.kind === "lesson" ? "Guided lesson" : "Live tutoring"}</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Best for</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{item.tags[0] ?? "Focused practice"}</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Why students pick it</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{item.ratingLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
