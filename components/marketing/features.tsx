import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, BellRing, CreditCard, ShieldCheck, Zap, Users } from "lucide-react";

const features = [
  {
    title: "Subscription Tracking",
    description: "Keep all your recurring payments in one place. Never lose track of a subscription again.",
    icon: CreditCard,
    className: "md:col-span-2",
  },
  {
    title: "Smart Reminders",
    description: "Get notified before renewals. Decide whether to keep or cancel before you get charged.",
    icon: BellRing,
    className: "md:col-span-1",
  },
  {
    title: "Spending Analytics",
    description: "Visualize your spending habits. See exactly where your money is going every month.",
    icon: BarChart3,
    className: "md:col-span-1",
  },
  {
    title: "Team Management",
    description: "Manage software licenses for your entire team. Assign seats and track usage.",
    icon: Users,
    className: "md:col-span-2",
  },
  {
    title: "Secure & Private",
    description: "Bank-grade encryption keeps your data safe. We never sell your personal information.",
    icon: ShieldCheck,
    className: "md:col-span-3",
  },
];

export function Features() {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <div className="text-center md:pb-8 max-w-2xl mx-auto">
         <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Everything you need to <span className="text-primary">take control</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Stop wasting money on unused subscriptions. Our platform gives you the visibility and control you need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className={`bg-muted/50 border-none shadow-none hover:bg-muted/80 transition-colors ${feature.className}`}>
            <CardHeader>
              <feature.icon className="h-10 w-10 text-primary mb-2" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
