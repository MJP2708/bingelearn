import type { Lesson, LessonDifficulty, Subject, TutorProfile, User } from "@prisma/client";

type LessonCardProps = {
  lesson: Lesson & {
    subject: Subject;
    tutor: User & { tutorProfile: TutorProfile | null };
  };
};

const difficultyTone: Record<LessonDifficulty, string> = {
  BEGINNER: "bg-emerald-400/15 text-emerald-200",
  INTERMEDIATE: "bg-amber-400/15 text-amber-200",
  ADVANCED: "bg-rose-400/15 text-rose-200",
};

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <article className="surface-card group overflow-hidden rounded-[1.75rem] p-0 transition duration-300 hover:-translate-y-1 hover:border-white/18">
      <div className="h-24 bg-[radial-gradient(circle_at_top_left,_rgba(229,9,20,0.4),_transparent_38%),linear-gradient(135deg,#171717_0%,#080808_100%)]" />
      <div className="p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500">{lesson.subject.name}</p>
          <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${difficultyTone[lesson.difficulty]}`}>
          {lesson.difficulty.toLowerCase()}
        </span>
      </div>
      <p className="text-sm leading-6 text-zinc-400">{lesson.description}</p>
      <div className="mt-5 flex items-center justify-between text-sm text-zinc-500">
        <span>{lesson.durationMinutes} min</span>
        <span>{lesson.tutor.name}</span>
      </div>
      </div>
    </article>
  );
}
