"use client";

import Link from "next/link";
import { ContentItem } from "@/lib/content-items";

type ContentCardProps = {
  item: ContentItem;
  onMoreInfo?: (item: ContentItem) => void;
};

export function ContentCard({ item, onMoreInfo }: ContentCardProps) {
  return (
    <article className="group w-[82vw] max-w-[320px] shrink-0 snap-start sm:w-[320px]">
      <div className="surface-card h-full overflow-hidden rounded-[1.6rem] transition duration-300 group-hover:-translate-y-1">
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={{ backgroundImage: `${item.image}, linear-gradient(180deg, rgba(37,99,235,0.2), rgba(255,255,255,0.9))` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(15,23,42,0.08)_100%)]" />
          {item.badge ? (
            <div className="absolute left-4 top-4 rounded-full bg-slate-950 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              {item.badge}
            </div>
          ) : null}
          <div className="absolute bottom-4 right-4 rounded-full bg-white/88 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            {item.ratingLabel}
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">{item.kind === "lesson" ? "Lesson" : "Tutor"}</p>
            <h3 className="mt-2 text-xl font-black tracking-[-0.03em] text-slate-950">{item.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm font-medium text-slate-600">{item.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {item.meta.slice(0, 3).map((meta) => (
              <span key={meta} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {meta}
              </span>
            ))}
          </div>

          <p className="line-clamp-3 text-sm leading-6 text-slate-600">{item.description}</p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link href={item.href} className="netflix-button rounded-full px-4 py-2.5 text-sm font-semibold">
              Open
            </Link>
            <button
              type="button"
              onClick={() => onMoreInfo?.(item)}
              className="rounded-full border border-blue-100 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-slate-950"
            >
              More Info
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
