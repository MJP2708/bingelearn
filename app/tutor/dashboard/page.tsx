import { BookingList } from "@/components/BookingList";
import { SectionHeader } from "@/components/SectionHeader";
import { getTutorDashboardData } from "@/lib/data";
import { requireTutor } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export default async function TutorDashboardPage() {
  const tutor = await requireTutor();
  const data = await getTutorDashboardData(tutor.id);

  const bookings = data.bookings.map((booking) => ({
    ...booking,
    tutor,
  }));

  return (
    <div className="space-y-10">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Upcoming sessions</p>
          <p className="mt-2 text-3xl font-semibold text-white">{data.bookings.length}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Lessons created</p>
          <p className="mt-2 text-3xl font-semibold text-white">{data.lessonCount}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Average rating</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {data.ratingAverage.toFixed(1)} <span className="text-sm text-slate-400">({data.ratingCount} reviews)</span>
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader title="Upcoming bookings" description="A lightweight operations view for tutors." />
        <BookingList bookings={bookings} emptyMessage="No upcoming sessions are booked yet." />
      </section>
    </div>
  );
}
