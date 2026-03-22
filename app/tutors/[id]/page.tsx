import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/forms/BookingForm";
import { getTutorDetail } from "@/lib/data";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

type TutorDetailPageProps = {
  params: Promise<{ id: string }>;
};

function lessonPrice(durationMinutes: number) {
  return Math.max(290, Math.round(190 + durationMinutes * 7));
}

export default async function TutorDetailPage({ params }: TutorDetailPageProps) {
  const { id } = await params;
  const tutor = await getTutorDetail(id);

  if (!tutor) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1100px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Tutor Spotlight</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-900">{tutor.user.name}</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">{tutor.headline}</p>
            <p className="mt-2 max-w-3xl text-sm text-slate-500">{tutor.user.bio}</p>
          </div>
          <Link href="/tutors" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Back to Tutors
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tutor.tutorSubjects.map((item) => (
            <span key={item.subjectId} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              {item.subject.name}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Rate</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{formatCurrency(tutor.hourlyRate)} / hour</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Rating</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {tutor.ratingAverage.toFixed(1)} <span className="text-sm font-normal text-slate-500">({tutor.ratingCount} reviews)</span>
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Experience</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{tutor.yearsExperience} years</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Published lessons</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {tutor.user.tutorLessons.map((lesson) => (
              <article key={lesson.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">{lesson.title}</p>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                    THB {lessonPrice(lesson.durationMinutes)}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-slate-600">{lesson.description}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {lesson.subject.name} - {lesson.durationMinutes} min - {lesson.difficulty.toLowerCase()}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Book a session</h2>
          <p className="mt-1 text-sm text-slate-600">Choose a preferred date/time and request a trial or focused lesson session.</p>
          <div className="mt-4">
            <BookingForm tutorId={tutor.userId} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Available slots</h2>
          <div className="mt-4 space-y-3">
            {tutor.availability.map((slot) => (
              <div key={slot.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">{formatDateTime(slot.startsAt)}</p>
                <p className="text-xs text-slate-500">Ends {formatDateTime(slot.endsAt)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Recent reviews</h2>
          <div className="mt-4 space-y-3">
            {tutor.user.tutorReviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">{review.student.name}</p>
                <p className="text-xs text-slate-500">{review.rating}/5</p>
                <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
