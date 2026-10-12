import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  try {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    const { error } = await supabase.from("waitlist").insert({
      email,
      plan: "enterprise",
      created_at: new Date().toISOString(),
    })

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ message: "You're already on the waitlist" })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Added to waitlist" })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
