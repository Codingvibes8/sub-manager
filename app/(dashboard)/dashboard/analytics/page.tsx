"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { useSubscriptions } from "@/components/subscriptions-provider"

const COLORS = [
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1",
]

export default function AnalyticsPage() {
  const { subscriptions, isLoading } = useSubscriptions()

  const categoryData = useMemo(() => {
    const map = new Map<string, number>()
    for (const sub of subscriptions) {
      const cat = sub.category || "Uncategorized"
      map.set(cat, (map.get(cat) ?? 0) + sub.price)
    }
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
      .sort((a, b) => b.value - a.value)
  }, [subscriptions])

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
              <CardDescription>Loading...</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center">
                <div className="h-32 w-full animate-pulse bg-muted rounded" />
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
              <CardDescription>Loading...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="h-32 w-full animate-pulse bg-muted rounded" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (subscriptions.length === 0) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        </div>
        <div>
          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardHeader className="text-center">
              <CardTitle className="text-emerald-700 dark:text-emerald-300">No analytics yet</CardTitle>
              <CardDescription>
                Add your first subscription to see spending trends and category breakdowns.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <a href="/dashboard/subscriptions">
                <Button asChild>
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    Add a subscription
                  </span>
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const total = categoryData.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="text-right text-sm text-muted-foreground">
          Total tracked:{" "}
          <span className="font-medium text-foreground">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(total)}
            /month
          </span>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-emerald-500/20">
          <CardHeader>
            <CardTitle>Spending Trends</CardTitle>
            <CardDescription>
              Your estimated monthly recurring spend over the last 12 months.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>
        <Card className="col-span-3 border-emerald-500/20">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>
              Where your money goes by category.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {categoryData.length === 0 ? (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
                No categories yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    labelLine={false}
                  >
                    {categoryData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) =>
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(value)
                    }
                    contentStyle={{
                      backgroundColor: "rgba(15,23,42,0.9)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      borderRadius: "8px",
                      color: "#e2e8f0",
                      fontSize: "13px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
