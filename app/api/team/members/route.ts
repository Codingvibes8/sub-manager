import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function PATCH(req: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { memberId?: string; role?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { memberId, role } = body

  if (!memberId) {
    return NextResponse.json({ error: "Member ID is required" }, { status: 400 })
  }

  if (!role || !["admin", "member", "viewer"].includes(role)) {
    return NextResponse.json({ error: "Valid role is required" }, { status: 400 })
  }

  const { data: member } = await supabase
    .from("team_members")
    .select("*, teams(owner_id)")
    .eq("id", memberId)
    .single()

  if (!member) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 })
  }

  if (member.teams.owner_id !== user.id) {
    return NextResponse.json({ error: "Only team owners can change roles" }, { status: 403 })
  }

  if (member.user_id === user.id && role !== "admin") {
    return NextResponse.json({ error: "Cannot change your own admin role" }, { status: 400 })
  }

  const { error } = await supabase
    .from("team_members")
    .update({ role })
    .eq("id", memberId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const memberId = searchParams.get("memberId")

  if (!memberId) {
    return NextResponse.json({ error: "Member ID is required" }, { status: 400 })
  }

  const { data: member } = await supabase
    .from("team_members")
    .select("*, teams(owner_id)")
    .eq("id", memberId)
    .single()

  if (!member) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 })
  }

  if (member.teams.owner_id !== user.id) {
    return NextResponse.json({ error: "Only team owners can remove members" }, { status: 403 })
  }

  if (member.user_id === user.id) {
    return NextResponse.json({ error: "Cannot remove yourself from the team" }, { status: 400 })
  }

  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", memberId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
