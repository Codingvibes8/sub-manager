export const metadata = {
  title: "Privacy Policy — SubManager",
  description: "How SubManager handles your data. Spoiler: we don't collect much, and what we do collect lives in your Supabase project, not ours.",
}

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold">1. What data we collect</h2>
            <p className="mt-2 text-muted-foreground">
              SubManager is designed to keep your data in your own Supabase project. We do not collect, store,
              or process your subscription data on our servers. The only data we receive is:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
              <li>Your email address (when you sign up or log in via Supabase Auth).</li>
              <li>Anonymous usage telemetry (which features are clicked) if you opt in — no subscription content, no billing data.</li>
              <li>Server logs containing request metadata (IP address, timestamp) retained for 7 days for security monitoring.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">2. What data we do not collect</h2>
            <p className="mt-2 text-muted-foreground">
              We do not collect, store, or have access to:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
              <li>Your Supabase credentials or API keys.</li>
              <li>Your subscription names, prices, renewal dates, or categories.</li>
              <li>Your team member emails or roles (these live in your Supabase project).</li>
              <li>Any payment card or billing information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">3. How we use your data</h2>
            <p className="mt-2 text-muted-foreground">
              We use your email address solely to authenticate you via Supabase Auth and to send
              account-related notifications (password reset, email verification) if you use the email login path.
              We do not use your email for marketing, do not sell it, and do not share it with third parties
              except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">4. Data storage and retention</h2>
            <p className="mt-2 text-muted-foreground">
              Your subscription data is stored in your own Supabase project under your control.
              You can export it, delete it, or delete your Supabase project at any time.
              We retain server logs for 7 days and then delete them automatically.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">5. Your rights</h2>
            <p className="mt-2 text-muted-foreground">
              Because your data lives in your Supabase project, you have full control:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
              <li>Access: request a copy of your data via your Supabase dashboard.</li>
              <li>Correction: edit or delete any subscription directly in the app or Supabase.</li>
              <li>Deletion: delete your Supabase project to remove all data associated with your workspace.</li>
              <li>Portability: export your subscriptions as CSV from the app at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">6. Cookies</h2>
            <p className="mt-2 text-muted-foreground">
              SubManager uses only essential cookies for session management via Supabase Auth.
              We do not use analytics cookies, advertising cookies, or tracking pixels.
              If you opt into anonymous usage telemetry, a single anonymous session ID cookie is set
              to distinguish sessions — no personal data is included.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">7. Third-party services</h2>
            <p className="mt-2 text-muted-foreground">
              SubManager relies on the following third-party services. Each has its own privacy policy
              that governs how they process data on our behalf:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
              <li>
                              <strong>Supabase</strong> — authentication, database, and realtime. See{" "}
                              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                                supabase.com/privacy
                              </a>.
                            </li>
                            <li>
                              <strong>Vercel</strong> — hosting and edge functions. See{" "}
                              <a href="https://vercel.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                                vercel.com/privacy
                              </a>.
                            </li>
                            <li>
                              <strong>GitHub</strong> — OAuth login (if you choose GitHub sign-in). See{" "}
                              <a href="https://docs.github.com/en/github/site-policy/github-privacy-statement" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                                GitHub Privacy Statement
                              </a>.
                            </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">8. Children's privacy</h2>
            <p className="mt-2 text-muted-foreground">
              SubManager is not intended for use by children under 13. We do not knowingly collect personal
              information from children. If we learn we have collected such data, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">9. Changes to this policy</h2>
            <p className="mt-2 text-muted-foreground">
              We may update this Privacy Policy from time to time. Material changes will be noted in the
              "Last updated" date at the top of this page. For significant changes, we will notify you via
              email or a notice in the app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">10. Contact</h2>
            <p className="mt-2 text-muted-foreground">
              If you have questions about this Privacy Policy, email{" "}
              <a href="mailto:hello@submanager.app" className="underline underline-offset-2 hover:text-foreground">
                hello@submanager.app
              </a>{" "}
              or write to us at:
            </p>
            <p className="mt-2 text-muted-foreground">
              SubManager<br />
              Attn: Privacy<br />
              hello@submanager.app
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SubManager. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
