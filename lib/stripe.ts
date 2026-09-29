import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-08-26.dahlia",
  typescript: true,
})

export const STRIPE_PLANS = {
  free: {
    name: "Free",
    price: 0,
    stripePriceId: null as string | null,
  },
  team: {
    name: "Team",
    price: 1200,
    stripePriceId: process.env.STRIPE_TEAM_PRICE_ID || null,
  },
} as const

export type PlanId = keyof typeof STRIPE_PLANS

export function getStripeCustomerId(
  userMetadata: Record<string, unknown> | undefined
): string | undefined {
  return userMetadata?.stripe_customer_id as string | undefined
}

export function isTrialActive(trialEnd: string | null | undefined): boolean {
  if (!trialEnd) return false
  return new Date(trialEnd) > new Date()
}

export function isSubscriptionActive(status: string | null | undefined): boolean {
  return status === "active" || status === "trialing"
}

export function formatStripeAmount(amount: number | null | undefined): string {
  if (!amount) return "$0.00"
  return `$${(amount / 100).toFixed(2)}`
}
