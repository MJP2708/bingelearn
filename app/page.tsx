import { NetflixRowsExperience } from "@/components/NetflixRowsExperience";
import { toLessonContentItem, toTutorContentItem } from "@/lib/content-items";
import { getLandingData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { subjects, tutors, lessons } = await getLandingData();
  const tutorItems = tutors.map(toTutorContentItem);
  const lessonItems = lessons.map(toLessonContentItem);
  const featured = lessonItems[0] ?? tutorItems[0];

  if (!featured) {
    return null;
  }

  return (
    <NetflixRowsExperience
      hero={featured}
      heroEyebrow="Featured Tonight"
      rowLabel={`Because you studied ${subjects[0]?.name ?? "Algebra"}`}
      rows={[
        { title: `Because you studied ${subjects[0]?.name ?? "Algebra"}`, items: lessonItems },
        { title: "Continue Learning", items: lessonItems },
        { title: "Top Tutors", items: tutorItems },
        { title: "Recommended Lessons", items: lessonItems },
      ]}
    />
  );
}
