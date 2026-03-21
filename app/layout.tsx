import type { Metadata } from "next";
import { AuthProvider } from "@/components/AuthProvider";
import { NavbarNetflixLike } from "@/components/NavbarNetflixLike";
import "./globals.css";

export const metadata: Metadata = {
  title: "BingeLearn",
  description: "Netflix-style tutoring with role-based dashboards, lessons, bookings, and subscriptions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[var(--color-background)] text-white">
        <AuthProvider>
          <NavbarNetflixLike />
          <div className="mx-auto flex min-h-screen max-w-[96rem] flex-col px-4 pt-24 sm:px-6 md:pt-28 lg:px-8">
            <main className="flex-1 py-8">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
