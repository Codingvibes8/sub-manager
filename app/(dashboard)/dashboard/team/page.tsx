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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Shield, Lock, Users, ArrowUpRight, Mail, Clock } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useTeam, TeamMember, TeamRole } from "@/components/team-provider"
import { InviteMemberDialog } from "@/components/dashboard/invite-member-dialog"

export default function TeamPage() {
  const { team, members, invites, isLoading, userRole, isOwner, updateMemberRole, removeMember, cancelInvite } = useTeam()
  const [inviteOpen, setInviteOpen] = useState(false)

  const canManage = isOwner || userRole === "admin"
  const canInvite = team?.plan === "team" && canManage

  const handleRoleChange = async (memberId: string, role: TeamRole) => {
    const result = await updateMemberRole(memberId, role)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Role updated")
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    const result = await removeMember(memberId)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Member removed")
    }
  }

  const handleCancelInvite = async (inviteId: string) => {
    const result = await cancelInvite(inviteId)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Invite cancelled")
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          <div className="h-64 animate-pulse rounded-lg bg-muted" />
          <div className="h-64 animate-pulse rounded-lg bg-muted lg:col-span-2" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
        {team?.plan === "free" && (
          <Button variant="outline" asChild className="gap-2">
            <Link href="/pricing">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Upgrade to Team
            </Link>
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <Card className={`col-span-1 ${team?.plan === "team" ? "border-emerald-500/30 bg-emerald-500/5" : "border-primary/20 bg-primary/5"}`}>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Shield className={`h-5 w-5 ${team?.plan === "team" ? "text-emerald-600" : "text-zinc-500"}`} />
              <CardTitle>{team?.plan === "team" ? "Team Plan" : "Free Plan"}</CardTitle>
            </div>
            <CardDescription>
              {team?.plan === "team"
                ? "Unlimited members, subscriptions, and automation."
                : "Upgrade to unlock team collaboration features."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">
              {team?.plan === "team" ? "Unlimited" : "1"} / {team?.plan === "team" ? "unlimited" : "3"} members
            </div>
            <p className="text-sm text-muted-foreground">
              {team?.plan === "team"
                ? "You're on the Team plan. No limits."
                : "Free tier includes up to 3 team members."}
            </p>

            <ul className="space-y-2 text-sm">
              {[
                { text: "Invite team members", enabled: team?.plan === "team" },
                { text: "Role-based access (Admin/Member/Viewer)", enabled: team?.plan === "team" },
                { text: "Shared subscription inventory", enabled: team?.plan === "team" },
                { text: "Renewal alerts for team", enabled: team?.plan === "team" },
                { text: "PDF spend reports", enabled: team?.plan === "team" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className={`h-4 w-4 rounded ${item.enabled ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700"}`} />
                  <span className={item.enabled ? "text-foreground" : "text-muted-foreground"}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            {team?.plan === "free" && (
              <Button className="w-full" asChild>
                <Link href="/pricing">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Upgrade to Team — $12/user/mo
                </Link>
              </Button>
            )}
            {team?.plan === "team" && (
              <Button variant="outline" className="w-full" asChild>
                <Link href="/settings?tab=billing">Manage Billing</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              {team?.plan === "team"
                ? "Invite your team members to collaborate on subscription management."
                : "Upgrade to Team plan to invite members and assign roles."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {team?.plan === "free" ? (
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
                  <h3 className="text-sm font-medium">Members ({members.length})</h3>
                  {canInvite && (
                    <Button variant="outline" size="sm" onClick={() => setInviteOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" /> Invite Member
                    </Button>
                  )}
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
                      <TableRow key={member.id}>
                        <TableCell className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={member.profiles?.avatar_url || undefined} alt={member.profiles?.full_name || ""} />
                            <AvatarFallback>
                              {member.profiles?.full_name?.split(" ").map(n => n[0]).join("").toUpperCase() || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.profiles?.full_name || "Unknown"}</div>
                            <div className="text-sm text-muted-foreground">{member.profiles?.username || member.user_id.slice(0, 8)}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {canManage && member.user_id !== team?.owner_id ? (
                            <Select
                              value={member.role}
                              onValueChange={(value) => handleRoleChange(member.id, value as TeamRole)}
                            >
                              <SelectTrigger className="w-[110px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="member">Member</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <span className="text-sm capitalize">{member.role}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {canManage && member.user_id !== team?.owner_id ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => handleRemoveMember(member.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          ) : (
                            <span className="text-sm text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {invites.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <h3 className="text-sm font-medium mb-4">Pending Invitations</h3>
                    <div className="space-y-2">
                      {invites.map((invite) => (
                        <div key={invite.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{invite.email}</div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                Expires {new Date(invite.expires_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs capitalize text-muted-foreground">{invite.role}</span>
                            {canManage && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive"
                                onClick={() => handleCancelInvite(invite.id)}
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <InviteMemberDialog open={inviteOpen} onOpenChange={setInviteOpen} />
    </div>
  )
}
