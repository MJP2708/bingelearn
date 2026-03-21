import { notFound } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { SectionHeader } from "@/components/SectionHeader";
import { facultyTutorIds, getCoursesForFaculty, getFacultyById } from "@/lib/catalog";
import { toTutorContentItem } from "@/lib/content-items";
import { mockTutorProfiles } from "@/lib/mock-data";

type FacultyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function FacultyPage({ params }: FacultyPageProps) {
  const { id } = await params;
  const faculty = getFacultyById(id);

  if (!faculty) {
    notFound();
  }

  const courses = getCoursesForFaculty(faculty.id);
  const tutorIds = facultyTutorIds[faculty.id] ?? [];
  const topTutors = mockTutorProfiles.filter((tutor) => tutorIds.includes(tutor.id));

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(229,9,20,0.34),_transparent_26%),linear-gradient(115deg,#141414_10%,#0a0a0a_58%,#000_100%)] p-8 md:p-10">
        <div className="flex items-start gap-5">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-white/8 text-5xl">
            {faculty.iconEmoji}
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">Faculty pathway</p>
            <h1 className="text-4xl font-black tracking-[-0.04em] text-white">{faculty.nameTH}</h1>
            <p className="text-lg text-zinc-300">{faculty.nameEN}</p>
            <p className="max-w-3xl text-zinc-400">{faculty.description}</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="Deep Subjects" title="Faculty Courses" description="Course cards represent focused study lanes within this faculty, designed to be easy to extend later." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <article key={course.id} className="surface-card rounded-[1.5rem] p-5">
              <p className="text-lg font-bold text-white">{course.nameTH}</p>
              <p className="mt-1 text-sm text-zinc-400">{course.nameEN}</p>
              <p className="mt-4 text-sm leading-6 text-zinc-500">{course.shortDescription}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="Tutors" title="Top tutors for this faculty" description="Mock tutor matches filtered by faculty affinity so the page feels connected to the marketplace." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(topTutors.length ? topTutors : mockTutorProfiles.slice(0, 2)).map((tutor) => (
            <ContentCard key={tutor.id} item={toTutorContentItem(tutor)} />
          ))}
        </div>
      </section>
    </div>
  );
}
