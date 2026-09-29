"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { useOnboarding } from "./onboarding-provider"
import { Sparkles, X } from "lucide-react"

export function OnboardingBanner() {
  const { isComplete, isLoading, openOnboarding, completeOnboarding } = useOnboarding()

  if (isComplete || isLoading) return null

  return (
    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-emerald-500 shrink-0" />
        <div>
          <p className="text-sm font-medium">Finish setting up your workspace</p>
          <p className="text-xs text-muted-foreground">
            Add subscriptions, configure notifications, and explore analytics.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={completeOnboarding}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={openOnboarding}
          className="btn-gradient glow-hover rounded-full"
        >
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          Resume setup
        </Button>
      </div>
    </div>
  )
}
