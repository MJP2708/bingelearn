import { AvailabilityForm } from "@/components/forms/AvailabilityForm";
import { SectionHeader } from "@/components/SectionHeader";
import { getTutorAvailabilityData } from "@/lib/data";
import { requireTutor } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export default async function TutorAvailabilityPage() {
  const tutor = await requireTutor();
  const slots = await getTutorAvailabilityData(tutor.id);

  return (
    <div className="space-y-8">
      <SectionHeader title="Availability" description="Simple persisted time slots for the MVP booking flow." />
      <AvailabilityForm slots={slots} />
    </div>
  );
}
