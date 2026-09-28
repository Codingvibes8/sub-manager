import { SubscriptionsTable } from "@/components/dashboard/subscriptions-table"
import { AddSubscriptionDialog } from "@/components/dashboard/add-subscription-dialog"

export default function SubscriptionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Subscriptions</h2>
        <div className="flex items-center space-x-2">
          <AddSubscriptionDialog />
        </div>
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        <SubscriptionsTable />
      </div>
    </div>
  )
}
