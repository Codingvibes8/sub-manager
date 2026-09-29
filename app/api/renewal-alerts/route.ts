import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { addDays, format, parseISO, differenceInDays } from "date-fns"

export async function GET(req: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const today = format(new Date(), "yyyy-MM-dd")
  const sevenDaysFromNow = format(addDays(new Date(), 7), "yyyy-MM-dd")

  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .gte("renewal_date", today)
    .lte("renewal_date", sevenDaysFromNow)
    .order("renewal_date", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const alerts = (subscriptions || []).map((sub) => {
    const renewalDate = parseISO(sub.renewal_date)
    const todayDate = parseISO(today)
    const daysUntil = differenceInDays(renewalDate, todayDate)

    let urgency: "info" | "warning" | "critical" = "info"
    if (daysUntil <= 1) urgency = "critical"
    else if (daysUntil <= 3) urgency = "warning"

    return {
      id: sub.id,
      name: sub.name,
      price: sub.price,
      category: sub.category,
      renewalDate: sub.renewal_date,
      daysUntil,
      urgency,
    }
  })

  return NextResponse.json({ alerts })
}
