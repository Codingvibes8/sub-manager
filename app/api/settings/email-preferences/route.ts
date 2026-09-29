import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function PATCH(req: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: {
    product_updates?: boolean
    renewal_reminders?: boolean
    promotional_emails?: boolean
    weekly_digest?: boolean
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { product_updates, renewal_reminders, promotional_emails, weekly_digest } = body

  if (
    product_updates === undefined &&
    renewal_reminders === undefined &&
    promotional_emails === undefined &&
    weekly_digest === undefined
  ) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 })
  }

  const updates: Record<string, boolean> = {}
  if (product_updates !== undefined) updates.product_updates = product_updates
  if (renewal_reminders !== undefined) updates.renewal_reminders = renewal_reminders
  if (promotional_emails !== undefined) updates.promotional_emails = promotional_emails
  if (weekly_digest !== undefined) updates.weekly_digest = weekly_digest

  const { error } = await supabase
    .from("email_preferences")
    .upsert({ id: user.id, ...updates, updated_at: new Date().toISOString() })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
