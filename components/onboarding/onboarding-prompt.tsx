"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

export function OnboardingPrompt({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 p-6">
      <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="relative flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            <h3 className="text-lg font-semibold">Welcome to SubManager</h3>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Get started with a quick setup to add your first subscription and configure your preferences.
          </p>
        </div>
        <Button
          onClick={onStart}
          className="btn-gradient glow-hover rounded-full gap-2 shrink-0"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
