import type { Lesson, Subject } from "@prisma/client";
import { createLesson, deleteLesson, toggleLessonPublish } from "@/app/actions/tutor";

type LessonFormProps = {
  subjects: Subject[];
  lessons: Array<Lesson & { subject: Subject }>;
};

export function LessonForm({ subjects, lessons }: LessonFormProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <form action={createLesson} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Create lesson</h3>
        <input
          name="title"
          placeholder="Lesson title"
          required
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
        />
        <textarea
          name="description"
          placeholder="Describe what the student will learn"
          required
          className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
        />
        <select name="subjectId" required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400">
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        <select name="difficulty" defaultValue="BEGINNER" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400">
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
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
        />
        <label className="flex items-center gap-3 text-sm text-slate-700">
          <input name="isPublished" type="checkbox" value="true" className="size-4 rounded border-slate-300" />
          Publish immediately
        </label>
        <button className="rounded-full bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700">Save lesson</button>
      </form>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-900">{lesson.title}</p>
                <p className="text-sm text-slate-600">
                  {lesson.subject.name} - {lesson.difficulty.toLowerCase()} - {lesson.durationMinutes} min
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{lesson.isPublished ? "Published" : "Draft"}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{lesson.description}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <form action={toggleLessonPublish}>
                <input type="hidden" name="lessonId" value={lesson.id} />
                <input type="hidden" name="isPublished" value={lesson.isPublished ? "false" : "true"} />
                <button className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">
                  {lesson.isPublished ? "Unpublish" : "Publish"}
                </button>
              </form>
              <form action={deleteLesson}>
                <input type="hidden" name="lessonId" value={lesson.id} />
                <button className="rounded-full border border-rose-200 px-4 py-2 text-sm text-rose-700 transition hover:bg-rose-50">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
