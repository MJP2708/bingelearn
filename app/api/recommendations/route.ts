import { NextResponse } from "next/server";
import { getRecommendationsForStudent } from "@/lib/recommendations";
import { requireStudent } from "@/lib/rbac";

export async function GET() {
  const student = await requireStudent();
  const recommendations = await getRecommendationsForStudent(student.id);
  return NextResponse.json(recommendations);
}
