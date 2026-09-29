"use client"

import { useState, useEffect, useCallback } from "react"
import { Bell, AlertTriangle, AlertCircle, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Alert = {
  id: string
  name: string
  price: number
  category: string
  renewalDate: string
  daysUntil: number
  urgency: "info" | "warning" | "critical"
}

export function NotificationBell() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAlerts = useCallback(async () => {
    try {
      const res = await fetch("/api/renewal-alerts")
      if (res.ok) {
        const data = await res.json()
        setAlerts(data.alerts || [])
      }
    } catch {
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAlerts()
    const interval = setInterval(fetchAlerts, 60000)
    return () => clearInterval(interval)
  }, [fetchAlerts])

  const criticalCount = alerts.filter((a) => a.urgency === "critical").length
  const warningCount = alerts.filter((a) => a.urgency === "warning").length
  const totalCount = alerts.length

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "border-red-500/30 bg-red-500/5"
      case "warning":
        return "border-amber-500/30 bg-amber-500/5"
      default:
        return "border-blue-500/30 bg-blue-500/5"
    }
  }

  const formatDaysUntil = (days: number) => {
    if (days === 0) return "Today"
    if (days === 1) return "Tomorrow"
    return `In ${days} days`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {totalCount > 9 ? "9+" : totalCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold text-sm">Renewal Alerts</h3>
          {totalCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {totalCount} upcoming
            </Badge>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              Loading alerts...
            </div>
          ) : alerts.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
              No upcoming renewals in the next 7 days
            </div>
          ) : (
            <div className="divide-y">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`px-4 py-3 border-l-2 ${getUrgencyColor(alert.urgency)}`}
                >
                  <div className="flex items-start gap-2">
                    {getUrgencyIcon(alert.urgency)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{alert.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(alert.price)} / month
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Renews {formatDaysUntil(alert.daysUntil)} ({alert.renewalDate})
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {alerts.length > 0 && (
          <div className="border-t px-4 py-2">
            <p className="text-xs text-muted-foreground text-center">
              {criticalCount > 0 && `${criticalCount} critical · `}
              {warningCount > 0 && `${warningCount} warning · `}
              {alerts.length - criticalCount - warningCount} info
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}
