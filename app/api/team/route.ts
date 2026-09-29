import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: team, error } = await supabase
    .from("teams")
    .select("*")
    .eq("owner_id", user.id)
    .single()

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!team) {
    const { data: newTeam, error: createError } = await supabase
      .from("teams")
      .insert({ name: "My Team", owner_id: user.id, plan: "free" })
      .select()
      .single()

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 500 })
    }

    await supabase
      .from("team_members")
      .insert({ team_id: newTeam.id, user_id: user.id, role: "admin" })

    return NextResponse.json({ team: newTeam, members: [], invites: [] })
  }

  const { data: members } = await supabase
    .from("team_members")
    .select("*, profiles(full_name, avatar_url, username)")
    .eq("team_id", team.id)

  const { data: invites } = await supabase
    .from("team_invites")
    .select("*")
    .eq("team_id", team.id)
    .order("created_at", { ascending: false })

  return NextResponse.json({ team, members: members || [], invites: invites || [] })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { name?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { name } = body
  if (!name) {
    return NextResponse.json({ error: "Team name is required" }, { status: 400 })
  }

  const { data: existingTeam } = await supabase
    .from("teams")
    .select("id")
    .eq("owner_id", user.id)
    .single()

  if (existingTeam) {
    const { error } = await supabase
      .from("teams")
      .update({ name })
      .eq("id", existingTeam.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  }

  const { data: newTeam, error } = await supabase
    .from("teams")
    .insert({ name, owner_id: user.id, plan: "free" })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  await supabase
    .from("team_members")
    .insert({ team_id: newTeam.id, user_id: user.id, role: "admin" })

  return NextResponse.json({ team: newTeam })
}
