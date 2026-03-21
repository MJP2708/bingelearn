import { NextResponse } from "next/server";
import { getTutorList } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tutors = await getTutorList({
    subject: searchParams.get("subject") ?? undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined,
  });

  return NextResponse.json(tutors);
}
