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
    <svg viewBox="0 0 24 24" fill="none" className="size-6">
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
      left: direction === "left" ? -900 : 900,
      behavior: "smooth",
    });
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-[-0.03em] text-white">{title}</h2>
      <div className="group relative">
        <button
          type="button"
          aria-label={`Scroll ${title} left`}
          onClick={() => scrollByPage("left")}
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-r-xl bg-black/70 px-3 py-10 text-white transition hover:bg-black/85 md:block"
        >
          <Arrow direction="left" />
        </button>
        <div
          ref={scrollerRef}
          className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, index) => (
            <ContentCard key={`${title}-${item.kind}-${item.id}-${index}`} item={item} onMoreInfo={onMoreInfo} />
          ))}
        </div>
        <button
          type="button"
          aria-label={`Scroll ${title} right`}
          onClick={() => scrollByPage("right")}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-l-xl bg-black/70 px-3 py-10 text-white transition hover:bg-black/85 md:block"
        >
          <Arrow direction="right" />
        </button>
      </div>
    </section>
  );
}
