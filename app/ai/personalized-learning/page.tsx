"use client";

import { useState } from "react";
import Link from "next/link";

const planTemplates = [
  "Daily 45-minute focused sprint with quiz recap",
  "Alternate concept day + problem day for faster retention",
  "Weekend mock test + weekday weak-topic repair",
];

export default function AIPersonalizedLearningPage() {
  const [goal, setGoal] = useState("Improve algebra for final exam");
  const [studyTime, setStudyTime] = useState(60);
  const [level, setLevel] = useState("High School");
  const [generated, setGenerated] = useState(false);

  function generatePlan() {
    setGenerated(true);
  }

  return (
    <div className="mx-auto max-w-[1000px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">AI Personalized Learning</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-900">Generate your adaptive study plan</h1>
        <p className="mt-2 text-sm text-slate-600">Mock AI planner that builds your weekly learning path from your goal, level, and available time.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/dashboard" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Back to dashboard
          </Link>
          <Link href="/ai/quiz-homework" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Go to AI Quiz/Homework
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Student inputs</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Primary goal</span>
            <input
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Level</span>
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
            >
              <option>Middle School</option>
              <option>High School</option>
              <option>Test Prep</option>
              <option>University Prep</option>
            </select>
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Daily study time: {studyTime} minutes</span>
            <input type="range" min={20} max={180} step={10} value={studyTime} onChange={(event) => setStudyTime(Number(event.target.value))} className="w-full" />
          </label>
        </div>
        <button onClick={generatePlan} className="mt-4 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          Generate learning plan
        </button>
      </section>

      {generated ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Your AI plan (mock)</h2>
          <p className="mt-2 text-sm text-slate-600">
            Goal: <span className="font-semibold text-slate-900">{goal}</span> · Level: <span className="font-semibold text-slate-900">{level}</span> ·
            Time: <span className="font-semibold text-slate-900">{studyTime} min/day</span>
          </p>
          <div className="mt-4 grid gap-3">
            {planTemplates.map((plan, index) => (
              <article key={plan} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-indigo-600">Week strategy {index + 1}</p>
                <p className="mt-1 text-sm text-slate-800">{plan}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
