import { NextResponse } from "next/server";
import { getTutorDetail } from "@/lib/data";

export async function GET(_: Request, context: RouteContext<"/api/tutors/[id]">) {
  const { id } = await context.params;
  const tutor = await getTutorDetail(id);

  if (!tutor) {
    return NextResponse.json({ error: "Tutor not found." }, { status: 404 });
  }

  return NextResponse.json(tutor);
}
