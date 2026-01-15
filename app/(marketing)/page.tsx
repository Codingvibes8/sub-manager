import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";

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
              Built by <a href="#" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">Antigravity</a>.
              The source code is available on <a href="#" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">GitHub</a>.
            </p>
        </div>
      </footer>
    </div>
  );
}
