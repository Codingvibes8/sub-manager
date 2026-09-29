import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { current_password?: string; new_password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { current_password, new_password } = body

  if (!current_password || !new_password) {
    return NextResponse.json(
      { error: "Current password and new password are required" },
      { status: 400 }
    )
  }

  if (new_password.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters" },
      { status: 400 }
    )
  }

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: current_password,
  })

  if (verifyError) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 401 }
    )
  }

  const { error } = await supabase.auth.updateUser({ password: new_password })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
