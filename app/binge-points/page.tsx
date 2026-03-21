"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const rewardCatalog = [
  { id: "r1", title: "10% off next tutor session", cost: 300 },
  { id: "r2", title: "AI Quiz Booster Pack", cost: 450 },
  { id: "r3", title: "Priority Q/A response", cost: 200 },
  { id: "r4", title: "Lesson bundle voucher", cost: 700 },
];

export default function BingePointsPage() {
  const [points, setPoints] = useState(640);
  const [history, setHistory] = useState<Array<{ id: string; label: string; value: number; type: "earn" | "redeem" }>>([
    { id: "p1", label: "Completed AI quiz streak", value: 120, type: "earn" },
    { id: "p2", label: "Booked tutor session", value: 180, type: "earn" },
    { id: "p3", label: "Redeemed priority Q/A", value: 200, type: "redeem" },
    { id: "p4", label: "Weekly learning target", value: 220, type: "earn" },
  ]);

  const earned = useMemo(() => history.filter((h) => h.type === "earn").reduce((sum, h) => sum + h.value, 0), [history]);
  const redeemed = useMemo(() => history.filter((h) => h.type === "redeem").reduce((sum, h) => sum + h.value, 0), [history]);

  function redeem(cost: number, title: string) {
    if (points < cost) {
      return;
    }

    setPoints((current) => current - cost);
    setHistory((current) => [{ id: `${Date.now()}`, label: `Redeemed ${title}`, value: cost, type: "redeem" }, ...current]);
  }

  return (
    <div className="mx-auto max-w-[1100px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Binge Points</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-900">Earn points while you learn</h1>
        <p className="mt-2 text-sm text-slate-600">Complete study goals, maintain streaks, and redeem points for real student perks.</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="rounded-2xl bg-indigo-600 px-5 py-4 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-100">Current balance</p>
            <p className="mt-1 text-3xl font-bold">{points.toLocaleString("th-TH")} pts</p>
          </div>
          <Link href="/dashboard" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Back to dashboard
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Points marketplace</h2>
          <div className="mt-4 space-y-3">
            {rewardCatalog.map((reward) => (
              <article key={reward.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{reward.title}</p>
                  <p className="text-xs text-slate-500">{reward.cost} points</p>
                </div>
                <button
                  onClick={() => redeem(reward.cost, reward.title)}
                  disabled={points < reward.cost}
                  className="rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Redeem
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Your point summary</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total earned</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{earned.toLocaleString("th-TH")} pts</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total redeemed</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{redeemed.toLocaleString("th-TH")} pts</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">Points in this page are demo values and reset with app restart.</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Recent point activity</h2>
        <div className="mt-4 space-y-3">
          {history.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">{entry.label}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{entry.type}</p>
              </div>
              <p className={`text-sm font-semibold ${entry.type === "earn" ? "text-emerald-700" : "text-rose-700"}`}>
                {entry.type === "earn" ? "+" : "-"}
                {entry.value.toLocaleString("th-TH")} pts
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
