"use client"

import { useMemo } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSubscriptions } from "@/components/subscriptions-provider"
import { parseISO } from "date-fns"

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)
}

export function OverviewChart({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { subscriptions, isLoading } = useSubscriptions()

  const monthlyData = useMemo(() => {
    // Aggregate subscriptions by month across a rolling 12-month window.
    // For demo purposes we spread current subscriptions across the year;
    // in a real app this would come from historical billing data.
    const now = new Date()
    const months: { name: string; total: number }[] = []

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push({
        name: d.toLocaleString("en-US", { month: "short" }),
        total: 0,
      })
    }

    // Distribute each subscription across all months (recurring billing assumption).
    // A real implementation would track actual bill dates.
    const perMonth = subscriptions.length > 0
      ? subscriptions.reduce((sum, s) => sum + s.price, 0) / 12
      : 0

    return months.map((m) => ({ ...m, total: Math.round(perMonth * 100) / 100 }))
  }, [subscriptions])

  const totalSpent = useMemo(
    () => subscriptions.reduce((sum, s) => sum + s.price, 0),
    [subscriptions]
  )

  if (isLoading) {
    return (
      <Card className={`glass-panel border-emerald-500/20 ${className}`} {...props}>
        <CardHeader>
          <CardTitle className="text-emerald-700 dark:text-emerald-300">Overview</CardTitle>
          <CardDescription>Loading spending data...</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[350px] flex items-center justify-center">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-32 w-8 animate-pulse bg-muted rounded-t-md" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (subscriptions.length === 0) {
    return (
      <Card className={`glass-panel border-emerald-500/20 ${className}`} {...props}>
        <CardHeader>
          <CardTitle className="text-emerald-700 dark:text-emerald-300">Overview</CardTitle>
          <CardDescription>
            Add subscriptions to see your spending trend.
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2 flex items-center justify-center h-[350px]">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">No data yet</p>
            <p className="text-xs mt-1">Your monthly chart will appear here once you add subscriptions.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`glass-panel border-emerald-500/20 ${className}`} {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-emerald-700 dark:text-emerald-300">Monthly Spend</CardTitle>
            <CardDescription>
              Estimated monthly recurring cost across all tracked subscriptions.
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
              {fmt(totalSpent)}
            </div>
            <div className="text-xs text-muted-foreground">per month</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="emeraldGradientOverview" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="100%" stopColor="#0d9488" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: "8px",
                color: "#e2e8f0",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Monthly spend"]}
            />
            <Bar
              dataKey="total"
              fill="url(#emeraldGradientOverview)"
              radius={[4, 4, 0, 0]}
              className="transition-all duration-300 hover:opacity-80"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
