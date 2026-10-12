import posthog from "posthog-js"

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"

let initialized = false

export function initAnalytics() {
  if (initialized || !POSTHOG_KEY || typeof window === "undefined") return

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: true,
    capture_pageleave: true,
    persistence: "localStorage",
    bootstrap: {
      distinctID: undefined,
    },
  })

  initialized = true
}

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (!POSTHOG_KEY || typeof window === "undefined") return
  posthog.capture(eventName, properties)
}

export function identifyUser(userId: string, traits?: Record<string, unknown>) {
  if (!POSTHOG_KEY || typeof window === "undefined") return
  posthog.identify(userId, traits)
}

export function resetAnalytics() {
  if (!POSTHOG_KEY || typeof window === "undefined") return
  posthog.reset()
}
