import { notFound } from "next/navigation";
import { getMockTagsForLevel, getSchoolLevelBySlug, getSubjectsForLevel } from "@/lib/catalog";

type SchoolLevelPageProps = {
  params: Promise<{ level: string }>;
};

export default async function SchoolLevelPage({ params }: SchoolLevelPageProps) {
  const { level } = await params;
  const levelMeta = getSchoolLevelBySlug(level);

  if (!levelMeta) {
    notFound();
  }

  const subjects = getSubjectsForLevel(levelMeta.level);
  const tags = getMockTagsForLevel(levelMeta.level);

  return (
    <div className="space-y-10">
      <section className="surface-panel rounded-[2rem] p-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">{levelMeta.nameEN}</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-white">{levelMeta.nameTH}</h1>
        <p className="mt-3 max-w-3xl text-zinc-400">{levelMeta.shortDescription}</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => (
          <article key={subject.id} className="surface-card rounded-[1.75rem] p-6">
            <p className="text-xl font-black tracking-[-0.03em] text-white">{subject.nameTH}</p>
            <p className="mt-1 text-sm text-zinc-400">{subject.nameEN}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={`${subject.id}-${tag}`} className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold text-zinc-200">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
