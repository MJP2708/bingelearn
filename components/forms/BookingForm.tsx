import { createBooking } from "@/app/actions/bookings";

type BookingFormProps = {
  tutorId: string;
  lessonId?: string;
};

export function BookingForm({ tutorId, lessonId }: BookingFormProps) {
  return (
    <form action={createBooking} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      <input type="hidden" name="tutorId" value={tutorId} />
      {lessonId ? <input type="hidden" name="lessonId" value={lessonId} /> : null}
      <label className="block space-y-2">
        <span className="text-sm text-slate-300">Preferred start time</span>
        <input
          type="datetime-local"
          name="startTime"
          required
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-slate-300">Duration</span>
        <select name="durationMinutes" defaultValue="60" className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none">
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>
          <option value="90">90 minutes</option>
        </select>
      </label>
      <button className="rounded-full bg-[var(--color-accent)] px-5 py-3 font-medium text-slate-950 transition hover:opacity-90">
        Book a session
      </button>
    </form>
  );
}
