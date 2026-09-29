import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, BellRing, CreditCard, ShieldCheck, Zap, Users, GitBranch, FileSearch, Clock } from "lucide-react";

const features = [
  {
    title: "SaaS Seat Inventory",
    description: "See every software license your team holds — who has it, what it costs, and whether it's actually being used. No more shadow IT hiding in credit card statements.",
    icon: Users,
    className: "md:col-span-2",
  },
  {
    title: "Renewal Alerts",
    description: "Get alerted 7 days before any subscription renews. One-click 'cancel reminder' emails so you never auto-renew a tool nobody uses.",
    icon: BellRing,
    className: "md:col-span-1",
  },
  {
    title: "Spending Analytics",
    description: "Visualize monthly SaaS spend by team, category, and vendor. Spot the $500/month design tool that only 2 people still log into.",
    icon: BarChart3,
    className: "md:col-span-1",
  },
  {
    title: "Team Workspaces",
    description: "Invite team members, assign admin/viewer roles, and give everyone visibility into the same subscription inventory. Free for up to 3 users.",
    icon: GitBranch,
    className: "md:col-span-2",
  },
  {
    title: "Vendor Discovery",
    description: "Search our curated database of cancellation links, phone numbers, and retention-deal tips for the top 200 SaaS vendors. Canceling becomes a 30-second task, not a 30-minute hunt.",
    icon: FileSearch,
    className: "md:col-span-1",
  },
  {
    title: "Secure by Default",
    description: "Your subscription data lives in your own Supabase project. We never see your credentials, we never sell your data, and everything is encrypted at rest.",
    icon: ShieldCheck,
    className: "md:col-span-3",
  },
  {
    title: "Renewal Timeline",
    description: "A chronological view of everything renewing this month, next month, and beyond — so you can plan budget conversations instead of reacting to surprise charges.",
    icon: Clock,
    className: "md:col-span-2",
  },
  {
    title: "One-Click Reports",
    description: "Export a clean monthly SaaS spend report for finance or your boss. CSV anytime, PDF on the Team plan. No more screenshots and sticky notes.",
    icon: Zap,
    className: "md:col-span-1",
  },
];

export function Features() {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <div className="text-center md:pb-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Everything a team needs to{" "}
          <span className="text-emerald-600 dark:text-emerald-400">stop leaking money</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Most teams waste 15–30% of their software budget on unused or duplicate licenses.
          SubManager gives you the visibility to find it and the tools to cut it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className={`bg-muted/50 border-none shadow-none hover:bg-muted/80 transition-colors ${feature.className}`}>
            <CardHeader>
              <feature.icon className="h-10 w-10 text-emerald-600 dark:text-emerald-400 mb-2" />
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
