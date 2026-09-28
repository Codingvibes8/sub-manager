"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 500) + 100,
  },
]

interface OverviewChartProps extends React.HTMLAttributes<HTMLDivElement> {}

export function OverviewChart({ className, ...props }: OverviewChartProps) {
  return (
    <Card className={`glass-panel border-emerald-500/20 ${className}`} {...props}>
      <CardHeader>
        <CardTitle className="text-emerald-700 dark:text-emerald-300">Overview</CardTitle>
        <CardDescription>
          Monthly subscription spending for the current year.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <defs>
              <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="100%" stopColor="#0d9488" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar
              dataKey="total"
              fill="url(#emeraldGradient)"
              radius={[4, 4, 0, 0]}
              className="transition-all duration-300 hover:opacity-80"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
