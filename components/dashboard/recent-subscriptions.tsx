"use client"

import { useSubscriptions } from "@/components/subscriptions-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, AlertCircle, ChevronRight } from "lucide-react"
import { format, parseISO, isWithinInterval, addDays, startOfDay } from "date-fns"
import { Button } from "@/components/ui/button"

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)
}

export function RecentSubscriptions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { subscriptions, isLoading } = useSubscriptions()

  const renewingThisWeek = subscriptions
    .filter((s) => {
      if (!s.renewalDate) return false
      const next = parseISO(s.renewalDate)
      const now = startOfDay(new Date())
      const weekEnd = addDays(now, 7)
      return isWithinInterval(next, { start: now, end: weekEnd }) && s.status === "active"
    })
    .sort((a, b) => parseISO(a.renewalDate).getTime() - parseISO(b.renewalDate).getTime())

  const recentItems = subscriptions
    .filter((s) => s.status === "active")
    .sort((a, b) => {
      if (!a.renewalDate) return 1
      if (!b.renewalDate) return -1
      return parseISO(b.renewalDate).getTime() - parseISO(a.renewalDate).getTime()
    })
    .slice(0, 5)

  if (isLoading) {
    return (
      <Card className={`glass-panel border-emerald-500/20 ${className}`} {...props}>
        <CardHeader>
          <CardTitle className="text-emerald-700 dark:text-emerald-300">Recent Renewals</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="animate-pulse">??</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <div className="h-4 w-24 animate-pulse bg-muted rounded" />
                  <div className="h-3 w-16 animate-pulse bg-muted/60 rounded" />
                </div>
                <div className="ml-auto h-4 w-12 animate-pulse bg-muted rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (subscriptions.length === 0) {
    return (
      <Card className={`glass-panel border-emerald-500/20 ${className}`} {...props}>
        <CardHeader>
          <CardTitle className="text-emerald-700 dark:text-emerald-300">Recent Renewals</CardTitle>
          <CardDescription>
            You haven't added any subscriptions yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-3 py-6 text-center text-muted-foreground">
            <Calendar className="h-8 w-8 text-emerald-400" />
            <p className="text-sm">Your renewal timeline will appear here.</p>
            <Button variant="link" className="h-auto p-0 text-emerald-600 dark:text-emerald-400 text-sm" asChild>
              <a href="/dashboard/subscriptions">Add your first subscription</a>
            </Button>
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
            <CardTitle className="text-emerald-700 dark:text-emerald-300">
              {renewingThisWeek.length > 0 ? "Renewing This Week" : "Recent Renewals"}
            </CardTitle>
            <CardDescription>
              {renewingThisWeek.length > 0
                  ? `${renewingThisWeek.length} subscription${renewingThisWeek.length !== 1 ? "s" : ""} renewing in the next 7 days`
                : `Your upcoming renewals, sorted by date`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {recentItems.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center text-muted-foreground">
            <Calendar className="h-8 w-8 text-emerald-400" />
            <p className="text-sm">No active subscriptions to show.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentItems.map((sub) => {
              const isRenewing = renewingThisWeek.some((r) => r.id === sub.id)
              return (
                <div
                  key={sub.id}
                  className={`flex items-center gap-3 ${
                    isRenewing ? "bg-emerald-500/5 rounded-lg p-2 -mx-2" : ""
                  }`}
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`/avatars/default.png`} alt={sub.name} />
                    <AvatarFallback>{initials(sub.name)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1 min-w-0 flex-1">
                    <p className="text-sm font-medium leading-none truncate">{sub.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="capitalize">{sub.category || "uncategorized"}</span>
                      {sub.renewalDate && (
                        <>
                          <span className="text-muted-foreground/50">·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(parseISO(sub.renewalDate), "MMM d")}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="ml-auto font-medium text-right">
                    <div className="text-sm font-medium">-{fmt(sub.price)}</div>
                    {isRenewing && (
                      <div className="flex items-center gap-1 mt-0.5 text-xs text-amber-600 dark:text-amber-400">
                        <AlertCircle className="h-3 w-3" />
                        Renewing soon
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
