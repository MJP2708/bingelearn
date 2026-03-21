import { NetflixRowsExperience } from "@/components/NetflixRowsExperience";
import { toLessonContentItem, toTutorContentItem } from "@/lib/content-items";
import { getRecommendationsForStudent } from "@/lib/recommendations";
import { getStudentDashboardData } from "@/lib/data";
import { requireStudent } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export default async function StudentPage() {
  const student = await requireStudent();
  const [{ lessons, tutors }, dashboard] = await Promise.all([
    getRecommendationsForStudent(student.id),
    getStudentDashboardData(student.id),
  ]);

  const lessonItems = lessons.map(toLessonContentItem);
  const tutorItems = tutors.map(toTutorContentItem);
  const continueItems = dashboard.recentProgress.map((event) => {
    const matchingLesson = lessons.find((lesson) => lesson.id === event.lesson.id);
    return toLessonContentItem(
      matchingLesson ?? {
        ...event.lesson,
        tutor: {
          name: "Recommended tutor",
          tutorProfile: null,
        },
      },
    );
  });
  const hero = tutorItems[0] ?? lessonItems[0];

  if (!hero) {
    return null;
  }

  return (
    <NetflixRowsExperience
      hero={hero}
      heroEyebrow="Student Home"
      rowLabel={`Because you studied ${dashboard.recentProgress[0]?.lesson.subject.name ?? "Math"}`}
      rows={[
        { title: `Because you studied ${dashboard.recentProgress[0]?.lesson.subject.name ?? "Math"}`, items: lessonItems },
        { title: `Continue Learning for ${student.name ?? "Student"}`, items: continueItems.length ? continueItems : lessonItems },
        { title: `Top Tutors in ${lessons[0]?.subject.name ?? "Math"}`, items: tutorItems },
        { title: "Recommended Lessons", items: lessonItems },
      ]}
    />
  );
}
