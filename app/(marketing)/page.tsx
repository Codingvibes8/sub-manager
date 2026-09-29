import { Navbar } from "@/components/marketing/navbar"
import { Hero } from "@/components/marketing/hero"
import { Features } from "@/components/marketing/features"

export const metadata = {
  title: "SubManager — Stop Wasting Money on Unused Software Licenses",
  description:
    "SubManager gives office managers, engineering leads, and agency ops teams a single dashboard to track every SaaS seat, catch renewals before they hit, and cancel the tools nobody uses.",
  openGraph: {
    title: "SubManager — Stop Wasting Money on Unused Software Licenses",
    description:
      "SubManager gives office managers, engineering leads, and agency ops teams a single dashboard to track every SaaS seat, catch renewals before they hit, and cancel the tools nobody uses.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SubManager — Stop Wasting Money on Unused Software Licenses",
    description:
      "SubManager gives office managers, engineering leads, and agency ops teams a single dashboard to track every SaaS seat, catch renewals before they hit, and cancel the tools nobody uses.",
  },
}

export default function MarketingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a href="https://submanager.app" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              SubManager
            </a>
            . The source code is available on{" "}
            <a href="https://github.com" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              GitHub
            </a>
            .
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
