import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { faculties, schoolLevelMeta } from "@/lib/catalog";

export default function SubjectsPage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(229,9,20,0.34),_transparent_26%),linear-gradient(115deg,#141414_10%,#0a0a0a_58%,#000_100%)] p-8 md:p-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">Explore taxonomy</p>
          <h1 className="text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">School Levels and University Prep</h1>
          <p className="text-zinc-400">
            Browse tutoring pathways by Thai K-12 level or jump into faculty-based university preparation with deeper course clusters.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="ระดับชั้น" title="School Levels" description="Choose a level to see all core subjects in Thai with English aliases and mock study paths." />
        <div className="grid gap-6 md:grid-cols-3">
          {schoolLevelMeta.map((level) => (
            <Link key={level.level} href={`/subjects/${level.slug}`} className="surface-card rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/30">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent-soft)]">{level.nameEN}</p>
              <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-white">{level.nameTH}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{level.shortDescription}</p>
              <div className="mt-5 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-200">
                View subjects
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="university-prep" className="space-y-6">
        <SectionHeader eyebrow="เตรียมเข้ามหาวิทยาลัย" title="University Prep" description="Faculty-based exploration for students planning deeper university pathways and faculty-specific tutoring." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {faculties.map((faculty) => (
            <Link key={faculty.id} href={`/faculties/${faculty.id}`} className="surface-card rounded-[1.5rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20">
              <div className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/8 text-3xl">
                  {faculty.iconEmoji}
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-white">{faculty.nameTH}</p>
                  <p className="text-sm text-zinc-400">{faculty.nameEN}</p>
                  <p className="text-sm leading-6 text-zinc-500">{faculty.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
