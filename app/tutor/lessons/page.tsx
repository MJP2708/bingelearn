import { LessonForm } from "@/components/forms/LessonForm";
import { SectionHeader } from "@/components/SectionHeader";
import { getTutorLessonData } from "@/lib/data";
import { requireTutor } from "@/lib/rbac";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function TutorLessonsPage() {
  const tutor = await requireTutor();
  const { subjects, lessons } = await getTutorLessonData(tutor.id);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Tutor Workspace</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/tutor/dashboard" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Dashboard
          </Link>
          <Link href="/tutor/lessons" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
            Lessons
          </Link>
          <Link href="/tutor/availability" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Availability
          </Link>
          <Link href="/tutor/wallet" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Wallet
          </Link>
        </div>
      </section>
      <SectionHeader title="Manage lessons" description="Create, publish, unpublish, and remove lessons from the tutor dashboard." />
      <LessonForm subjects={subjects} lessons={lessons} />
    </div>
  );
}
