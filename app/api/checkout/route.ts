import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { stripe, STRIPE_PLANS } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { plan } = await req.json()

    if (plan !== "team") {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const teamPlan = STRIPE_PLANS.team
    if (!teamPlan.stripePriceId) {
      return NextResponse.json(
        { error: "Stripe price not configured" },
        { status: 500 }
      )
    }

    const { data: customerData } = await supabase
      .from("stripe_customers")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single()

    let stripeCustomerId = customerData?.stripe_customer_id

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: {
          user_id: user.id,
        },
      })

      stripeCustomerId = customer.id

      await supabase.from("stripe_customers").insert({
        user_id: user.id,
        stripe_customer_id: stripeCustomerId,
      })
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: teamPlan.stripePriceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          user_id: user.id,
          plan: "team",
        },
      },
      metadata: {
        user_id: user.id,
        plan: "team",
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?tab=billing&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: unknown) {
    console.error("Checkout error:", error)
    const message =
      error instanceof Error ? error.message : "Failed to create checkout session"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
