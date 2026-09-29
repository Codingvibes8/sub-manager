import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { email?: string; role?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { email, role = "member" } = body

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  if (!["admin", "member", "viewer"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 })
  }

  const { data: team } = await supabase
    .from("teams")
    .select("*")
    .eq("owner_id", user.id)
    .single()

  if (!team) {
    return NextResponse.json({ error: "No team found" }, { status: 404 })
  }

  if (team.plan === "free") {
    return NextResponse.json({ error: "Upgrade to Team plan to invite members" }, { status: 403 })
  }

  const { data: existingMember } = await supabase
    .from("team_members")
    .select("id")
    .eq("team_id", team.id)
    .eq("user_id", user.id)
    .single()

  if (!existingMember) {
    return NextResponse.json({ error: "Not a team member" }, { status: 403 })
  }

  const { data: existingInvite } = await supabase
    .from("team_invites")
    .select("id")
    .eq("team_id", team.id)
    .eq("email", email)
    .single()

  if (existingInvite) {
    return NextResponse.json({ error: "Invite already sent to this email" }, { status: 409 })
  }

  const { data: invite, error } = await supabase
    .from("team_invites")
    .insert({
      team_id: team.id,
      email,
      role,
      invited_by: user.id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ invite })
}
