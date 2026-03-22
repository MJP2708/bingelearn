import { createBooking } from "@/app/actions/bookings";

type BookingFormProps = {
  tutorId: string;
  lessonId?: string;
};

export function BookingForm({ tutorId, lessonId }: BookingFormProps) {
  return (
    <form action={createBooking} className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <input type="hidden" name="tutorId" value={tutorId} />
      {lessonId ? <input type="hidden" name="lessonId" value={lessonId} /> : null}
      <label className="block space-y-2">
        <span className="text-sm text-slate-700">Preferred start time</span>
        <input
          type="datetime-local"
          name="startTime"
          required
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-400"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-slate-700">Duration</span>
        <select name="durationMinutes" defaultValue="60" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-400">
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>
          <option value="90">90 minutes</option>
        </select>
      </label>
      <button className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">Book a session</button>
    </form>
  );
}
