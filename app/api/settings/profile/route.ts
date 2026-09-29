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

  let body: { username?: string; full_name?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { username, full_name } = body

  if (!username && !full_name) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 })
  }

  const updates: Record<string, string> = {}
  if (username !== undefined) updates.username = username
  if (full_name !== undefined) updates.full_name = full_name

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, ...updates, updated_at: new Date().toISOString() })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
