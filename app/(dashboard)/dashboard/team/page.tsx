"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Shield, Lock, Users, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const members = [
  {
    name: "Olivia Martin",
    email: "olivia@example.com",
    role: "Admin",
    avatar: "/avatars/01.png",
    initials: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson@example.com",
    role: "Member",
    avatar: "/avatars/02.png",
    initials: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella@example.com",
    role: "Member",
    avatar: "/avatars/03.png",
    initials: "IN",
  },
]

export default function TeamPage() {
  const [plan, setPlan] = useState<"free" | "team">("free")
  const [isLoading, setIsLoading] = useState(true)

  // In a real app, this would fetch from your backend / Supabase
  // For now we'll simulate checking the plan after a short delay
  // and show the free tier state by default

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
        {plan === "free" && (
          <Button variant="outline" asChild className="gap-2">
            <Link href="/pricing">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Upgrade to Team
            </Link>
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {/* Plan Card */}
        <Card className={`col-span-1 ${plan === "team" ? "border-emerald-500/30 bg-emerald-500/5" : "border-primary/20 bg-primary/5"}`}>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Shield className={`h-5 w-5 ${plan === "team" ? "text-emerald-600" : "text-zinc-500"}`} />
              <CardTitle>{plan === "team" ? "Team Plan" : "Free Plan"}</CardTitle>
            </div>
            <CardDescription>
              {plan === "team"
                ? "Unlimited members, subscriptions, and automation."
                : "Upgrade to unlock team collaboration features."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">
              {plan === "team" ? "Unlimited" : "1"} / 3 members
            </div>
            <p className="text-sm text-muted-foreground">
              {plan === "team"
                ? "You're on the Team plan. No limits."
                : "Free tier includes up to 3 team members."}
            </p>

            <ul className="space-y-2 text-sm">
              {[
                { text: "Invite team members", enabled: plan === "team" },
                { text: "Role-based access (Admin/Member/Viewer)", enabled: plan === "team" },
                { text: "Shared subscription inventory", enabled: plan === "team" },
                { text: "Renewal alerts for team", enabled: plan === "team" },
                { text: "PDF spend reports", enabled: plan === "team" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className={`h-4 w-4 rounded ${item.enabled ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700"}`} />
                  <span className={item.enabled ? "text-foreground" : "text-muted-foreground"}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            {plan === "free" && (
              <Button className="w-full" asChild>
                <Link href="/pricing">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Upgrade to Team — $12/user/mo
                </Link>
              </Button>
            )}
            {plan === "team" && (
              <Button variant="outline" className="w-full" asChild>
                <Link href="/settings?tab=billing">Manage Billing</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Team Members Card */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              {plan === "team"
                ? "Invite your team members to collaborate on subscription management."
                : "Upgrade to Team plan to invite members and assign roles."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {plan === "free" ? (
              <div className="text-center py-8">
                <Lock className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Team features require upgrade</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The Free plan is for individual use only. Upgrade to the Team plan
                  to invite up to unlimited members with role-based access.
                </p>
                <Button asChild>
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Members (3)</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Invite Member
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.email}>
                        <TableCell className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select defaultValue={member.role.toLowerCase()}>
                            <SelectTrigger className="w-[110px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="member">Member</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}