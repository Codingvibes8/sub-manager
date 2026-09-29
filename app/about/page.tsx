import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download, Mail, ExternalLink } from "lucide-react"

export const metadata = {
  title: "About — SubManager",
  description:
    "SubManager is an open-source SaaS license tracker built for agencies and engineering teams who want to stop leaking money on unused software seats.",
}

const values = [
  {
    title: "Built for the way teams actually spend software money",
    body:
      "Most SaaS subscriptions are bought by individuals and forgotten. SubManager was built by a small dev shop that kept finding unused seats on tools like Vercel, Figma, and JetBrains at renewal time. We wanted a single place to see the whole picture — who has what, what it costs, and what's coming up for renewal.",
  },
  {
    title: "Your data, your Supabase project",
    body:
      "We don't host your subscription data. Your workspace connects to your own Supabase project, and all subscription records stay in your database. We never see your credentials, and we have no way to access your data. That means no data sales, no surprise third-party sharing, and no vendor lock-in.",
  },
  {
    title: "Open by default",
    body:
      "The core of SubManager is open source. The subscription tracking, renewal alerts, and team management logic are all available for audit. If you want to self-host or fork, you can. We'd rather earn your trust than demand it.",
  },
  {
    title: "Focused on what saves money",
    body:
      "A lot of subscription trackers are built around 'tracking your spending.' Ours is built around 'finding and canceling the stuff you forgot about.' Renewal alerts, a cancel-link database for the top 200 SaaS vendors, and one-click PDF reports are the features that actually move the number — not another pretty bar chart.",
  },
]

const team = [
  { name: "Alex Rivera", role: "Founder / Product", bio: "Former agency ops lead who got tired of discovering unused Adobe seats at the end of every quarter." },
  { name: "Priya Nair", role: "Engineering", bio: "Full-stack dev who built the Supabase integration and the renewal alert engine. Previously at a Y Combinator-backed payments startup." },
]

export default function AboutPage() {
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
            <Link href="/pricing" className="text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
            <Link href="/about" className="text-foreground">About</Link>
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

      <main>
        {/* Hero */}
        <section className="border-b bg-background/50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                We're building the tool we wished we had
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                SubManager started as an internal tool to stop our agency from bleeding money on unused
                software seats. Three quarters in, we'd saved more on cancelled licenses than the tool
                cost to build. We decided to open it up to other teams who are tired of surprise renewals.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {values.map((v) => (
              <Card key={v.title} className="border-emerald-500/20 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-xl">{v.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{v.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold mb-8">The team</h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl">
            {team.map((member) => (
              <Card key={member.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <a href="mailto:hello@submanager.app" className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> hello@submanager.app
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" /> GitHub
              </a>
            </Button>
          </div>
        </section>
      </main>

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
