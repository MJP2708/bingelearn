"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function TutorWalletPage() {
  const [availableBalance, setAvailableBalance] = useState(12450);
  const [withdrawAmount, setWithdrawAmount] = useState(2000);
  const [history, setHistory] = useState<Array<{ id: string; label: string; amount: number; type: "income" | "withdraw" }>>([
    { id: "w1", label: "Physics 1:1 session", amount: 1200, type: "income" },
    { id: "w2", label: "SAT Verbal mini-course", amount: 1800, type: "income" },
    { id: "w3", label: "Bank withdrawal", amount: 2500, type: "withdraw" },
    { id: "w4", label: "Calculus trial package", amount: 1450, type: "income" },
  ]);

  const totalIncome = useMemo(() => history.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0), [history]);
  const totalWithdraw = useMemo(() => history.filter((item) => item.type === "withdraw").reduce((sum, item) => sum + item.amount, 0), [history]);

  function handleWithdraw() {
    const safeAmount = Math.max(0, Math.min(withdrawAmount, availableBalance));

    if (safeAmount === 0) {
      return;
    }

    setAvailableBalance((current) => current - safeAmount);
    setHistory((current) => [{ id: `${Date.now()}`, label: "Withdrawal request", amount: safeAmount, type: "withdraw" }, ...current]);
  }

  return (
    <div className="mx-auto max-w-[1100px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Tutor Wallet</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-900">Withdraw your teaching earnings</h1>
            <p className="mt-2 text-sm text-slate-600">Track payouts, see net earnings, and request withdrawals in one place.</p>
          </div>
          <div className="rounded-2xl bg-indigo-600 px-5 py-4 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-100">Available to withdraw</p>
            <p className="mt-1 text-3xl font-bold">฿{availableBalance.toLocaleString("th-TH")}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/tutor/dashboard" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Back to Tutor Dashboard
          </Link>
          <Link href="/tutor/lessons" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Manage Lessons
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Request withdrawal</h2>
          <p className="mt-1 text-sm text-slate-600">Mock transfer to Thai bank account within 24 hours.</p>
          <label className="mt-4 block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Amount (THB)</span>
            <input
              type="number"
              min={100}
              max={availableBalance}
              value={withdrawAmount}
              onChange={(event) => setWithdrawAmount(Number(event.target.value))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
            />
          </label>
          <button onClick={handleWithdraw} className="mt-4 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
            Withdraw now
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Earnings summary</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total income</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">฿{totalIncome.toLocaleString("th-TH")}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total withdrawn</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">฿{totalWithdraw.toLocaleString("th-TH")}</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">Commission and payout timing shown here are demo values.</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Wallet activity</h2>
        <div className="mt-4 space-y-3">
          {history.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.type === "income" ? "Income" : "Withdrawal"}</p>
              </div>
              <p className={`text-sm font-semibold ${item.type === "income" ? "text-emerald-700" : "text-rose-700"}`}>
                {item.type === "income" ? "+" : "-"}฿{item.amount.toLocaleString("th-TH")}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
