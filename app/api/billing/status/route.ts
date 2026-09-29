import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: subscription } = await supabase
      .from("stripe_subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    const { data: customer } = await supabase
      .from("stripe_customers")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single()

    return NextResponse.json({
      subscription: subscription || null,
      hasCustomer: !!customer,
    })
  } catch (error: unknown) {
    console.error("Billing status error:", error)
    const message =
      error instanceof Error ? error.message : "Failed to fetch billing status"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
