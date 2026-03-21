"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const mockQuestions = [
  { id: "q1", question: "What is 3x + 5 = 20?", answer: "x = 5" },
  { id: "q2", question: "Name one law of motion used in daily life.", answer: "Newton's second law" },
  { id: "q3", question: "Write a thesis sentence for a short persuasive paragraph.", answer: "Any clear claim sentence" },
];

export default function AIQuizHomeworkPage() {
  const [subject, setSubject] = useState("Math");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [generated, setGenerated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const score = useMemo(() => {
    return mockQuestions.reduce((sum, item) => {
      const answer = (answers[item.id] ?? "").toLowerCase();
      return answer.includes(item.answer.toLowerCase().slice(0, 4)) ? sum + 1 : sum;
    }, 0);
  }, [answers]);

  function generate() {
    setGenerated(true);
    setSubmitted(false);
    setAnswers({});
  }

  function submit() {
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-[1000px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">AI Quiz & Homework</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-900">Generate instant practice and assignments</h1>
        <p className="mt-2 text-sm text-slate-600">Mock AI tool for on-demand quizzes, homework, and instant score feedback.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/dashboard" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Back to dashboard
          </Link>
          <Link href="/ai/personalized-learning" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Open AI Learning Plan
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Generate quiz homework</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Subject</span>
            <select
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
            >
              <option>Math</option>
              <option>Physics</option>
              <option>Biology</option>
              <option>English</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Difficulty</span>
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </label>
        </div>
        <button onClick={generate} className="mt-4 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          Generate now
        </button>
      </section>

      {generated ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            {subject} · {difficulty} quiz
          </h2>
          <div className="mt-4 space-y-4">
            {mockQuestions.map((item, index) => (
              <label key={item.id} className="block space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-sm font-semibold text-slate-800">
                  {index + 1}. {item.question}
                </span>
                <input
                  value={answers[item.id] ?? ""}
                  onChange={(event) => setAnswers((current) => ({ ...current, [item.id]: event.target.value }))}
                  placeholder="Type your answer..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-indigo-400"
                />
              </label>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button onClick={submit} className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
              Submit answers
            </button>
            {submitted ? <p className="text-sm font-semibold text-emerald-700">Score: {score} / {mockQuestions.length}</p> : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
