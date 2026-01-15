"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Entertainment", value: 400 },
  { name: "Development Tools", value: 300 },
  { name: "AI Services", value: 300 },
  { name: "Music", value: 200 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Spending Trends</CardTitle>
            <CardDescription>
              Your spending behavior over the last 12 months.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <OverviewChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>
              Where your money goes by category.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
