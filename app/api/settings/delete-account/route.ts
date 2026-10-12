import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function DELETE() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Delete all user data from tables
  const tables = [
    "renewal_alerts",
    "email_preferences",
    "team_members",
    "team_invites",
    "teams",
    "stripe_invoices",
    "stripe_subscriptions",
    "stripe_customers",
    "subscriptions",
    "profiles",
  ]

  const errors: string[] = []

  for (const table of tables) {
    const { error } = await supabase.from(table).delete().eq("user_id", user.id)
    if (error) {
      // Some tables may not have user_id column, skip those
      if (!error.message.includes("column")) {
        errors.push(`Failed to delete from ${table}: ${error.message}`)
      }
    }
  }

  // Delete the auth user
  const { error: deleteUserError } = await supabase.auth.admin.deleteUser(user.id)
  if (deleteUserError) {
    errors.push(`Failed to delete auth user: ${deleteUserError.message}`)
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Some data could not be deleted", details: errors },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
