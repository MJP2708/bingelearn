import type { AvailabilitySlot } from "@prisma/client";
import { createAvailabilitySlot, deleteAvailabilitySlot } from "@/app/actions/tutor";
import { formatDateTime } from "@/lib/utils";

export function AvailabilityForm({ slots }: { slots: AvailabilitySlot[] }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <form action={createAvailabilitySlot} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Add available slot</h3>
        <input
          name="startsAt"
          type="datetime-local"
          required
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
        />
        <input
          name="endsAt"
          type="datetime-local"
          required
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
        />
        <button className="rounded-full bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700">Save slot</button>
      </form>

      <div className="space-y-3">
        {slots.map((slot) => (
          <div key={slot.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">{formatDateTime(slot.startsAt)}</p>
              <p className="text-sm text-slate-600">Ends {formatDateTime(slot.endsAt)}</p>
            </div>
            <form action={deleteAvailabilitySlot}>
              <input type="hidden" name="slotId" value={slot.id} />
              <button className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">Remove</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
