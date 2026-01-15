import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background pt-16 pb-32 md:pt-24 md:pb-48">
      {/* Background Gradient Blob */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-12"
      >
        <div 
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/10">
              New: Enterprise Teams Support
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Master Your Recurring <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
              Revenue & Expenses
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            The ultimate subscription management platform for modern developers and agencies. 
            Track trends, predict costs, and never miss a renewal again.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="h-12 px-8 text-base">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              Live Demo
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-x-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-x-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-x-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>14-day free trial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
