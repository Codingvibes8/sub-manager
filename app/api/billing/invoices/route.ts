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

    const { data: invoices, error } = await supabase
      .from("stripe_invoices")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ invoices: invoices || [] })
  } catch (error: unknown) {
    console.error("Invoices error:", error)
    const message =
      error instanceof Error ? error.message : "Failed to fetch invoices"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
