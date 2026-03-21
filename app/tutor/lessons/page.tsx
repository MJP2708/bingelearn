import { LessonForm } from "@/components/forms/LessonForm";
import { SectionHeader } from "@/components/SectionHeader";
import { getTutorLessonData } from "@/lib/data";
import { requireTutor } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export default async function TutorLessonsPage() {
  const tutor = await requireTutor();
  const { subjects, lessons } = await getTutorLessonData(tutor.id);

  return (
    <div className="space-y-8">
      <SectionHeader title="Manage lessons" description="Create, publish, unpublish, and remove lessons from the tutor dashboard." />
      <LessonForm subjects={subjects} lessons={lessons} />
    </div>
  );
}
