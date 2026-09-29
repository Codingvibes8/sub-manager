import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { token?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { token } = body
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 })
  }

  const { data: invite, error: inviteError } = await supabase
    .from("team_invites")
    .select("*, teams(name)")
    .eq("token", token)
    .single()

  if (inviteError || !invite) {
    return NextResponse.json({ error: "Invalid or expired invite" }, { status: 404 })
  }

  if (new Date(invite.expires_at) < new Date()) {
    return NextResponse.json({ error: "Invite has expired" }, { status: 410 })
  }

  if (user.email !== invite.email) {
    return NextResponse.json({ error: "This invite was sent to a different email" }, { status: 403 })
  }

  const { data: existingMember } = await supabase
    .from("team_members")
    .select("id")
    .eq("team_id", invite.team_id)
    .eq("user_id", user.id)
    .single()

  if (existingMember) {
    await supabase.from("team_invites").delete().eq("id", invite.id)
    return NextResponse.json({ ok: true, message: "Already a member" })
  }

  const { error: memberError } = await supabase
    .from("team_members")
    .insert({
      team_id: invite.team_id,
      user_id: user.id,
      role: invite.role,
    })

  if (memberError) {
    return NextResponse.json({ error: memberError.message }, { status: 500 })
  }

  await supabase.from("team_invites").delete().eq("id", invite.id)

  return NextResponse.json({ ok: true, teamName: invite.teams.name })
}
