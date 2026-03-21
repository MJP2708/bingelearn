import { updateTutorApproval } from "@/app/actions/admin";

export function ApproveTutorForm({ tutorProfileId, isApproved }: { tutorProfileId: string; isApproved: boolean }) {
  return (
    <form action={updateTutorApproval}>
      <input type="hidden" name="tutorProfileId" value={tutorProfileId} />
      <input type="hidden" name="isApproved" value={isApproved ? "false" : "true"} />
      <button className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">
        {isApproved ? "Reject" : "Approve"}
      </button>
    </form>
  );
}
