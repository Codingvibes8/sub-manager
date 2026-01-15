"use client"

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
import { Plus, Trash2 } from "lucide-react"

const members = [
  {
    name: "Olivia Martin",
    email: "m@example.com",
    role: "Admin",
    avatar: "/avatars/01.png",
    initials: "OM"
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@example.com",
    role: "Member",
    avatar: "/avatars/02.png",
    initials: "JL"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@example.com",
    role: "Member",
    avatar: "/avatars/03.png",
    initials: "IN"
  },
]

export default function TeamPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
        <Button>
            <Plus className="mr-2 h-4 w-4" /> Invite Member
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-1 border-primary/20 bg-primary/5">
            <CardHeader>
                <CardTitle>Enterprise Plan</CardTitle>
                <CardDescription>You are currently on the Enterprise plan.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">12 / 20</div>
                <p className="text-sm text-muted-foreground">Seats used</p>
                <Button className="mt-4 w-full" variant="outline">Manage Billing</Button>
            </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Invite your team members to collaborate.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
