"use client";

import { useState } from "react";
import Link from "next/link";

type Thread = {
  id: string;
  student: string;
  subject: string;
  question: string;
  reply: string;
  tutor: string;
};

const initialThreads: Thread[] = [
  {
    id: "qa1",
    student: "Jamie",
    subject: "Algebra",
    question: "How do I avoid mistakes when solving linear equations fast?",
    reply: "Use a 3-step check: isolate variable, substitute back, and verify sign changes.",
    tutor: "Maya Chen",
  },
  {
    id: "qa2",
    student: "Nina",
    subject: "Physics",
    question: "When should I draw a free-body diagram in exam questions?",
    reply: "Always draw one when forces are involved. It prevents hidden sign and direction errors.",
    tutor: "David Wright",
  },
];

export default function QAPage() {
  const [threads, setThreads] = useState(initialThreads);
  const [subject, setSubject] = useState("Math");
  const [question, setQuestion] = useState("");

  function submitQuestion() {
    if (!question.trim()) {
      return;
    }

    setThreads((current) => [
      {
        id: `${Date.now()}`,
        student: "You",
        subject,
        question,
        reply: "Thanks! A tutor will answer soon. For now, AI suggests reviewing examples and attempting one timed practice.",
        tutor: "BingeLearn Support Tutor",
      },
      ...current,
    ]);
    setQuestion("");
  }

  return (
    <div className="mx-auto max-w-[1000px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Q/A with Tutors</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-900">Ask questions and get tutor guidance</h1>
        <p className="mt-2 text-sm text-slate-600">Students can post academic questions and receive tutor explanations, tips, and feedback.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/dashboard" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Back to dashboard
          </Link>
          <Link href="/student" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Find tutors
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Post a new question</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-[220px_1fr]">
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
            <span className="text-sm font-semibold text-slate-700">Question</span>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask your question..."
              className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
            />
          </label>
        </div>
        <button onClick={submitQuestion} className="mt-4 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          Submit question
        </button>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Recent Q/A threads</h2>
        <div className="mt-4 space-y-4">
          {threads.map((thread) => (
            <article key={thread.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">{thread.subject}</p>
                <p className="text-xs text-slate-500">Asked by {thread.student}</p>
              </div>
              <p className="mt-2 text-sm text-slate-800">{thread.question}</p>
              <div className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-indigo-600">Tutor reply · {thread.tutor}</p>
                <p className="mt-1 text-sm text-indigo-900">{thread.reply}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
