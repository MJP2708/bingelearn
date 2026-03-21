import { ContentCard } from "@/components/ContentCard";
import { SectionHeader } from "@/components/SectionHeader";
import { toTutorContentItem } from "@/lib/content-items";
import { getTutorList } from "@/lib/data";
import { mockSubjects } from "@/lib/mock-data";
import { isMockMode, withMockFallback } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type TutorsPageProps = {
  searchParams: Promise<{
    subject?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
  }>;
};

export default async function TutorsPage({ searchParams }: TutorsPageProps) {
  const filters = await searchParams;
  const [subjects, tutors] = await Promise.all([
    isMockMode()
      ? Promise.resolve(mockSubjects)
      : withMockFallback(() => prisma.subject.findMany({ orderBy: { name: "asc" } }), mockSubjects, "tutor subjects"),
    getTutorList({
      subject: filters.subject,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      minRating: filters.rating ? Number(filters.rating) : undefined,
    }),
  ]);

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="Browse" title="Tutors" description="A dark, content-first grid inspired by the way streaming platforms surface featured talent." />
      <form className="surface-panel grid gap-4 rounded-[1.75rem] p-6 md:grid-cols-4">
        <select name="subject" defaultValue={filters.subject ?? ""} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none">
          <option value="">All subjects</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.slug}>
              {subject.name}
            </option>
          ))}
        </select>
        <input name="minPrice" type="number" placeholder="Min price" defaultValue={filters.minPrice ?? ""} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
        <input name="maxPrice" type="number" placeholder="Max price" defaultValue={filters.maxPrice ?? ""} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none" />
        <div className="flex gap-3">
          <select name="rating" defaultValue={filters.rating ?? ""} className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none">
            <option value="">Any rating</option>
            <option value="4">4.0+</option>
            <option value="4.5">4.5+</option>
          </select>
          <button className="netflix-button rounded-xl px-5 py-3 font-semibold">Apply</button>
        </div>
      </form>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tutors.map((tutor) => (
          <ContentCard key={tutor.id} item={toTutorContentItem(tutor)} />
        ))}
      </div>
    </div>
  );
}
