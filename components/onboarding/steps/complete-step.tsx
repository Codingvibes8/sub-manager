"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Check, PartyPopper, ArrowRight } from 'lucide-react'

type CompleteStepProps = {
  onComplete: () => void
}

export function CompleteStep({ onComplete }: CompleteStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-4 py-6">
        <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Check className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
            You&apos;re all set!
            <PartyPopper className="h-5 w-5 text-emerald-500" />
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Your account is ready. Start tracking your subscriptions and take control of your spending.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Quick tips:</p>
        <ul className="text-xs text-muted-foreground space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">1.</span>
            Add all your subscriptions to get a complete picture
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">2.</span>
            Check the Analytics page for spending insights
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">3.</span>
            Invite team members to share subscriptions
          </li>
        </ul>
      </div>

      <div className="flex justify-center pt-2">
        <Button onClick={onComplete} className="btn-gradient glow-hover rounded-full px-8">
          Go to dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
