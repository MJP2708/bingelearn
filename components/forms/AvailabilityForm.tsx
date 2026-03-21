import type { AvailabilitySlot } from "@prisma/client";
import { createAvailabilitySlot, deleteAvailabilitySlot } from "@/app/actions/tutor";
import { formatDateTime } from "@/lib/utils";

export function AvailabilityForm({ slots }: { slots: AvailabilitySlot[] }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <form action={createAvailabilitySlot} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white">Add available slot</h3>
        <input name="startsAt" type="datetime-local" required className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none" />
        <input name="endsAt" type="datetime-local" required className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none" />
        <button className="rounded-full bg-white px-5 py-3 font-medium text-slate-950">Save slot</button>
      </form>

      <div className="space-y-3">
        {slots.map((slot) => (
          <div key={slot.id} className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-white">{formatDateTime(slot.startsAt)}</p>
              <p className="text-sm text-slate-300">Ends {formatDateTime(slot.endsAt)}</p>
            </div>
            <form action={deleteAvailabilitySlot}>
              <input type="hidden" name="slotId" value={slot.id} />
              <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white">Remove</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
