import { addDays, addHours } from "date-fns";
import { BookingStatus, LessonDifficulty, ProgressEventType, UserRole } from "@prisma/client";

const now = new Date("2026-03-21T09:00:00.000Z");

export const mockSubjects = [
  { id: "subject-math", name: "Math", slug: "math" },
  { id: "subject-biology", name: "Biology", slug: "biology" },
  { id: "subject-physics", name: "Physics", slug: "physics" },
  { id: "subject-english", name: "English", slug: "english" },
];

export const mockStudentUser = {
  id: "user-student",
  name: "Jamie Student",
  email: "student@mock.bingelearn.dev",
  passwordHash: null,
  role: UserRole.STUDENT,
  bio: "Focused on improving confidence before exams.",
  avatarUrl: null,
  createdAt: now,
  updatedAt: now,
  studentProfile: {
    id: "student-profile-1",
    userId: "user-student",
    gradeLevel: "Grade 10",
    goals: "Get stronger at algebra and biology quiz performance.",
  },
  tutorProfile: null,
};

export const mockTutorUsers = [
  {
    id: "user-tutor-1",
    name: "Maya Chen",
    email: "maya@mock.bingelearn.dev",
    passwordHash: null,
    role: UserRole.TUTOR,
    bio: "Patient STEM tutor who helps students build momentum fast.",
    avatarUrl: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "user-tutor-2",
    name: "David Wright",
    email: "david@mock.bingelearn.dev",
    passwordHash: null,
    role: UserRole.TUTOR,
    bio: "Physics and math tutor with a clear exam-prep teaching style.",
    avatarUrl: null,
    createdAt: now,
    updatedAt: now,
  },
];

export const mockAdminUser = {
  id: "user-admin",
  name: "Admin User",
  email: "admin@mock.bingelearn.dev",
  passwordHash: null,
  role: UserRole.ADMIN,
  bio: "Keeps the platform healthy and tutors approved.",
  avatarUrl: null,
  createdAt: now,
  updatedAt: now,
  studentProfile: null,
  tutorProfile: null,
};

export const mockTutorProfiles = [
  {
    id: "tutor-profile-1",
    userId: "user-tutor-1",
    introVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    hourlyRate: 45,
    ratingAverage: 4.9,
    ratingCount: 36,
    headline: "Math and biology support for high school students",
    yearsExperience: 6,
    isApproved: true,
    user: mockTutorUsers[0],
    tutorSubjects: [
      {
        tutorProfileId: "tutor-profile-1",
        subjectId: "subject-math",
        subject: mockSubjects[0],
      },
      {
        tutorProfileId: "tutor-profile-1",
        subjectId: "subject-biology",
        subject: mockSubjects[1],
      },
    ],
    availability: [
      {
        id: "slot-1",
        tutorProfileId: "tutor-profile-1",
        startsAt: addDays(now, 1),
        endsAt: addHours(addDays(now, 1), 1),
      },
      {
        id: "slot-2",
        tutorProfileId: "tutor-profile-1",
        startsAt: addDays(now, 2),
        endsAt: addHours(addDays(now, 2), 1),
      },
    ],
  },
  {
    id: "tutor-profile-2",
    userId: "user-tutor-2",
    introVideoUrl: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
    hourlyRate: 55,
    ratingAverage: 4.8,
    ratingCount: 24,
    headline: "Physics and problem-solving sessions with exam strategy",
    yearsExperience: 8,
    isApproved: true,
    user: mockTutorUsers[1],
    tutorSubjects: [
      {
        tutorProfileId: "tutor-profile-2",
        subjectId: "subject-math",
        subject: mockSubjects[0],
      },
      {
        tutorProfileId: "tutor-profile-2",
        subjectId: "subject-physics",
        subject: mockSubjects[2],
      },
    ],
    availability: [
      {
        id: "slot-3",
        tutorProfileId: "tutor-profile-2",
        startsAt: addDays(now, 1),
        endsAt: addHours(addDays(now, 1), 2),
      },
    ],
  },
];

export const mockLessons = [
  {
    id: "lesson-1",
    tutorId: "user-tutor-1",
    subjectId: "subject-math",
    title: "Algebra Confidence Builder",
    description: "Build fluency with equations, variables, and exam-style algebra drills.",
    difficulty: LessonDifficulty.BEGINNER,
    isPublished: true,
    durationMinutes: 50,
    createdAt: now,
    subject: mockSubjects[0],
    tutor: {
      ...mockTutorUsers[0],
      tutorProfile: mockTutorProfiles[0],
    },
  },
  {
    id: "lesson-2",
    tutorId: "user-tutor-1",
    subjectId: "subject-biology",
    title: "Biology Memory Systems",
    description: "Learn cell biology and ecosystems with recall methods that actually stick.",
    difficulty: LessonDifficulty.INTERMEDIATE,
    isPublished: true,
    durationMinutes: 45,
    createdAt: addHours(now, -12),
    subject: mockSubjects[1],
    tutor: {
      ...mockTutorUsers[0],
      tutorProfile: mockTutorProfiles[0],
    },
  },
  {
    id: "lesson-3",
    tutorId: "user-tutor-2",
    subjectId: "subject-physics",
    title: "Mechanics Deep Dive",
    description: "Master forces, motion, and free-body diagrams through worked examples.",
    difficulty: LessonDifficulty.ADVANCED,
    isPublished: true,
    durationMinutes: 60,
    createdAt: addHours(now, -24),
    subject: mockSubjects[2],
    tutor: {
      ...mockTutorUsers[1],
      tutorProfile: mockTutorProfiles[1],
    },
  },
];

export const mockTutorReviews = [
  {
    id: "review-1",
    studentId: mockStudentUser.id,
    tutorId: mockTutorUsers[0].id,
    bookingId: "booking-1",
    rating: 5,
    comment: "Very clear explanations and great pacing.",
    createdAt: addDays(now, -3),
    student: mockStudentUser,
    booking: {
      id: "booking-1",
      studentId: mockStudentUser.id,
      tutorId: mockTutorUsers[0].id,
      lessonId: mockLessons[0].id,
      startTime: addDays(now, -5),
      endTime: addHours(addDays(now, -5), 1),
      status: BookingStatus.COMPLETED,
      meetingUrl: "https://meet.google.com/mock-review-1",
    },
  },
];

export const mockBookings = [
  {
    id: "booking-upcoming-1",
    studentId: mockStudentUser.id,
    tutorId: mockTutorUsers[0].id,
    lessonId: mockLessons[0].id,
    startTime: addDays(now, 1),
    endTime: addHours(addDays(now, 1), 1),
    status: BookingStatus.CONFIRMED,
    meetingUrl: "https://meet.google.com/mock-upcoming-1",
    lesson: {
      ...mockLessons[0],
    },
    tutor: {
      ...mockTutorUsers[0],
      tutorProfile: mockTutorProfiles[0],
    },
    student: mockStudentUser,
  },
  {
    id: "booking-upcoming-2",
    studentId: mockStudentUser.id,
    tutorId: mockTutorUsers[1].id,
    lessonId: mockLessons[2].id,
    startTime: addDays(now, 2),
    endTime: addHours(addDays(now, 2), 1),
    status: BookingStatus.PENDING,
    meetingUrl: "https://meet.google.com/mock-upcoming-2",
    lesson: {
      ...mockLessons[2],
    },
    tutor: {
      ...mockTutorUsers[1],
      tutorProfile: mockTutorProfiles[1],
    },
    student: mockStudentUser,
  },
];

export const mockProgressEvents = [
  {
    id: "progress-1",
    studentId: mockStudentUser.id,
    subjectId: mockSubjects[0].id,
    lessonId: mockLessons[0].id,
    type: ProgressEventType.QUIZ_FAILED,
    score: 52,
    createdAt: addDays(now, -1),
    lesson: {
      ...mockLessons[0],
    },
  },
  {
    id: "progress-2",
    studentId: mockStudentUser.id,
    subjectId: mockSubjects[0].id,
    lessonId: mockLessons[0].id,
    type: ProgressEventType.QUIZ_FAILED,
    score: 61,
    createdAt: addDays(now, -2),
    lesson: {
      ...mockLessons[0],
    },
  },
  {
    id: "progress-3",
    studentId: mockStudentUser.id,
    subjectId: mockSubjects[1].id,
    lessonId: mockLessons[1].id,
    type: ProgressEventType.QUIZ_PASSED,
    score: 81,
    createdAt: addDays(now, -3),
    lesson: {
      ...mockLessons[1],
    },
  },
];

export const mockSubscription = {
  id: "subscription-1",
  studentId: mockStudentUser.id,
  stripeCustomerId: "cus_mock_student",
  stripeSubscriptionId: "sub_mock_student",
  status: "active",
  currentPeriodEnd: addDays(now, 30),
};

export function getMockLandingData() {
  return {
    subjects: mockSubjects,
    tutors: mockTutorProfiles,
    lessons: mockLessons,
  };
}

export function getMockStudentDashboardData() {
  return {
    bookings: mockBookings,
    recentProgress: mockProgressEvents,
    subscription: mockSubscription,
  };
}

export function getMockTutorList(filters: { subject?: string; minPrice?: number; maxPrice?: number; minRating?: number }) {
  return mockTutorProfiles.filter((tutor) => {
    if (filters.subject && !tutor.tutorSubjects.some((item) => item.subject.slug === filters.subject)) {
      return false;
    }

    if (typeof filters.minPrice === "number" && tutor.hourlyRate < filters.minPrice) {
      return false;
    }

    if (typeof filters.maxPrice === "number" && tutor.hourlyRate > filters.maxPrice) {
      return false;
    }

    if (typeof filters.minRating === "number" && tutor.ratingAverage < filters.minRating) {
      return false;
    }

    return true;
  });
}

export function getMockTutorDetail(id: string) {
  const tutorProfile = mockTutorProfiles.find((profile) => profile.id === id);

  if (!tutorProfile) {
    return null;
  }

  return {
    ...tutorProfile,
    user: {
      ...tutorProfile.user,
      tutorLessons: mockLessons
        .filter((lesson) => lesson.tutorId === tutorProfile.userId)
        .map((lesson) => ({ ...lesson })),
      tutorReviews: mockTutorReviews
        .filter((review) => review.tutorId === tutorProfile.userId)
        .map((review) => ({ ...review })),
    },
  };
}

export function getMockPublishedLessons() {
  return mockLessons;
}

export function getMockTutorDashboardData(tutorId: string) {
  const profile = mockTutorProfiles.find((item) => item.userId === tutorId) ?? mockTutorProfiles[0];
  const bookings = mockBookings.filter((booking) => booking.tutorId === tutorId);
  const lessonCount = mockLessons.filter((lesson) => lesson.tutorId === tutorId).length;

  return {
    bookings,
    lessonCount,
    ratingAverage: profile.ratingAverage,
    ratingCount: profile.ratingCount,
  };
}

export function getMockTutorLessonData(tutorId: string) {
  return {
    subjects: mockSubjects,
    lessons: mockLessons.filter((lesson) => lesson.tutorId === tutorId),
  };
}

export function getMockTutorAvailabilityData(tutorId: string) {
  return mockTutorProfiles.find((item) => item.userId === tutorId)?.availability ?? [];
}

export function getMockAdminDashboardData(role?: UserRole) {
  const users = [
    mockStudentUser,
    { ...mockTutorUsers[0], tutorProfile: mockTutorProfiles[0], studentProfile: null },
    { ...mockTutorUsers[1], tutorProfile: mockTutorProfiles[1], studentProfile: null },
    mockAdminUser,
  ].filter((user) => (role ? user.role === role : true));

  return {
    users,
    tutorProfiles: mockTutorProfiles,
    metrics: {
      users: users.length,
      bookings: mockBookings.length,
      revenue: 99,
    },
  };
}

export function getMockRecommendations() {
  return {
    lessons: mockLessons.slice(0, 3),
    tutors: mockTutorProfiles.slice(0, 2),
  };
}

export function getMockUserForRole(role: UserRole) {
  if (role === UserRole.ADMIN) {
    return mockAdminUser;
  }

  if (role === UserRole.TUTOR) {
    return {
      ...mockTutorUsers[0],
      tutorProfile: mockTutorProfiles[0],
      studentProfile: null,
    };
  }

  return mockStudentUser;
}
