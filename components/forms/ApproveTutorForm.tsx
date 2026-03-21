import { updateTutorApproval } from "@/app/actions/admin";

export function ApproveTutorForm({ tutorProfileId, isApproved }: { tutorProfileId: string; isApproved: boolean }) {
  return (
    <form action={updateTutorApproval}>
      <input type="hidden" name="tutorProfileId" value={tutorProfileId} />
      <input type="hidden" name="isApproved" value={isApproved ? "false" : "true"} />
      <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white">
        {isApproved ? "Reject" : "Approve"}
      </button>
    </form>
  );
}
