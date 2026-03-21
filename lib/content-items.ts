export interface TutorContentSource {
  id: string;
  hourlyRate: number;
  ratingAverage: number;
  ratingCount: number;
  headline?: string | null;
  yearsExperience?: number;
  user: {
    name?: string | null;
    bio?: string | null;
  };
  tutorSubjects: Array<{
    subject: {
      name: string;
      slug?: string;
    };
  }>;
}

export interface LessonContentSource {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
  subject: {
    name: string;
    slug?: string;
  };
  tutor: {
    name?: string | null;
    tutorProfile?: {
      ratingAverage?: number;
    } | null;
  };
}

export interface ContentItem {
  id: string;
  kind: "tutor" | "lesson";
  title: string;
  subtitle: string;
  description: string;
  href: string;
  image: string;
  badge?: string;
  ratingLabel: string;
  meta: string[];
  tags: string[];
  ctaLabel: string;
}

function pickHeroGradient(seed: string) {
  const gradients = [
    "linear-gradient(135deg, rgba(229,9,20,0.78), rgba(20,20,20,0.6) 45%, rgba(20,20,20,0.9) 100%)",
    "linear-gradient(135deg, rgba(164,22,26,0.82), rgba(18,18,18,0.7) 44%, rgba(8,8,8,0.95) 100%)",
    "linear-gradient(135deg, rgba(81,20,24,0.88), rgba(22,22,22,0.72) 48%, rgba(9,9,9,0.96) 100%)",
  ];

  const index = seed.length % gradients.length;
  return gradients[index];
}

export function toTutorContentItem(tutor: TutorContentSource): ContentItem {
  const primarySubject = tutor.tutorSubjects[0]?.subject.name ?? "Tutoring";
  const title = tutor.user.name ?? "Tutor";

  return {
    id: tutor.id,
    kind: "tutor",
    title,
    subtitle: tutor.headline ?? `${primarySubject} tutor`,
    description: tutor.user.bio ?? "Personalized one-to-one tutoring sessions with flexible scheduling.",
    href: `/tutors/${tutor.id}`,
    image: pickHeroGradient(title),
    badge: tutor.ratingAverage >= 4.8 ? "Top 10" : "Featured",
    ratingLabel: `${tutor.ratingAverage.toFixed(1)} Match`,
    meta: [`${primarySubject}`, `$${tutor.hourlyRate}/hr`, `${tutor.yearsExperience ?? 0} yrs`],
    tags: tutor.tutorSubjects.map((item) => item.subject.name).slice(0, 3),
    ctaLabel: "Book session",
  };
}

export function toLessonContentItem(lesson: LessonContentSource): ContentItem {
  return {
    id: lesson.id,
    kind: "lesson",
    title: lesson.title,
    subtitle: `${lesson.subject.name} with ${lesson.tutor.name ?? "Tutor"}`,
    description: lesson.description,
    href: "/lessons",
    image: pickHeroGradient(lesson.title),
    badge: lesson.difficulty === "ADVANCED" ? "Intense" : lesson.difficulty === "BEGINNER" ? "Start Here" : "Trending",
    ratingLabel: `${lesson.tutor.tutorProfile?.ratingAverage?.toFixed(1) ?? "4.8"} Rated`,
    meta: [lesson.subject.name, `${lesson.durationMinutes} min`, lesson.difficulty.toLowerCase()],
    tags: [lesson.difficulty.toLowerCase(), `${lesson.durationMinutes} minutes`, "Lesson"],
    ctaLabel: "Start learning",
  };
}
