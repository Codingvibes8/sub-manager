import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { stripe } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: customerData } = await supabase
      .from("stripe_customers")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single()

    if (!customerData) {
      return NextResponse.json(
        { error: "No billing account found" },
        { status: 404 }
      )
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerData.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?tab=billing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: unknown) {
    console.error("Portal error:", error)
    const message =
      error instanceof Error ? error.message : "Failed to create portal session"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
