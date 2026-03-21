import Stripe from "stripe";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  if (isMockMode()) {
    return Response.json({ received: true, mode: "mock" });
  }

  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !secret) {
    return Response.json({ received: true, mode: "mock" });
  }

  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch {
    return Response.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    const studentId = subscription.metadata.studentId;

    if (studentId && subscription.customer) {
      await prisma.subscription.upsert({
        where: {
          stripeCustomerId: subscription.customer.toString(),
        },
        update: {
          stripeSubscriptionId: subscription.id,
          status: subscription.status,
          currentPeriodEnd: subscription.items.data[0]?.current_period_end
            ? new Date(subscription.items.data[0].current_period_end * 1000)
            : null,
        },
        create: {
          studentId,
          stripeCustomerId: subscription.customer.toString(),
          stripeSubscriptionId: subscription.id,
          status: subscription.status,
          currentPeriodEnd: subscription.items.data[0]?.current_period_end
            ? new Date(subscription.items.data[0].current_period_end * 1000)
            : null,
        },
      });
    }
  }

  return Response.json({ received: true });
}
