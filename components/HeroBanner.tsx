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
      className="relative flex min-h-[68vh] items-end overflow-hidden rounded-[2rem] border border-white/10"
      style={{ backgroundImage: `${item.image}, radial-gradient(circle at center, rgba(0,0,0,0.18), rgba(0,0,0,0.68))` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.62)_42%,rgba(0,0,0,0.16)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent_0%,rgba(20,20,20,0.96)_100%)]" />
      <div className="relative z-10 max-w-3xl px-8 py-12 md:px-12 md:py-16">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-zinc-300">{eyebrow}</p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-white md:text-7xl">{item.title}</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-200">{item.description}</p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link href={item.href} className="rounded-md bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200">
            {item.ctaLabel}
          </Link>
          <Link href={item.href} className="rounded-md border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/18">
            More info
          </Link>
        </div>
        {rowLabel ? <p className="mt-10 text-sm font-semibold text-zinc-300">{rowLabel}</p> : null}
      </div>
    </section>
  );
}
