import { ContentCard } from "@/components/ContentCard";
import { SectionHeader } from "@/components/SectionHeader";
import { toLessonContentItem } from "@/lib/content-items";
import { getPublishedLessons } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function LessonsPage() {
  const lessons = await getPublishedLessons();

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="Catalog" title="Lesson Library" description="Published lessons presented as a Netflix-like catalog of learning titles." />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {lessons.map((lesson) => (
          <ContentCard key={lesson.id} item={toLessonContentItem(lesson)} />
        ))}
      </div>
    </div>
  );
}
