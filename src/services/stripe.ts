
import { loadStripe, Stripe as StripeType } from "@stripe/stripe-js";

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  messageLimit: number;
  features: string[];
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Alap",
    price: 4990,
    messageLimit: 1000,
    features: [
      "1000 chatbot üzenet havonta",
      "Alapvető chatbot funkciók",
      "Email támogatás",
      "Havi statisztikák"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    price: 19990,
    messageLimit: 5000,
    features: [
      "5000 chatbot üzenet havonta",
      "Fejlett chatbot funkciók",
      "Prioritásos támogatás",
      "Részletes analitika",
      "Egyedi chatbot testreszabás"
    ]
  }
];

let stripeInstance: Promise<StripeType | null>;

export const getStripe = (): Promise<StripeType | null> => {
  if (!stripeInstance) {
    stripeInstance = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripeInstance;
};
