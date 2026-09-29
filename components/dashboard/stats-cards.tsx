"use client"

import { useSubscriptions } from "@/components/subscriptions-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, Activity, Users } from "lucide-react"
import { format, parseISO, addDays } from "date-fns"

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)
}

export function StatsCards() {
  const { subscriptions, isLoading } = useSubscriptions()

  const totalMonthly = subscriptions.reduce((sum, s) => sum + s.price, 0)
  const activeCount = subscriptions.filter((s) => s.status === "active").length
  const renewingSoon = subscriptions.filter((s) => {
    if (!s.renewalDate) return false
    const next = parseISO(s.renewalDate)
    const weekFromNow = addDays(new Date(), 7)
    return next <= weekFromNow && next >= new Date()
  }).length

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="glass-panel border-emerald-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Loading...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-6 w-20 animate-pulse bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-panel border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Total Monthly Cost
          </CardTitle>
          <DollarSign className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {subscriptions.length === 0 ? "$0.00" : fmt(totalMonthly)}
          </div>
          <p className="text-xs text-muted-foreground">
            {subscriptions.length === 0
              ? "Add your first subscription"
              : `${subscriptions.length} subscription${subscriptions.length !== 1 ? "s" : ""} tracked`}
          </p>
        </CardContent>
      </Card>

      <Card className="glass-panel border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Active Subscriptions
          </CardTitle>
          <CreditCard className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCount}</div>
          <p className="text-xs text-muted-foreground">
            {subscriptions.length === 0
              ? "No subscriptions yet"
              : `${subscriptions.filter((s) => s.status !== "active").length} not active`}
          </p>
        </CardContent>
      </Card>

      <Card className="glass-panel border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Renewal Risk
          </CardTitle>
          <Activity className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{renewingSoon}</div>
          <p className="text-xs text-muted-foreground">
            {renewingSoon === 0
              ? "Nothing renewing this week"
              : `Renewing in next 7 days`}
          </p>
        </CardContent>
      </Card>

      <Card className="glass-panel border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Team Members
          </CardTitle>
          <Users className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {subscriptions.length === 0 ? "—" : "1"}
          </div>
          <p className="text-xs text-muted-foreground">
            {subscriptions.length === 0
              ? "Sign up to get started"
              : "You (workspace admin)"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
