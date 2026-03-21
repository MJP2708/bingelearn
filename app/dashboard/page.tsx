import { BookingList } from "@/components/BookingList";
import { LessonCard } from "@/components/LessonCard";
import { SectionHeader } from "@/components/SectionHeader";
import { TutorCard } from "@/components/TutorCard";
import { UpgradeButton } from "@/components/UpgradeButton";
import { getStudentDashboardData } from "@/lib/data";
import { getRecommendationsForStudent } from "@/lib/recommendations";
import { requireStudent } from "@/lib/rbac";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const student = await requireStudent();
  const [{ lessons, tutors }, { bookings, recentProgress, subscription }] = await Promise.all([
    getRecommendationsForStudent(student.id),
    getStudentDashboardData(student.id),
  ]);

  return (
    <div className="space-y-12">
      <section className="surface-panel overflow-hidden rounded-[2.2rem] p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">Student dashboard</p>
            <h1 className="text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">Welcome back, {student.name ?? "student"}.</h1>
            <p className="max-w-2xl text-zinc-400">Pick up where you left off, queue your next session, and follow recommendations tuned to your recent quiz performance.</p>
          </div>
          <div className="surface-card rounded-[1.75rem] p-5">
            {subscription?.status === "active" ? (
              <>
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Active plan</p>
                <p className="mt-2 text-xl font-bold text-white">Unlimited tutoring lite</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Renews {subscription.currentPeriodEnd ? formatDateTime(subscription.currentPeriodEnd) : "soon"}
                </p>
              </>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-zinc-400">No active subscription yet</p>
                <UpgradeButton />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="For You" title="Recommended lessons" description="Lessons prioritize subjects with the most recent quiz struggles, then fall back to booking popularity." />
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader title="Recommended tutors" description="Tutors are filtered by the same subject signals and sorted by rating quality." />
        <div className="grid gap-6 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <SectionHeader title="Upcoming bookings" description="Your next tutoring sessions and meeting links." />
          <BookingList bookings={bookings} emptyMessage="You do not have any upcoming bookings yet." />
        </div>
        <div className="space-y-6">
          <SectionHeader title="Continue learning" description="Recent lesson and quiz activity." />
          <div className="space-y-3">
            {recentProgress.map((event) => (
              <div key={event.id} className="surface-card rounded-[1.75rem] p-5">
                <p className="text-sm font-semibold text-white">{event.lesson.title}</p>
                <p className="text-sm text-zinc-400">{event.lesson.subject.name}</p>
                <p className="mt-3 text-sm text-zinc-500">
                  {event.type.replaceAll("_", " ").toLowerCase()} {event.score ? `| score ${event.score}` : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
