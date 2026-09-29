import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("Webhook signature verification failed:", message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionChange(subscription)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case "invoice.paid":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoice(invoice)
        break
      }

      case "customer.created":
      case "customer.updated": {
        const customer = event.data.object as Stripe.Customer
        await handleCustomerChange(customer)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: unknown) {
    console.error("Webhook handler error:", error)
    const message =
      error instanceof Error ? error.message : "Webhook handler failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = await createClient()
  const userId = session.metadata?.user_id

  if (!userId) return

  if (session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await upsertSubscription(supabase, userId, subscription)
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const supabase = await createClient()
  const userId = subscription.metadata?.user_id

  if (!userId) {
    const customer = await stripe.customers.retrieve(
      subscription.customer as string
    )
    if (!customer.deleted) {
      const uid = customer.metadata?.user_id
      if (uid) {
        await upsertSubscription(supabase, uid, subscription)
      }
    }
    return
  }

  await upsertSubscription(supabase, userId, subscription)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const supabase = await createClient()
  const userId = subscription.metadata?.user_id

  if (!userId) return

  await supabase
    .from("stripe_subscriptions")
    .update({
      status: "canceled",
      cancel_at_period_end: false,
      canceled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id)

  await supabase
    .from("teams")
    .update({ plan: "free" })
    .eq("owner_id", userId)
}

async function handleInvoice(invoice: Stripe.Invoice) {
  const supabase = await createClient()
  const subscriptionId = (invoice as Stripe.Invoice & { subscription?: string | Stripe.Subscription | null }).subscription
  const subId =
    typeof subscriptionId === "string"
      ? subscriptionId
      : (subscriptionId?.id ?? null)

  if (!subId) return

  const { data: subData } = await supabase
    .from("stripe_subscriptions")
    .select("user_id")
    .eq("stripe_subscription_id", subId)
    .single()

  if (!subData) return

  const userId = subData.user_id

  await supabase.from("stripe_invoices").upsert(
    {
      user_id: userId,
      stripe_invoice_id: invoice.id,
      stripe_subscription_id: subId,
      amount_due: invoice.amount_due,
      amount_paid: invoice.amount_paid,
      currency: invoice.currency || "usd",
      status: invoice.status,
      invoice_pdf: invoice.invoice_pdf,
      hosted_invoice_url: invoice.hosted_invoice_url,
      period_start: invoice.period_start
        ? new Date(invoice.period_start * 1000).toISOString()
        : null,
      period_end: invoice.period_end
        ? new Date(invoice.period_end * 1000).toISOString()
        : null,
    },
    { onConflict: "stripe_invoice_id" }
  )
}

async function handleCustomerChange(customer: Stripe.Customer) {
  const supabase = await createClient()
  const userId = customer.metadata?.user_id

  if (!userId) return

  await supabase
    .from("stripe_customers")
    .update({ updated_at: new Date().toISOString() })
    .eq("user_id", userId)
}

async function upsertSubscription(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  subscription: Stripe.Subscription
) {
  const priceId = subscription.items.data[0]?.price.id
  const isTeamPlan = priceId === process.env.STRIPE_TEAM_PRICE_ID

  await supabase.from("stripe_subscriptions").upsert(
    {
      user_id: userId,
      stripe_subscription_id: subscription.id,
      stripe_product_id: subscription.items.data[0]?.price.product as string,
      stripe_price_id: priceId,
      status: subscription.status,
      plan: isTeamPlan ? "team" : "free",
      current_period_start: (subscription as unknown as Record<string, unknown>).current_period_start
        ? new Date(((subscription as unknown as Record<string, unknown>).current_period_start as number) * 1000).toISOString()
        : null,
      current_period_end: (subscription as unknown as Record<string, unknown>).current_period_end
        ? new Date(((subscription as unknown as Record<string, unknown>).current_period_end as number) * 1000).toISOString()
        : null,
      cancel_at_period_end: subscription.cancel_at_period_end,
      canceled_at: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000).toISOString()
        : null,
      trial_start: subscription.trial_start
        ? new Date(subscription.trial_start * 1000).toISOString()
        : null,
      trial_end: subscription.trial_end
        ? new Date(subscription.trial_end * 1000).toISOString()
        : null,
    },
    { onConflict: "stripe_subscription_id" }
  )

  if (isTeamPlan && (subscription.status === "active" || subscription.status === "trialing")) {
    await supabase
      .from("teams")
      .update({ plan: "team" })
      .eq("owner_id", userId)
  }
}
