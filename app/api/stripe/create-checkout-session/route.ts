import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { requireStudent } from "@/lib/rbac";

export async function POST() {
  const student = await requireStudent();
  const stripe = getStripe();

  if (!stripe || !process.env.STRIPE_PRICE_ID) {
    return NextResponse.json({
      url: `/dashboard?billing=mock&student=${student.id}`,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: student.email,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/dashboard?billing=success`,
    cancel_url: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/dashboard?billing=cancelled`,
    metadata: {
      studentId: student.id,
    },
  });

  return NextResponse.json({ url: session.url });
}
