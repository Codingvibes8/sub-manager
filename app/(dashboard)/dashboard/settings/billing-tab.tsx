"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, ExternalLink, Check, X, Loader2, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { formatStripeAmount, isTrialActive, isSubscriptionActive } from "@/lib/stripe"

type Subscription = {
  id: string
  status: string
  plan: string
  current_period_end: string | null
  cancel_at_period_end: boolean
  trial_end: string | null
  created_at: string
}

type Invoice = {
  id: string
  stripe_invoice_id: string
  amount_due: number
  currency: string
  status: string
  hosted_invoice_url: string | null
  created_at: string
}

export default function BillingTab() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingInvoices, setIsLoadingInvoices] = useState(true)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const fetchBillingStatus = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/billing/status")
      if (res.ok) {
        const data = await res.json()
        setSubscription(data.subscription)
      }
    } catch (error) {
      console.error("Failed to fetch billing status:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchInvoices = useCallback(async () => {
    setIsLoadingInvoices(true)
    try {
      const res = await fetch("/api/billing/invoices")
      if (res.ok) {
        const data = await res.json()
        setInvoices(data.invoices || [])
      }
    } catch (error) {
      console.error("Failed to fetch invoices:", error)
    } finally {
      setIsLoadingInvoices(false)
    }
  }, [])

  useEffect(() => {
    fetchBillingStatus()
    fetchInvoices()
  }, [fetchBillingStatus, fetchInvoices])

  const handleManageBilling = async () => {
    setIsRedirecting(true)
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.error || "Failed to open billing portal")
        setIsRedirecting(false)
      }
    } catch {
      toast.error("Failed to open billing portal")
      setIsRedirecting(false)
    }
  }

  const handleUpgrade = async () => {
    setIsRedirecting(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "team" }),
      })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.error || "Failed to start checkout")
        setIsRedirecting(false)
      }
    } catch {
      toast.error("Failed to start checkout")
      setIsRedirecting(false)
    }
  }

  const trialActive = isTrialActive(subscription?.trial_end)
  const subActive = isSubscriptionActive(subscription?.status)
  const isPaid = subActive && !trialActive
  const isFree = !subscription || subscription.status === "canceled" || !subActive

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Billing</h2>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Billing</h2>
        <p className="text-muted-foreground">
          Manage your subscription, payment methods, and invoices.
        </p>
      </div>
      <Separator className="my-6" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current Plan</CardTitle>
              {trialActive && (
                <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30">
                  Trial
                </Badge>
              )}
              {isPaid && (
                <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30">
                  Active
                </Badge>
              )}
              {isFree && (
                <Badge variant="secondary">Free</Badge>
              )}
            </div>
            <CardDescription>
              {isFree && "You are on the free plan"}
              {trialActive && "Your trial is active"}
              {isPaid && "Your subscription is active"}
              {subscription?.cancel_at_period_end && "Cancels at period end"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">
                {isFree ? "$0" : "$12"}
              </span>
              <span className="text-muted-foreground">
                {isFree ? "forever" : "/user/month"}
              </span>
            </div>

            {trialActive && subscription?.trial_end && (
              <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-700 dark:text-amber-400">
                    Trial ends {new Date(subscription.trial_end).toLocaleDateString()}
                  </p>
                  <p className="text-amber-600/70 dark:text-amber-400/70 mt-0.5">
                    Add a payment method before your trial ends to keep your Team features.
                  </p>
                </div>
              </div>
            )}

            {subscription?.cancel_at_period_end && (
              <div className="flex items-start gap-2 rounded-lg bg-orange-500/10 border border-orange-500/20 p-3">
                <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-orange-700 dark:text-orange-400">
                    Cancels at period end
                  </p>
                  <p className="text-orange-600/70 dark:text-orange-400/70 mt-0.5">
                    Your Team features remain until{" "}
                    {subscription.current_period_end
                      ? new Date(subscription.current_period_end).toLocaleDateString()
                      : "the end of your billing period"}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Plan features</h4>
              <ul className="space-y-1.5">
                {[
                  "Unlimited team members",
                  "Unlimited subscriptions",
                  "Renewal reminder automation",
                  "PDF spend reports",
                  "CSV export",
                  "Cancel-link database",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    {isFree ? (
                      <X className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    )}
                    <span className={isFree ? "text-muted-foreground" : ""}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {isFree && (
                <Button
                  onClick={handleUpgrade}
                  disabled={isRedirecting}
                  className="w-full"
                >
                  {isRedirecting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CreditCard className="h-4 w-4" />
                  )}
                  Start 14-day free trial
                </Button>
              )}
              {(isPaid || trialActive) && (
                <Button
                  variant="outline"
                  onClick={handleManageBilling}
                  disabled={isRedirecting}
                  className="w-full"
                >
                  {isRedirecting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ExternalLink className="h-4 w-4" />
                  )}
                  Manage billing
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>
              View and download your past invoices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingInvoices ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : invoices.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  No invoices yet. Invoices will appear here after your first payment.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">
                        {formatStripeAmount(invoice.amount_due)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(invoice.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          invoice.status === "paid"
                            ? "default"
                            : invoice.status === "open"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          invoice.status === "paid"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                            : ""
                        }
                      >
                        {invoice.status}
                      </Badge>
                      {invoice.hosted_invoice_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <a
                            href={invoice.hosted_invoice_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
