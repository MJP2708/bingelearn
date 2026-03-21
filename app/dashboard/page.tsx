import Link from "next/link";
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
    <div className="mx-auto max-w-[1100px] space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Student Command Center</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-900">Welcome back, {student.name ?? "Student"}</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Keep your momentum with AI plans, quizzes, tutor Q/A, and clear weekly goals in one place.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/student/wallet" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            Student Wallet
          </Link>
          <Link href="/binge-points" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Binge Points
          </Link>
          <Link href="/ai/personalized-learning" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            AI Learning Plan
          </Link>
          <Link href="/ai/quiz-homework" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            AI Quiz & Homework
          </Link>
          <Link href="/qa" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Ask Tutors
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Upcoming bookings</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{bookings.length}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Recommended lessons</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{lessons.length}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Plan status</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{subscription?.status === "active" ? "Student Plus Active" : "Free Explorer"}</p>
          <p className="mt-1 text-xs text-slate-500">Renews {subscription?.currentPeriodEnd ? formatDateTime(subscription.currentPeriodEnd) : "anytime"}</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Recommended lessons</h2>
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <article key={lesson.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{lesson.title}</p>
                    <p className="text-sm text-slate-600">
                      {lesson.subject.name} · {lesson.durationMinutes} min · {lesson.difficulty.toLowerCase()}
                    </p>
                  </div>
                  <Link href="/lessons" className="rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700">
                    Open lesson
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Tutor matches</h2>
          <div className="space-y-3">
            {tutors.map((tutor) => (
              <article key={tutor.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{tutor.user.name}</p>
                <p className="text-sm text-slate-600">{tutor.headline ?? "Personalized tutoring support"}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    {tutor.ratingAverage.toFixed(1)} stars · {tutor.ratingCount} reviews
                  </p>
                  <Link href="/student" className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-white">
                    Book trial
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Recent activity</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {recentProgress.map((event) => (
            <article key={event.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{event.lesson.title}</p>
              <p className="mt-1 text-sm text-slate-600">{event.lesson.subject.name}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-indigo-600">{event.type.replaceAll("_", " ")}</p>
              <p className="mt-1 text-sm text-slate-500">Score: {event.score ?? "-"}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
