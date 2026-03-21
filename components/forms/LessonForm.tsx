import type { Lesson, Subject } from "@prisma/client";
import { createLesson, deleteLesson, toggleLessonPublish } from "@/app/actions/tutor";

type LessonFormProps = {
  subjects: Subject[];
  lessons: Array<Lesson & { subject: Subject }>;
};

export function LessonForm({ subjects, lessons }: LessonFormProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <form action={createLesson} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white">Create lesson</h3>
        <input name="title" placeholder="Lesson title" required className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none" />
        <textarea
          name="description"
          placeholder="Describe what the student will learn"
          required
          className="min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
        />
        <select name="subjectId" required className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none">
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        <select name="difficulty" defaultValue="BEGINNER" className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none">
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>
        <input
          name="durationMinutes"
          type="number"
          min="15"
          step="15"
          defaultValue="60"
          required
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
        />
        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input name="isPublished" type="checkbox" value="true" className="size-4 rounded border-white/20" />
          Publish immediately
        </label>
        <button className="rounded-full bg-white px-5 py-3 font-medium text-slate-950">Save lesson</button>
      </form>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-white">{lesson.title}</p>
                <p className="text-sm text-slate-300">
                  {lesson.subject.name} · {lesson.difficulty.toLowerCase()} · {lesson.durationMinutes} min
                </p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                {lesson.isPublished ? "Published" : "Draft"}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-300">{lesson.description}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <form action={toggleLessonPublish}>
                <input type="hidden" name="lessonId" value={lesson.id} />
                <input type="hidden" name="isPublished" value={lesson.isPublished ? "false" : "true"} />
                <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white">
                  {lesson.isPublished ? "Unpublish" : "Publish"}
                </button>
              </form>
              <form action={deleteLesson}>
                <input type="hidden" name="lessonId" value={lesson.id} />
                <button className="rounded-full border border-rose-400/20 px-4 py-2 text-sm text-rose-200">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
