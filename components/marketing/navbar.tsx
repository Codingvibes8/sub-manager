import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-5 w-5" />
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
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
