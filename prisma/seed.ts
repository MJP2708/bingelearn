import { PrismaClient, BookingStatus, LessonDifficulty, ProgressEventType, UserRole } from "@prisma/client";
import { hash } from "bcryptjs";
import { addDays, addHours } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("Password123!", 10);

  const subjects = await Promise.all(
    [
      { name: "Math", slug: "math" },
      { name: "Biology", slug: "biology" },
      { name: "Physics", slug: "physics" },
      { name: "English", slug: "english" },
    ].map((subject) =>
      prisma.subject.upsert({
        where: { slug: subject.slug },
        update: subject,
        create: subject,
      }),
    ),
  );

  const [admin, student, tutorA, tutorB] = await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@bingelearn.dev" },
      update: {},
      create: {
        email: "admin@bingelearn.dev",
        name: "Admin User",
        passwordHash,
        role: UserRole.ADMIN,
        bio: "Keeps the platform running smoothly.",
      },
    }),
    prisma.user.upsert({
      where: { email: "student@bingelearn.dev" },
      update: {},
      create: {
        email: "student@bingelearn.dev",
        name: "Jamie Student",
        passwordHash,
        role: UserRole.STUDENT,
        bio: "Focused on improving exam scores across STEM subjects.",
        studentProfile: {
          create: {
            gradeLevel: "Grade 10",
            goals: "Boost confidence in algebra and biology before finals.",
          },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: "maya@bingelearn.dev" },
      update: {},
      create: {
        email: "maya@bingelearn.dev",
        name: "Maya Chen",
        passwordHash,
        role: UserRole.TUTOR,
        bio: "Patient STEM tutor who breaks down hard topics into manageable steps.",
      },
    }),
    prisma.user.upsert({
      where: { email: "david@bingelearn.dev" },
      update: {},
      create: {
        email: "david@bingelearn.dev",
        name: "David Wright",
        passwordHash,
        role: UserRole.TUTOR,
        bio: "Physics and math specialist with an exam-prep mindset.",
      },
    }),
  ]);

  const [mayaProfile, davidProfile] = await Promise.all([
    prisma.tutorProfile.upsert({
      where: { userId: tutorA.id },
      update: {},
      create: {
        userId: tutorA.id,
        introVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        hourlyRate: 45,
        ratingAverage: 4.9,
        ratingCount: 36,
        headline: "Math and Biology tutor for middle and high school students",
        yearsExperience: 6,
        isApproved: true,
      },
    }),
    prisma.tutorProfile.upsert({
      where: { userId: tutorB.id },
      update: {},
      create: {
        userId: tutorB.id,
        introVideoUrl: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
        hourlyRate: 55,
        ratingAverage: 4.8,
        ratingCount: 24,
        headline: "Physics-first problem solving with clear exam strategies",
        yearsExperience: 8,
        isApproved: true,
      },
    }),
  ]);

  await prisma.review.deleteMany({
    where: {
      OR: [{ tutorId: tutorA.id }, { tutorId: tutorB.id }],
    },
  });

  await prisma.booking.deleteMany({
    where: {
      OR: [{ studentId: student.id }, { tutorId: tutorA.id }, { tutorId: tutorB.id }],
    },
  });

  await prisma.progressEvent.deleteMany({
    where: {
      studentId: student.id,
    },
  });

  await prisma.subscription.deleteMany({
    where: {
      studentId: student.id,
    },
  });

  await prisma.availabilitySlot.deleteMany({
    where: {
      tutorProfileId: {
        in: [mayaProfile.id, davidProfile.id],
      },
    },
  });

  await prisma.tutorSubject.deleteMany({
    where: {
      tutorProfileId: {
        in: [mayaProfile.id, davidProfile.id],
      },
    },
  });

  await prisma.lesson.deleteMany({
    where: {
      tutorId: {
        in: [tutorA.id, tutorB.id],
      },
    },
  });

  await prisma.tutorSubject.createMany({
    data: [
      { tutorProfileId: mayaProfile.id, subjectId: subjects[0].id },
      { tutorProfileId: mayaProfile.id, subjectId: subjects[1].id },
      { tutorProfileId: davidProfile.id, subjectId: subjects[0].id },
      { tutorProfileId: davidProfile.id, subjectId: subjects[2].id },
    ],
    skipDuplicates: true,
  });

  const lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        tutorId: tutorA.id,
        subjectId: subjects[0].id,
        title: "Algebra Confidence Builder",
        description: "Build fluency with equations, variables, and exam-style algebra drills.",
        difficulty: LessonDifficulty.BEGINNER,
        isPublished: true,
        durationMinutes: 50,
      },
    }),
    prisma.lesson.create({
      data: {
        tutorId: tutorA.id,
        subjectId: subjects[1].id,
        title: "Biology Memory Systems",
        description: "Learn cell biology and ecosystems with recall systems that actually stick.",
        difficulty: LessonDifficulty.INTERMEDIATE,
        isPublished: true,
        durationMinutes: 45,
      },
    }),
    prisma.lesson.create({
      data: {
        tutorId: tutorB.id,
        subjectId: subjects[2].id,
        title: "Mechanics Deep Dive",
        description: "Master forces, motion, and free-body diagrams through worked examples.",
        difficulty: LessonDifficulty.ADVANCED,
        isPublished: true,
        durationMinutes: 60,
      },
    }),
  ]);

  const booking = await prisma.booking.create({
    data: {
      studentId: student.id,
      tutorId: tutorA.id,
      lessonId: lessons[0].id,
      startTime: addDays(new Date(), 1),
      endTime: addHours(addDays(new Date(), 1), 1),
      status: BookingStatus.CONFIRMED,
      meetingUrl: "https://meet.google.com/binge-learn-demo",
    },
  });

  await prisma.review.upsert({
    where: { bookingId: booking.id },
    update: {},
    create: {
      bookingId: booking.id,
      studentId: student.id,
      tutorId: tutorA.id,
      rating: 5,
      comment: "Very clear explanations and good pacing.",
    },
  });

  await prisma.progressEvent.createMany({
    data: [
      {
        studentId: student.id,
        subjectId: subjects[0].id,
        lessonId: lessons[0].id,
        type: ProgressEventType.QUIZ_FAILED,
        score: 52,
      },
      {
        studentId: student.id,
        subjectId: subjects[0].id,
        lessonId: lessons[0].id,
        type: ProgressEventType.QUIZ_FAILED,
        score: 61,
      },
      {
        studentId: student.id,
        subjectId: subjects[1].id,
        lessonId: lessons[1].id,
        type: ProgressEventType.STARTED_LESSON,
      },
      {
        studentId: student.id,
        subjectId: subjects[1].id,
        lessonId: lessons[1].id,
        type: ProgressEventType.QUIZ_PASSED,
        score: 81,
      },
    ],
  });

  await prisma.subscription.upsert({
    where: { stripeCustomerId: "cus_demo_student" },
    update: {},
    create: {
      studentId: student.id,
      stripeCustomerId: "cus_demo_student",
      stripeSubscriptionId: "sub_demo_student",
      status: "active",
      currentPeriodEnd: addDays(new Date(), 30),
    },
  });

  await prisma.availabilitySlot.createMany({
    data: [
      {
        tutorProfileId: mayaProfile.id,
        startsAt: addDays(new Date(), 2),
        endsAt: addHours(addDays(new Date(), 2), 1),
      },
      {
        tutorProfileId: mayaProfile.id,
        startsAt: addDays(new Date(), 3),
        endsAt: addHours(addDays(new Date(), 3), 1),
      },
      {
        tutorProfileId: davidProfile.id,
        startsAt: addDays(new Date(), 2),
        endsAt: addHours(addDays(new Date(), 2), 2),
      },
    ],
    skipDuplicates: true,
  });

  void admin;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
