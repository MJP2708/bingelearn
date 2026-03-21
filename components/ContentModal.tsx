"use client";

import Link from "next/link";
import { ContentItem } from "@/lib/content-items";

type ContentModalProps = {
  item: ContentItem | null;
  onClose: () => void;
};

export function ContentModal({ item, onClose }: ContentModalProps) {
  if (!item) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/72 px-4 py-10 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[1.8rem] border border-white/10 bg-[#181818] shadow-2xl shadow-black/80">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-black/60 text-xl text-white"
        >
          x
        </button>
        <div className="aspect-[16/7] w-full" style={{ backgroundImage: `${item.image}, linear-gradient(180deg,#2c2c2c,#111)` }} />
        <div className="space-y-5 p-8">
          <div className="flex flex-wrap gap-3">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-200">
                {tag}
              </span>
            ))}
          </div>
          <div>
            <h3 className="text-4xl font-black tracking-[-0.04em] text-white">{item.title}</h3>
            <p className="mt-2 text-lg text-zinc-300">{item.subtitle}</p>
          </div>
          <p className="max-w-3xl text-zinc-400">{item.description}</p>
          <div className="flex flex-wrap gap-3 text-sm text-zinc-400">
            {item.meta.map((meta) => (
              <span key={meta}>{meta}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href={item.href} className="rounded-md bg-white px-5 py-3 font-semibold text-black">
              {item.ctaLabel}
            </Link>
            <button type="button" className="rounded-md border border-white/20 bg-white/6 px-5 py-3 font-semibold text-white">
              Add to My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
