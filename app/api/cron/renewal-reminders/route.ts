import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { addDays, format, parseISO, differenceInDays } from "date-fns"

const CRON_SECRET = process.env.CRON_SECRET || ""

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = await createClient()

  const today = format(new Date(), "yyyy-MM-dd")
  const sevenDaysFromNow = format(addDays(new Date(), 7), "yyyy-MM-dd")

  const { data: subs, error } = await supabase
    .from("subscriptions")
    .select("*, email_preferences(*)")
    .eq("status", "active")
    .gte("renewal_date", today)
    .lte("renewal_date", sevenDaysFromNow)
    .order("renewal_date", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const results = {
    total: subs?.length || 0,
    emailsSent: 0,
    skipped: 0,
    errors: [] as string[],
  }

  for (const sub of subs || []) {
    const prefs = sub.email_preferences?.[0]
    if (prefs && !prefs.renewal_reminders) {
      results.skipped++
      continue
    }

    const renewalDate = parseISO(sub.renewal_date)
    const todayDate = parseISO(today)
    const daysUntil = differenceInDays(renewalDate, todayDate)

    const { data: existingAlert } = await supabase
      .from("renewal_alerts")
      .select("id")
      .eq("subscription_id", sub.id)
      .eq("alert_date", today)
      .single()

    if (existingAlert) {
      results.skipped++
      continue
    }

    const { error: insertError } = await supabase.from("renewal_alerts").insert({
      user_id: sub.user_id,
      subscription_id: sub.id,
      alert_type: daysUntil <= 1 ? "critical" : daysUntil <= 3 ? "warning" : "info",
      days_until: daysUntil,
      alert_date: today,
      sent: true,
    })

    if (insertError) {
      results.errors.push(`Failed to create alert for ${sub.name}: ${insertError.message}`)
    } else {
      results.emailsSent++
    }
  }

  return NextResponse.json(results)
}
