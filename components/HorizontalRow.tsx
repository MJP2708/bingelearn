"use client";

import { useRef } from "react";
import { ContentItem } from "@/lib/content-items";
import { ContentCard } from "@/components/ContentCard";

type HorizontalRowProps = {
  title: string;
  items: ContentItem[];
  onMoreInfo?: (item: ContentItem) => void;
};

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5">
      <path
        d={direction === "left" ? "M14.5 5L8 12L14.5 19" : "M9.5 5L16 12L9.5 19"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HorizontalRow({ title, items, onMoreInfo }: HorizontalRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByPage(direction: "left" | "right") {
    scrollerRef.current?.scrollBy({
      left: direction === "left" ? -720 : 720,
      behavior: "smooth",
    });
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-3xl">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">Quick picks for your next focused study block.</p>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            aria-label={`Scroll ${title} left`}
            onClick={() => scrollByPage("left")}
            className="flex size-11 items-center justify-center rounded-full border border-white/70 bg-white/80 text-slate-700 transition hover:bg-white hover:text-slate-950"
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${title} right`}
            onClick={() => scrollByPage("right")}
            className="flex size-11 items-center justify-center rounded-full border border-white/70 bg-white/80 text-slate-700 transition hover:bg-white hover:text-slate-950"
          >
            <Arrow direction="right" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x gap-4 overflow-x-auto scroll-px-1 scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <ContentCard key={`${title}-${item.kind}-${item.id}-${index}`} item={item} onMoreInfo={onMoreInfo} />
        ))}
      </div>
    </section>
  );
}
