import Link from "next/link";
import { getPublishedLessons } from "@/lib/data";

export const dynamic = "force-dynamic";

type LessonsPageProps = {
  searchParams: Promise<{ q?: string; subject?: string }>;
};

function calculateLessonPrice(durationMinutes: number) {
  return Math.max(290, Math.round(190 + durationMinutes * 7));
}

export default async function LessonsPage({ searchParams }: LessonsPageProps) {
  const { q, subject } = await searchParams;
  const lessons = await getPublishedLessons();
  const subjects = Array.from(new Set(lessons.map((lesson) => lesson.subject.name)));

  const filtered = lessons.filter((lesson) => {
    const matchQuery =
      !q ||
      lesson.title.toLowerCase().includes(q.toLowerCase()) ||
      lesson.description.toLowerCase().includes(q.toLowerCase()) ||
      lesson.subject.name.toLowerCase().includes(q.toLowerCase());
    const matchSubject = !subject || subject === "All" || lesson.subject.name === subject;

    return matchQuery && matchSubject;
  });

  return (
    <div className="mx-auto max-w-[1100px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Lesson Library</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-900">Buy lessons on demand</h1>
        <p className="mt-2 text-sm text-slate-600">No student subscription required. Pick exactly what you need and pay per lesson.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/student" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Back to Student Home
          </Link>
          <Link href="/student/wallet" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            Top up wallet
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <form className="grid gap-3 md:grid-cols-[1fr_260px_120px]">
          <input
            name="q"
            placeholder="Search by title, topic, or subject..."
            defaultValue={q ?? ""}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
          />
          <select
            name="subject"
            defaultValue={subject ?? "All"}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
          >
            <option value="All">All subjects</option>
            {subjects.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Search</button>
        </form>
        <p className="mt-3 text-xs text-slate-500">{filtered.length} lessons available</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((lesson) => {
          const price = calculateLessonPrice(lesson.durationMinutes);
          return (
            <article key={lesson.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <p className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{lesson.subject.name}</p>
                <p className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">THB {price}</p>
              </div>
              <h2 className="mt-3 text-lg font-bold text-slate-900">{lesson.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">{lesson.description}</p>
              <p className="mt-3 text-xs text-slate-500">
                {lesson.durationMinutes} min - {lesson.difficulty.toLowerCase()} - Tutor: {lesson.tutor.name ?? "Tutor"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700">Buy now</button>
                <button className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">Preview</button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
