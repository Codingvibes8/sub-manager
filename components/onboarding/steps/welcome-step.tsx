"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, Bell, BarChart3, Users } from 'lucide-react'

type WelcomeStepProps = {
  onNext: () => void
  onSkip: () => void
}

export function WelcomeStep({ onNext, onSkip }: WelcomeStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-4 py-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Welcome to SubManager</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Let&apos;s get you set up in less than a minute. We&apos;ll help you track subscriptions, monitor spending, and never miss a renewal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
          <Bell className="h-5 w-5 text-emerald-500" />
          <span className="text-xs text-center text-muted-foreground">Renewal Alerts</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
          <BarChart3 className="h-5 w-5 text-emerald-500" />
          <span className="text-xs text-center text-muted-foreground">Spend Analytics</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
          <Users className="h-5 w-5 text-emerald-500" />
          <span className="text-xs text-center text-muted-foreground">Team Management</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={onSkip} className="text-muted-foreground">
          Skip setup
        </Button>
        <Button onClick={onNext} className="btn-gradient glow-hover rounded-full px-6">
          Get started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
