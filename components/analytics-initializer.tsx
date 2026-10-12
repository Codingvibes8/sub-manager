"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { initAnalytics, trackEvent } from "@/lib/analytics"

export function AnalyticsInitializer() {
  const pathname = usePathname()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    trackEvent("$pageview", { path: pathname })
  }, [pathname])

  return null
}
