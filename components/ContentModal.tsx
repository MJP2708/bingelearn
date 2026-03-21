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
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/30 px-4 py-6 backdrop-blur-md sm:py-10">
      <div className="surface-panel relative max-h-[92vh] w-full max-w-4xl overflow-auto rounded-[2rem]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-slate-700 shadow-md"
          aria-label="Close details"
        >
          x
        </button>

        <div
          className="relative aspect-[16/10] w-full sm:aspect-[16/7]"
          style={{ backgroundImage: `${item.image}, linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.18))` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.82)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/88 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mt-4 text-3xl font-black tracking-[-0.05em] text-slate-950 sm:text-5xl">{item.title}</h3>
            <p className="mt-2 max-w-2xl text-sm font-medium text-slate-600 sm:text-lg">{item.subtitle}</p>
          </div>
        </div>

        <div className="space-y-6 p-5 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-3">
            {item.meta.map((meta) => (
              <div key={meta} className="rounded-2xl bg-white/75 p-4 text-sm font-semibold text-slate-700">
                {meta}
              </div>
            ))}
          </div>

          <p className="max-w-3xl text-base leading-7 text-slate-600">{item.description}</p>

          <div className="flex flex-wrap gap-3">
            <Link href={item.href} className="netflix-button rounded-full px-5 py-3 font-semibold">
              {item.ctaLabel}
            </Link>
            <button
              type="button"
              className="rounded-full border border-blue-100 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-slate-950"
            >
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
