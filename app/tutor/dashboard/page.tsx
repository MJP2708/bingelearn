import { BookingList } from "@/components/BookingList";
import { SectionHeader } from "@/components/SectionHeader";
import { getTutorDashboardData } from "@/lib/data";
import { requireTutor } from "@/lib/rbac";
import Link from "next/link";

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
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Tutor Workspace</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-900">Manage your teaching business</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Track sessions, publish lessons, and keep your schedule updated so students can book instantly.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/tutor/dashboard" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
            Dashboard
          </Link>
          <Link href="/tutor/lessons" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
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
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Upcoming sessions</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{data.bookings.length}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Lessons created</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{data.lessonCount}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Average rating</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {data.ratingAverage.toFixed(1)} <span className="text-sm text-slate-500">({data.ratingCount} reviews)</span>
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
