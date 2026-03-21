import { BookingStatus, UserRole } from "@prisma/client";
import {
  getMockAdminDashboardData,
  getMockLandingData,
  getMockPublishedLessons,
  getMockStudentDashboardData,
  getMockTutorAvailabilityData,
  getMockTutorDashboardData,
  getMockTutorDetail,
  getMockTutorLessonData,
  getMockTutorList,
} from "@/lib/mock-data";
import { isMockMode, withMockFallback } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";

export async function getLandingData() {
  if (isMockMode()) {
    return getMockLandingData();
  }

  return withMockFallback(
    async () => {
      const [subjects, tutors, lessons] = await Promise.all([
        prisma.subject.findMany({ orderBy: { name: "asc" } }),
        prisma.tutorProfile.findMany({
          where: { isApproved: true },
          include: {
            user: true,
            tutorSubjects: { include: { subject: true } },
          },
          orderBy: [{ ratingAverage: "desc" }, { ratingCount: "desc" }],
          take: 3,
        }),
        prisma.lesson.findMany({
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
          take: 3,
        }),
      ]);

      return { subjects, tutors, lessons };
    },
    getMockLandingData(),
    "landing data",
  );
}

export async function getStudentDashboardData(studentId: string) {
  if (isMockMode()) {
    return getMockStudentDashboardData();
  }

  return withMockFallback(
    async () => {
      const [bookings, recentProgress, subscription] = await Promise.all([
        prisma.booking.findMany({
          where: { studentId, status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] } },
          include: {
            tutor: { include: { tutorProfile: true } },
            lesson: { include: { subject: true } },
          },
          orderBy: { startTime: "asc" },
          take: 5,
        }),
        prisma.progressEvent.findMany({
          where: { studentId },
          include: {
            lesson: { include: { subject: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 3,
        }),
        prisma.subscription.findFirst({
          where: { studentId },
          orderBy: { currentPeriodEnd: "desc" },
        }),
      ]);

      return { bookings, recentProgress, subscription };
    },
    getMockStudentDashboardData(),
    "student dashboard",
  );
}

export async function getTutorList(filters: {
  subject?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}) {
  if (isMockMode()) {
    return getMockTutorList(filters);
  }

  return withMockFallback(
    () =>
      prisma.tutorProfile.findMany({
        where: {
          isApproved: true,
          hourlyRate: {
            gte: filters.minPrice,
            lte: filters.maxPrice,
          },
          ratingAverage: filters.minRating ? { gte: filters.minRating } : undefined,
          tutorSubjects: filters.subject
            ? {
                some: {
                  subject: {
                    slug: filters.subject,
                  },
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
      }),
    getMockTutorList(filters),
    "tutor list",
  );
}

export async function getTutorDetail(id: string) {
  if (isMockMode()) {
    return getMockTutorDetail(id);
  }

  return withMockFallback(
    () =>
      prisma.tutorProfile.findUnique({
        where: { id },
        include: {
          tutorSubjects: {
            include: {
              subject: true,
            },
          },
          availability: {
            orderBy: { startsAt: "asc" },
          },
          user: {
            include: {
              tutorLessons: {
                where: { isPublished: true },
                include: { subject: true },
                orderBy: { createdAt: "desc" },
              },
              tutorReviews: {
                include: {
                  student: true,
                  booking: true,
                },
                orderBy: { createdAt: "desc" },
                take: 5,
              },
            },
          },
        },
      }),
    getMockTutorDetail(id),
    "tutor detail",
  );
}

export async function getPublishedLessons() {
  if (isMockMode()) {
    return getMockPublishedLessons();
  }

  return withMockFallback(
    () =>
      prisma.lesson.findMany({
        where: { isPublished: true },
        include: {
          subject: true,
          tutor: {
            include: {
              tutorProfile: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
    getMockPublishedLessons(),
    "published lessons",
  );
}

export async function getTutorDashboardData(tutorId: string) {
  if (isMockMode()) {
    return getMockTutorDashboardData(tutorId);
  }

  return withMockFallback(
    async () => {
      const [bookings, lessonCount, profile] = await Promise.all([
        prisma.booking.findMany({
          where: { tutorId, status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] } },
          include: {
            student: true,
            lesson: {
              include: {
                subject: true,
              },
            },
          },
          orderBy: { startTime: "asc" },
        }),
        prisma.lesson.count({
          where: { tutorId },
        }),
        prisma.tutorProfile.findUnique({
          where: { userId: tutorId },
        }),
      ]);

      return {
        bookings,
        lessonCount,
        ratingAverage: profile?.ratingAverage ?? 0,
        ratingCount: profile?.ratingCount ?? 0,
      };
    },
    getMockTutorDashboardData(tutorId),
    "tutor dashboard",
  );
}

export async function getTutorLessonData(tutorId: string) {
  if (isMockMode()) {
    return getMockTutorLessonData(tutorId);
  }

  return withMockFallback(
    async () => {
      const [subjects, lessons] = await Promise.all([
      prisma.subject.findMany({ orderBy: { name: "asc" } }),
        prisma.lesson.findMany({
          where: { tutorId },
          include: { subject: true },
          orderBy: { createdAt: "desc" },
        }),
      ]);

      return { subjects, lessons };
    },
    getMockTutorLessonData(tutorId),
    "tutor lessons",
  );
}

export async function getTutorAvailabilityData(tutorId: string) {
  if (isMockMode()) {
    return getMockTutorAvailabilityData(tutorId);
  }

  return withMockFallback(
    async () => {
      const profile = await prisma.tutorProfile.findUnique({
        where: { userId: tutorId },
        include: {
          availability: {
            orderBy: { startsAt: "asc" },
          },
        },
      });

      return profile?.availability ?? [];
    },
    getMockTutorAvailabilityData(tutorId),
    "tutor availability",
  );
}

export async function getAdminDashboardData(role?: UserRole) {
  if (isMockMode()) {
    return getMockAdminDashboardData(role);
  }

  return withMockFallback(
    async () => {
      const [users, tutorProfiles, bookings, subscriptions] = await Promise.all([
        prisma.user.findMany({
          where: role ? { role } : undefined,
          include: {
            tutorProfile: true,
            studentProfile: true,
          },
          orderBy: { createdAt: "desc" },
        }),
        prisma.tutorProfile.findMany({
          include: {
            user: true,
          },
          orderBy: { user: { createdAt: "desc" } },
        }),
        prisma.booking.count(),
        prisma.subscription.findMany(),
      ]);

      const revenue = subscriptions.filter((subscription) => subscription.status === "active").length * 99;

      return {
        users,
        tutorProfiles,
        metrics: {
          users: users.length,
          bookings,
          revenue,
        },
      };
    },
    getMockAdminDashboardData(role),
    "admin dashboard",
  );
}
