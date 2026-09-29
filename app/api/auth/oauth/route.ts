import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  let body: { provider?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { provider } = body

  if (!provider) {
    return NextResponse.json({ error: "Provider is required" }, { status: 400 })
  }

  const redirectUrl = new URL("/auth/callback", req.url).toString()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as "github",
    options: {
      redirectTo: redirectUrl,
    },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ url: data.url })
}
