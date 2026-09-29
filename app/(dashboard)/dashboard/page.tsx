"use client"

import { Suspense } from "react"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { RecentSubscriptions } from "@/components/dashboard/recent-subscriptions"
import { AddSubscriptionDialog } from "@/components/dashboard/add-subscription-dialog"
import { OnboardingPrompt } from "@/components/onboarding/onboarding-prompt"
import { Button } from "@/components/ui/button"
import { Plus, CreditCard, BarChart3, Sparkles } from "lucide-react"
import Link from "next/link"
import { useOnboarding } from "@/components/onboarding/onboarding-provider"
import { useSubscriptions } from "@/components/subscriptions-provider"

function EmptyState() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <AddSubscriptionDialog />
      </div>
      <StatsCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <OverviewChart className="col-span-4" />
        <RecentSubscriptions className="col-span-3" />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <Suspense fallback={<EmptyState />}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}

function DashboardContent() {
  const { openOnboarding, isLoading: onboardingLoading } = useOnboarding()
  const { subscriptions, isLoading: subsLoading } = useSubscriptions()

  const isEmpty = !subsLoading && subscriptions.length === 0
  const showOnboardingPrompt = isEmpty && !onboardingLoading

  if (isEmpty) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <AddSubscriptionDialog />
        </div>

        {showOnboardingPrompt && <OnboardingPrompt onStart={openOnboarding} />}

        <StatsCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <OverviewChart className="col-span-4" />
          <RecentSubscriptions className="col-span-3" />
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Quick actions</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link href="/dashboard/subscriptions">
              <Button variant="outline" className="w-full justify-start gap-2 h-12">
                <Plus className="h-4 w-4" />
                Add subscription
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start gap-2 h-12" asChild>
              <a href="/dashboard/subscriptions?view=table">
                <BarChart3 className="h-4 w-4" />
                View table
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 h-12" asChild>
              <a href="/dashboard/analytics">
                <CreditCard className="h-4 w-4" />
                View analytics
              </a>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <AddSubscriptionDialog />
      </div>
      <StatsCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <OverviewChart className="col-span-4" />
        <RecentSubscriptions className="col-span-3" />
      </div>

      <div className="pt-4 border-t">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Quick actions</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link href="/dashboard/subscriptions">
            <Button variant="outline" className="w-full justify-start gap-2 h-12">
              <Plus className="h-4 w-4" />
              Add subscription
            </Button>
          </Link>
          <Button variant="outline" className="w-full justify-start gap-2 h-12" asChild>
            <a href="/dashboard/subscriptions?view=table">
              <BarChart3 className="h-4 w-4" />
              View table
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 h-12" asChild>
            <a href="/dashboard/analytics">
              <CreditCard className="h-4 w-4" />
              View analytics
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
