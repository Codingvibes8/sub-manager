import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
