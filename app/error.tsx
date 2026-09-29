"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Something went wrong
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              An unexpected error occurred. Please try again or contact support
              if the problem persists.
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={reset}>Try again</Button>
            <Button variant="outline" asChild>
              <a href="/">Go home</a>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
