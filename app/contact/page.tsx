import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Contact — SubManager",
  description: "Get in touch with the SubManager team for sales, support, or partnership inquiries.",
}

export default function ContactPage() {
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Contact us</h1>
        <p className="mt-2 text-muted-foreground">
          Sales questions, support, partnership inquiries — we're here to help.
        </p>

        <div className="mt-10 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">General inquiries & support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Email us at{" "}
                <a href="mailto:hello@submanager.app" className="underline underline-offset-2 hover:text-foreground">
                  hello@submanager.app
                </a>{" "}
                and we'll get back to you within one business day.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sales / Enterprise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Interested in a team or enterprise plan? Email{" "}
                <a href="mailto:sales@submanager.app" className="underline underline-offset-2 hover:text-foreground">
                  sales@submanager.app
                </a>{" "}
                with your team size and what you're looking for. We respond within one business day.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security & privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Report a security issue or privacy concern at{" "}
                <a href="mailto:security@submanager.app" className="underline underline-offset-2 hover:text-foreground">
                  security@submanager.app
                </a>
                . We treat security reports confidentially and will acknowledge them within 48 hours.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Partnerships & affiliates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Agency partners, fractional COOs, and SaaS consultants — we have a partner program.
                Email{" "}
                <a href="mailto:partners@submanager.app" className="underline underline-offset-2 hover:text-foreground">
                  partners@submanager.app
                </a>{" "}
                for details.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

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
