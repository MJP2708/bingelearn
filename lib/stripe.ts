import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  stripeClient ??= new Stripe(process.env.STRIPE_SECRET_KEY);
  return stripeClient;
}
