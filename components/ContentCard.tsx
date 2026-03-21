"use client";

import Link from "next/link";
import { ContentItem } from "@/lib/content-items";

type ContentCardProps = {
  item: ContentItem;
  onMoreInfo?: (item: ContentItem) => void;
};

export function ContentCard({ item, onMoreInfo }: ContentCardProps) {
  return (
    <article className="group relative w-[280px] shrink-0 snap-start transition duration-300 hover:z-20 hover:scale-105">
      <div
        className="relative aspect-video overflow-hidden rounded-xl border border-white/8 bg-zinc-900 shadow-xl transition duration-300 group-hover:shadow-2xl group-hover:shadow-black/60"
        style={{ backgroundImage: `${item.image}, linear-gradient(180deg, #292929, #111111)` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
        {item.badge ? (
          <div className="absolute left-3 top-3 rounded bg-[var(--color-accent)] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
            {item.badge}
          </div>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-lg font-bold text-white">{item.title}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-zinc-300">{item.subtitle}</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[92%] opacity-0 transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="rounded-b-xl border border-white/8 border-t-0 bg-[#181818] p-4 shadow-2xl shadow-black/70">
          <div className="flex items-center gap-2">
            <Link href={item.href} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black">
              Open
            </Link>
            <button
              type="button"
              onClick={() => onMoreInfo?.(item)}
              className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white"
            >
              More Info
            </button>
          </div>
          <p className="mt-3 text-sm font-semibold text-zinc-100">{item.ratingLabel}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400">
            {item.meta.map((meta) => (
              <span key={meta}>{meta}</span>
            ))}
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-zinc-300">{item.description}</p>
        </div>
      </div>
    </article>
  );
}
