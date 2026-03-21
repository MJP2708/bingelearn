import { ProgressEventType } from "@prisma/client";
import { getMockRecommendations } from "@/lib/mock-data";
import { isMockMode, withMockFallback } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";

export async function getRecommendationsForStudent(studentId: string) {
  if (isMockMode()) {
    return getMockRecommendations();
  }

  return withMockFallback(
    async () => {
      const failedSubjects = await prisma.progressEvent.groupBy({
        by: ["subjectId"],
        where: {
          studentId,
          type: ProgressEventType.QUIZ_FAILED,
        },
        _count: {
          subjectId: true,
        },
        orderBy: {
          _count: {
            subjectId: "desc",
          },
        },
        take: 3,
      });

      const prioritizedSubjectIds = failedSubjects.map((entry) => entry.subjectId);

      const prioritizedLessons = prioritizedSubjectIds.length
        ? await prisma.lesson.findMany({
            where: {
              isPublished: true,
              subjectId: { in: prioritizedSubjectIds },
            },
            include: {
              subject: true,
              tutor: {
                include: {
                  tutorProfile: true,
                },
              },
            },
            take: 5,
          })
        : [];

      const popularLessonGroups = await prisma.booking.groupBy({
        by: ["lessonId"],
        where: {
          lessonId: { not: null },
        },
        _count: {
          lessonId: true,
        },
        orderBy: {
          _count: {
            lessonId: "desc",
          },
        },
        take: 5,
      });

      const fallbackLessons = popularLessonGroups.length
        ? await prisma.lesson.findMany({
            where: {
              id: {
                in: popularLessonGroups
                  .map((entry) => entry.lessonId)
                  .filter((lessonId): lessonId is string => Boolean(lessonId)),
              },
            },
            include: {
              subject: true,
              tutor: {
                include: {
                  tutorProfile: true,
                },
              },
            },
          })
        : await prisma.lesson.findMany({
            where: { isPublished: true },
            include: {
              subject: true,
              tutor: {
                include: {
                  tutorProfile: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 5,
          });

      const lessons = [...prioritizedLessons, ...fallbackLessons]
        .filter((lesson, index, collection) => collection.findIndex((item) => item.id === lesson.id) === index)
        .slice(0, 5);

      const recommendationSubjectIds = lessons.map((lesson) => lesson.subjectId);

      const tutors = await prisma.tutorProfile.findMany({
        where: {
          isApproved: true,
          tutorSubjects: recommendationSubjectIds.length
            ? {
                some: {
                  subjectId: { in: recommendationSubjectIds },
                },
              }
            : undefined,
        },
        include: {
          user: true,
          tutorSubjects: {
            include: {
              subject: true,
            },
          },
        },
        orderBy: [{ ratingAverage: "desc" }, { ratingCount: "desc" }],
        take: 5,
      });

      return { lessons, tutors };
    },
    getMockRecommendations(),
    "recommendations",
  );
}
