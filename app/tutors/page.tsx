import Link from "next/link";
import { getTutorList } from "@/lib/data";
import { mockSubjects } from "@/lib/mock-data";
import { isMockMode, withMockFallback } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

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
    <div className="mx-auto max-w-[1100px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Tutor Browse</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-900">Find the right tutor for your goal</h1>
        <p className="mt-2 text-sm text-slate-600">Filter by subject, rate, and rating, then open a tutor spotlight to view lessons and book a session.</p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <form className="grid gap-3 md:grid-cols-[220px_1fr_1fr_180px]">
          <select
            name="subject"
            defaultValue={filters.subject ?? ""}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
          >
            <option value="">All subjects</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.slug}>
                {subject.name}
              </option>
            ))}
          </select>
          <input
            name="minPrice"
            type="number"
            placeholder="Min rate"
            defaultValue={filters.minPrice ?? ""}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
          />
          <input
            name="maxPrice"
            type="number"
            placeholder="Max rate"
            defaultValue={filters.maxPrice ?? ""}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
          />
          <div className="flex gap-2">
            <select
              name="rating"
              defaultValue={filters.rating ?? ""}
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
            >
              <option value="">Any rating</option>
              <option value="4">4.0+</option>
              <option value="4.5">4.5+</option>
            </select>
            <button className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Apply</button>
          </div>
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tutors.map((tutor) => {
          const mainSubject = tutor.tutorSubjects[0]?.subject.name ?? "Tutoring";
          return (
            <article key={tutor.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-bold text-slate-900">{tutor.user.name}</p>
                  <p className="text-sm text-slate-600">{tutor.headline ?? `${mainSubject} tutor`}</p>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{tutor.ratingAverage.toFixed(1)} stars</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tutor.tutorSubjects.slice(0, 3).map((item) => (
                  <span key={item.subjectId} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {item.subject.name}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">{tutor.user.bio ?? "Personalized tutoring sessions with clear learning outcomes."}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">{formatCurrency(tutor.hourlyRate)} / hour</p>
                <Link href={`/tutors/${tutor.id}`} className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700">
                  View spotlight
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
