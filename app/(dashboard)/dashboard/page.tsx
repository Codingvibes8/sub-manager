import { StatsCards } from "@/components/dashboard/stats-cards"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { RecentSubscriptions } from "@/components/dashboard/recent-subscriptions"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <StatsCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <OverviewChart className="col-span-4" />
        <RecentSubscriptions className="col-span-3" />
      </div>
    </div>
  )
}
