"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const topUpPackages = [300, 500, 1000, 2000];

export default function StudentWalletPage() {
  const [balance, setBalance] = useState(850);
  const [selectedTopUp, setSelectedTopUp] = useState(500);
  const [history, setHistory] = useState<Array<{ id: string; label: string; amount: number; type: "topup" | "spent" }>>([
    { id: "t1", label: "Starter top-up", amount: 500, type: "topup" },
    { id: "t2", label: "Booked Algebra Trial", amount: 150, type: "spent" },
    { id: "t3", label: "Bought AI Quiz Pack", amount: 100, type: "spent" },
    { id: "t4", label: "Promo bonus", amount: 600, type: "topup" },
  ]);

  const totalTopup = useMemo(() => history.filter((item) => item.type === "topup").reduce((sum, item) => sum + item.amount, 0), [history]);
  const totalSpend = useMemo(() => history.filter((item) => item.type === "spent").reduce((sum, item) => sum + item.amount, 0), [history]);

  function handleTopUp() {
    setBalance((current) => current + selectedTopUp);
    setHistory((current) => [{ id: `${Date.now()}`, label: "Wallet top-up", amount: selectedTopUp, type: "topup" }, ...current]);
  }

  return (
    <div className="mx-auto max-w-[1100px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Student Wallet</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-900">Top up and pay instantly</h1>
            <p className="mt-2 text-sm text-slate-600">Use your wallet balance for sessions, AI tools, and premium learning tracks.</p>
          </div>
          <div className="rounded-2xl bg-indigo-600 px-5 py-4 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-100">Available balance</p>
            <p className="mt-1 text-3xl font-bold">฿{balance.toLocaleString("th-TH")}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/dashboard" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Back to Dashboard
          </Link>
          <Link href="/binge-points" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Earn Binge Points
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Top-up amount</h2>
          <p className="mt-1 text-sm text-slate-600">Choose a package and confirm. This is mock checkout for demo use.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {topUpPackages.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setSelectedTopUp(amount)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  selectedTopUp === amount ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                ฿{amount.toLocaleString("th-TH")}
              </button>
            ))}
          </div>
          <button onClick={handleTopUp} className="mt-4 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
            Top up now
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Wallet summary</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total topped up</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">฿{totalTopup.toLocaleString("th-TH")}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total spent</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">฿{totalSpend.toLocaleString("th-TH")}</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">Tip: keep at least ฿500 in wallet for instant tutor booking.</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Recent transactions</h2>
        <div className="mt-4 space-y-3">
          {history.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.type === "topup" ? "Top up" : "Spend"}</p>
              </div>
              <p className={`text-sm font-semibold ${item.type === "topup" ? "text-emerald-700" : "text-rose-700"}`}>
                {item.type === "topup" ? "+" : "-"}฿{item.amount.toLocaleString("th-TH")}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
