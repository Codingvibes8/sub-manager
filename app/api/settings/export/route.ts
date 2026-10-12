import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { generateCsv } from "@/lib/export"

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .order("name", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const csv = generateCsv(
    (subscriptions || []).map((s) => ({
      id: s.id,
      name: s.name,
      price: s.price,
      status: s.status,
      category: s.category,
      renewalDate: s.renewal_date,
      createdAt: s.created_at,
      updatedAt: s.updated_at,
    }))
  )

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv;charset=utf-8;",
      "Content-Disposition": `attachment; filename="submanager-export-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  })
}
