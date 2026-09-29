export const metadata = {
  title: "Terms of Service — SubManager",
  description: "Terms of Service for SubManager. By using SubManager, you agree to these terms.",
}

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold">1. Acceptance of Terms</h2>
            <p className="mt-2 text-muted-foreground">
              By accessing or using SubManager ("Service"), you agree to be bound by these Terms of Service
              ("Terms") and all applicable laws and regulations. If you do not agree with any of these terms,
              you are prohibited from using or accessing the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">2. Description of Service</h2>
            <p className="mt-2 text-muted-foreground">
              SubManager is a SaaS license tracking tool that helps teams and individuals track software
              subscriptions, monitor renewals, and manage team access. The Service connects to your own
              Supabase project for data storage. SubManager does not host your subscription data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">3. Accounts and Registration</h2>
            <p className="mt-2 text-muted-foreground">
              To use certain features of the Service, you must create an account via Supabase Auth.
              You are responsible for:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
              <li>Maintaining the confidentiality of your account credentials.</li>
              <li>All activity that occurs under your account.</li>
              <li>Notifications sent to the email address associated with your account.</li>
              <li>Providing accurate and complete information when registering.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">4. Supabase Integration</h2>
            <p className="mt-2 text-muted-foreground">
              SubManager uses your own Supabase project as its data store. By using the Service, you acknowledge
              and agree that:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
              <li>Your subscription data is stored in your Supabase project, not on SubManager's servers.</li>
              <li>You are responsible for managing your Supabase project, including backups, access controls, and billing for Supabase usage.</li>
              <li>SubManager requests access to your Supabase project via the Supabase JavaScript client using the credentials you provide.</li>
              <li>SubManager is not a Supabase product, is not endorsed by Supabase, and is not covered by Supabase's service agreement.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">5. Subscription Plans and Billing</h2>
            <p className="mt-2 text-muted-foreground">
              SubManager offers free and paid subscription plans as described on our Pricing page.
              Billing is managed through our payment processor. By subscribing to a paid plan, you agree to
              provide current, complete, and accurate purchase and account information and to update such
              information as necessary to keep it accurate. You authorize us to charge your payment method
              on the billing cycle date. If your payment fails, we may suspend access to paid features until
              payment is received.
            </p>
            <p className="mt-2 text-muted-foreground">
              Unless otherwise stated, all fees are in U.S. dollars, non-refundable, and non-transferable.
              Discounts apply only to the first billing cycle unless otherwise noted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">6. Free Tier Limits</h2>
            <p className="mt-2 text-muted-foreground">
              The Free plan is limited to up to 3 team members and 10 subscriptions per workspace.
              SubManager may change these limits at any time. If you exceed the limits, you will not be able
              to add new subscriptions or invite new members until you upgrade or remove existing ones.
              Exceeding limits does not delete your existing data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">7. Trial Periods</h2>
            <p className="mt-2 text-muted-foreground">
              Paid plans may include a free trial period as described on our Pricing page.
              Trial access grants full access to the plan's features for the trial duration.
              Trials do not require a payment method unless stated otherwise. At the end of the trial,
              your workspace automatically reverts to the Free plan unless you subscribe to a paid plan.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">8. License and Ownership</h2>
            <p className="mt-2 text-muted-foreground">
              You retain full ownership of all data you enter into the Service. SubManager claims no ownership
              over your subscription data, team member information, or any other content you add.
              SubManager retains all rights, title, and interest in the Service itself, including its
              trademarks, code, and design.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">9. Acceptable Use</h2>
            <p className="mt-2 text-muted-foreground">
              You agree not to use the Service to:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
              <li>Store or manage subscriptions for fraudulent or illegal activities.</li>
              <li>Impersonate any person or entity, or falsely state your affiliation with a person or entity.</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
              <li>Attempt to bypass any usage limits, access controls, or security features of the Service.</li>
              <li>Scrape, crawl, or systematically access the Service for any purpose other than using it as intended.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">10. Data Privacy and Security</h2>
            <p className="mt-2 text-muted-foreground">
              Please review our{" "}
              <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</a>{" "}
              for details on how we handle data. You are responsible for selecting an appropriate Supabase
              project tier and configuring access controls to protect your data. SubManager is not responsible
              for the security of your Supabase project or for any third-party access to your data resulting
              from your own credentials or configuration.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">11. Disclaimer of Warranties</h2>
            <p className="mt-2 text-muted-foreground">
              The Service is provided "as is" and "as available" without warranties of any kind, either express
              or implied. SubManager does not warrant that the Service will be uninterrupted, error-free, or
              free of harmful components. SubManager does not warrant that the Service will meet your specific
              requirements or that any particular subscription will be successfully tracked or that renewal
              alerts will be delivered on time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">12. Limitation of Liability</h2>
            <p className="mt-2 text-muted-foreground">
              To the maximum extent permitted by law, SubManager shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
              whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible
              losses resulting from your use of the Service. In no event shall SubManager's total liability
              to you for all damages exceed the amount you paid to SubManager in the 12 months preceding
              the claim, or $100 if you have not paid anything.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">13. Indemnification</h2>
            <p className="mt-2 text-muted-foreground">
              You agree to defend, indemnify, and hold harmless SubManager and its officers, directors, employees,
              agents, and contributors from and against any claims, liabilities, damages, judgments, awards,
              losses, costs, expenses, or fees arising from your violation of these Terms or your use of the
              Service in violation of applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">14. Termination</h2>
            <p className="mt-2 text-muted-foreground">
              We may terminate or suspend your access to the Service immediately, without prior notice or
              liability, for any reason, including without limitation if you breach these Terms.
              Upon termination, your right to use the Service will end. Your data remains in your Supabase
              project and is not deleted by us upon termination.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">15. Governing Law</h2>
            <p className="mt-2 text-muted-foreground">
              These Terms shall be governed by and construed in accordance with the laws of the United States,
              without regard to its conflict of law provisions. Any legal action or proceeding arising under
              these Terms will be brought exclusively in the federal or state courts located in the jurisdiction
              where SubManager's principal place of business is located.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">16. Changes to These Terms</h2>
            <p className="mt-2 text-muted-foreground">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
              Material changes will be notified via email or a notice in the app at least 30 days before they
              take effect. Your continued use of the Service after any changes constitutes acceptance of the
              new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">17. Contact</h2>
            <p className="mt-2 text-muted-foreground">
              Questions about these Terms should be sent to{" "}
              <a href="mailto:hello@submanager.app" className="underline underline-offset-2 hover:text-foreground">
                hello@submanager.app
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SubManager. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="text-foreground">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
