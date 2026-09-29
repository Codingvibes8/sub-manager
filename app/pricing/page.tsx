import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    tagline: "For individuals tracking their own software",
    price: "$0",
    period: "forever",
    description:
      "Start tracking your team's subscriptions for free. Upgrade when your team grows.",
    highlights: [
      { text: "Up to 3 team members", included: true },
      { text: "10 subscriptions per workspace", included: true },
      { text: "Renewal alerts (email, 7-day)", included: true },
      { text: "Monthly spending chart", included: true },
      { text: "Category breakdown", included: true },
      { text: "CSV export", included: false },
      { text: "Unlimited team members", included: false },
      { text: "Unlimited subscriptions", included: false },
      { text: "PDF spend reports", included: false },
      { text: "Renewal reminder automation", included: false },
      { text: "Cancel-link database", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Start for free",
    href: "/signup",
    popular: false,
  },
  {
    name: "Team",
    tagline: "For agencies, startups, and growing teams",
    price: "$12",
    period: "per user / month",
    description:
      "Every feature unlocked. Stop flying blind on SaaS spend and start optimizing it.",
    highlights: [
      { text: "Up to 3 team members", included: false },
      { text: "10 subscriptions per workspace", included: false },
      { text: "Renewal alerts (email, 7-day)", included: true },
      { text: "Monthly spending chart", included: true },
      { text: "Category breakdown", included: true },
      { text: "CSV export", included: true },
      { text: "Unlimited team members", included: true },
      { text: "Unlimited subscriptions", included: true },
      { text: "PDF spend reports", included: true },
      { text: "Renewal reminder automation", included: true },
      { text: "Cancel-link database", included: true },
      { text: "Priority support", included: false },
    ],
    cta: "Start Team trial",
    href: "/signup?plan=team",
    popular: true,
  },
  {
    name: "Enterprise",
    tagline: "For organizations with compliance, SSO, and audit requirements",
    price: "Custom",
    period: "contact us",
    description:
      "Everything in Team, plus SSO/SAML, audit logs, custom contracts, and a dedicated account manager.",
    highlights: [
      { text: "Everything in Team", included: true },
      { text: "SSO / SAML login", included: true },
      { text: "Audit log (who changed what and when)", included: true },
      { text: "Custom data retention policies", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom SLA", included: true },
      { text: "On-premise / VPC deployment options", included: true },
    ],
    cta: "Talk to sales",
    href: "/contact",
    popular: false,
  },
]

export const metadata = {
  title: "Pricing — SubManager",
  description:
    "Free for up to 3 users. Team plan at $12/user/month unlocks unlimited subscriptions, renewal automation, PDF reports, and the cancel-link database.",
}

function FeatureRow({ highlight }: { highlight: (typeof plans)[0]["highlights"][0] }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      {highlight.included ? (
        <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
      ) : (
        <X className="h-4 w-4 text-zinc-400 shrink-0" />
      )}
      <span className={highlight.included ? "text-foreground" : "text-muted-foreground"}>
        {highlight.text}
      </span>
    </div>
  )
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">SubManager</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/#features" className="text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="/pricing" className="text-foreground">
              Pricing
            </Link>
            <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b bg-background/50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Start free. Upgrade when your team outgrows the free tier — no surprises, no per-seat bait and switch.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col border-2 transition-all ${
                plan.popular
                  ? "border-emerald-500 shadow-lg shadow-emerald-500/10 scale-[1.02]"
                  : "border-transparent"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 px-3 py-0.5 text-xs font-semibold text-white">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="flex-1">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.tagline}</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>

              <CardContent className="flex flex-col">
                <ul className="space-y-2 flex-1">
                  {plan.highlights.map((h, i) => (
                    <FeatureRow key={i} highlight={h} />
                  ))}
                </ul>

                <Button
                  className={`w-full mt-6 ${
                    plan.popular
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                  }`}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>

                {plan.name === "Free" && (
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    No credit card required. Upgrade anytime.
                  </p>
                )}
                {plan.name === "Team" && (
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    14-day free trial. No credit card required.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <dl className="mt-8 space-y-6">
            {[
              {
                q: "What counts as a 'team member'?",
                a: "Anyone you invite to your workspace with view or admin access. The free tier covers up to 3 members — perfect for small teams or freelancers with a client.",
              },
              {
                q: "What happens when I hit the 10-subscription limit on the free tier?",
                a: "You keep all your data. You can view it, but you won't be able to add new subscriptions until you upgrade. Your existing subscriptions are never deleted.",
              },
              {
                q: "Can I switch plans later?",
                a: "Yes. Upgrade or downgrade at any time in Settings. Upgrades take effect immediately; downgrades apply at the end of your billing cycle.",
              },
              {
                q: "Is there a free trial for the Team plan?",
                a: "Yes — 14 days, no credit card required. You get full Team access during the trial, and you can downgrade to Free or cancel anytime.",
              },
              {
                q: "Where does my subscription data live?",
                a: "In your own Supabase project. SubManager never sees your credentials, never stores your subscription data on our servers, and never sells your data. Your Supabase credentials are the only key.",
              },
              {
                q: "Do you offer discounts for nonprofits or education?",
                a: "Yes. Email us at hello@submanager.app from your organization email and we'll set you up with a discount on the Team plan.",
              },
            ].map((item, i) => (
              <div key={i}>
                <dt className="text-base font-medium">{item.q}</dt>
                <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SubManager. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
