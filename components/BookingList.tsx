import type { Booking, Lesson, Subject, TutorProfile, User } from "@prisma/client";
import { formatDateTime } from "@/lib/utils";

type BookingListProps = {
  bookings: Array<
    Booking & {
      lesson: (Lesson & { subject: Subject }) | null;
      tutor: User & { tutorProfile: TutorProfile | null };
    }
  >;
  emptyMessage: string;
};

export function BookingList({ bookings, emptyMessage }: BookingListProps) {
  if (!bookings.length) {
    return (
      <div className="surface-card rounded-[1.75rem] border-dashed p-6 text-sm text-zinc-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="surface-card rounded-[1.75rem] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                {booking.lesson?.title ?? "Custom tutoring session"} with {booking.tutor.name}
              </p>
              <p className="text-sm text-zinc-400">{formatDateTime(booking.startTime)}</p>
            </div>
            <div className="text-sm text-zinc-300">
              <p className="mb-1 capitalize text-red-200">{booking.status.toLowerCase()}</p>
              <a href={booking.meetingUrl} className="text-[var(--color-accent-soft)] underline-offset-4 hover:underline">
                Meeting link
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
