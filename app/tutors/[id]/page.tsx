import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/forms/BookingForm";
import { ContentCard } from "@/components/ContentCard";
import { SectionHeader } from "@/components/SectionHeader";
import { toLessonContentItem } from "@/lib/content-items";
import { getTutorDetail } from "@/lib/data";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

type TutorDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TutorDetailPage({ params }: TutorDetailPageProps) {
  const { id } = await params;
  const tutor = await getTutorDetail(id);

  if (!tutor) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(229,9,20,0.4),_transparent_28%),linear-gradient(115deg,#141414_10%,#0a0a0a_58%,#000_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.56)_48%,rgba(0,0,0,0.18)_100%)]" />
        <div className="relative grid gap-8 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
          <div className="space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">Tutor spotlight</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-0.05em] text-white">{tutor.user.name}</h1>
              <p className="mt-3 max-w-3xl text-lg text-zinc-300">{tutor.headline}</p>
            </div>
            <p className="max-w-3xl text-zinc-400">{tutor.user.bio}</p>
            <div className="flex flex-wrap gap-3">
              {tutor.tutorSubjects.map((item) => (
                <span key={item.subjectId} className="netflix-chip rounded-full px-3 py-1 text-sm">
                  {item.subject.name}
                </span>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="surface-card rounded-[1.5rem] p-4">
                <p className="text-sm text-zinc-500">Rate</p>
                <p className="mt-2 text-xl font-bold text-white">{formatCurrency(tutor.hourlyRate)}/hr</p>
              </div>
              <div className="surface-card rounded-[1.5rem] p-4">
                <p className="text-sm text-zinc-500">Rating</p>
                <p className="mt-2 text-xl font-bold text-white">{tutor.ratingAverage.toFixed(1)}</p>
              </div>
              <div className="surface-card rounded-[1.5rem] p-4">
                <p className="text-sm text-zinc-500">Experience</p>
                <p className="mt-2 text-xl font-bold text-white">{tutor.yearsExperience} years</p>
              </div>
            </div>
            {tutor.introVideoUrl ? (
              <Link href={tutor.introVideoUrl} className="netflix-button-secondary inline-flex rounded-xl px-4 py-2.5 text-sm font-semibold transition">
                Watch intro video
              </Link>
            ) : null}
          </div>
          <div className="surface-panel rounded-[1.75rem] p-6">
            <BookingForm tutorId={tutor.userId} />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader title="Published lessons" description="A catalog view of this tutor's current lesson lineup." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tutor.user.tutorLessons.map((lesson) => (
            <ContentCard
              key={lesson.id}
              item={toLessonContentItem({
                ...lesson,
                tutor: {
                  ...tutor.user,
                  tutorProfile: tutor,
                },
              })}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <SectionHeader title="Available slots" description="Simple MVP availability, presented like upcoming episode drops." />
          <div className="space-y-3">
            {tutor.availability.map((slot) => (
              <div key={slot.id} className="surface-card rounded-[1.5rem] p-5">
                <p className="text-sm font-semibold text-white">{formatDateTime(slot.startsAt)}</p>
                <p className="text-sm text-zinc-400">Ends {formatDateTime(slot.endsAt)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <SectionHeader title="Recent reviews" description="Latest student feedback for this tutor." />
          <div className="space-y-3">
            {tutor.user.tutorReviews.map((review) => (
              <div key={review.id} className="surface-card rounded-[1.5rem] p-5">
                <p className="text-sm font-semibold text-white">{review.student.name}</p>
                <p className="text-sm text-zinc-500">{review.rating}/5</p>
                <p className="mt-3 text-sm text-zinc-400">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
