import Link from "next/link";
import type { TutorProfile, User, TutorSubject, Subject } from "@prisma/client";
import { formatCurrency } from "@/lib/utils";

type TutorCardProps = {
  tutor: TutorProfile & {
    user: User;
    tutorSubjects: Array<TutorSubject & { subject: Subject }>;
  };
};

export function TutorCard({ tutor }: TutorCardProps) {
  return (
    <article className="surface-card group overflow-hidden rounded-[1.75rem] p-0 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/30">
      <div className="h-32 bg-[radial-gradient(circle_at_top_left,_rgba(229,9,20,0.45),_transparent_36%),linear-gradient(135deg,#2b0a0c_0%,#0f0f0f_78%)]" />
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xl font-bold text-white">{tutor.user.name}</p>
            <p className="mt-1 text-sm leading-6 text-zinc-400">{tutor.headline ?? "Personalized tutoring support"}</p>
          </div>
          <div className="rounded-full bg-[var(--color-accent)]/14 px-3 py-1 text-xs font-semibold text-red-100">
            {formatCurrency(tutor.hourlyRate)}/hr
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tutor.tutorSubjects.map((item) => (
            <span key={item.subjectId} className="netflix-chip rounded-full px-3 py-1 text-xs">
              {item.subject.name}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-zinc-300">
          <span>{tutor.ratingAverage.toFixed(1)} rating</span>
          <span>{tutor.ratingCount} reviews</span>
        </div>
        <Link
          href={`/tutors/${tutor.id}`}
          className="netflix-button mt-2 inline-flex rounded-full px-4 py-2 text-sm font-semibold"
        >
          View tutor
        </Link>
      </div>
    </article>
  );
}
