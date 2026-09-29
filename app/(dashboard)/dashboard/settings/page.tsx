"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { createClient } from "@/utils/supabase/client"
import BillingTab from "./billing-tab"

type Tab = "profile" | "account" | "appearance" | "notifications" | "billing"

type ProfileData = {
  username: string
  full_name: string
  email: string
}

type EmailPreferences = {
  product_updates: boolean
  renewal_reminders: boolean
  promotional_emails: boolean
  weekly_digest: boolean
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const [isLoading, setIsLoading] = useState(true)

  const [profile, setProfile] = useState<ProfileData>({
    username: "",
    full_name: "",
    email: "",
  })
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSavingPassword, setIsSavingPassword] = useState(false)

  const [preferences, setPreferences] = useState<EmailPreferences>({
    product_updates: true,
    renewal_reminders: true,
    promotional_emails: false,
    weekly_digest: true,
  })
  const [isSavingPreferences, setIsSavingPreferences] = useState(false)

  const supabase = createClient()

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setIsLoading(false)
      return
    }

    setProfile((prev) => ({
      ...prev,
      email: user.email || "",
      username: (user.user_metadata?.username as string) || "",
      full_name: (user.user_metadata?.full_name as string) || "",
    }))

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (profileData) {
      setProfile((prev) => ({
        ...prev,
        username: profileData.username || prev.username,
        full_name: profileData.full_name || prev.full_name,
      }))
    }

    const { data: prefData } = await supabase
      .from("email_preferences")
      .select("*")
      .eq("id", user.id)
      .single()

    if (prefData) {
      setPreferences({
        product_updates: prefData.product_updates,
        renewal_reminders: prefData.renewal_reminders,
        promotional_emails: prefData.promotional_emails,
        weekly_digest: prefData.weekly_digest,
      })
    }

    setIsLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSavingProfile(true)

    const res = await fetch("/api/settings/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: profile.username,
        full_name: profile.full_name,
      }),
    })

    setIsSavingProfile(false)

    if (res.ok) {
      toast.success("Profile updated successfully")
    } else {
      const data = await res.json()
      toast.error(data.error || "Failed to update profile")
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters")
      return
    }

    setIsSavingPassword(true)

    const res = await fetch("/api/settings/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    })

    setIsSavingPassword(false)

    if (res.ok) {
      toast.success("Password changed successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } else {
      const data = await res.json()
      toast.error(data.error || "Failed to change password")
    }
  }

  async function handlePreferencesSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSavingPreferences(true)

    const res = await fetch("/api/settings/email-preferences", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preferences),
    })

    setIsSavingPreferences(false)

    if (res.ok) {
      toast.success("Email preferences updated successfully")
    } else {
      const data = await res.json()
      toast.error(data.error || "Failed to update email preferences")
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "profile", label: "Profile" },
    { id: "account", label: "Account" },
    { id: "appearance", label: "Appearance" },
    { id: "notifications", label: "Notifications" },
    { id: "billing", label: "Billing" },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and email preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 pl-4">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  This is how others will see you on the site.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, username: e.target.value }))
                      }
                      placeholder="antigravity"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, full_name: e.target.value }))
                      }
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profile.email}
                      disabled
                      className="opacity-60"
                    />
                    <p className="text-sm text-muted-foreground">
                      Email cannot be changed.
                    </p>
                  </div>
                  <Button type="submit" disabled={isSavingProfile}>
                    {isSavingProfile ? "Saving..." : "Update profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "account" && (
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Manage your account security settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="current_password">Current Password</Label>
                    <Input
                      id="current_password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new_password">New Password</Label>
                    <Input
                      id="new_password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm_password">Confirm New Password</Label>
                    <Input
                      id="confirm_password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isSavingPassword}>
                    {isSavingPassword ? "Changing..." : "Change password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "appearance" && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the app looks for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Appearance settings are managed through your system preferences.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Manage your email notification preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="product_updates"
                      checked={preferences.product_updates}
                      onCheckedChange={(checked) =>
                        setPreferences((prev) => ({
                          ...prev,
                          product_updates: checked === true,
                        }))
                      }
                    />
                    <div className="grid gap-1">
                      <Label htmlFor="product_updates">Product Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and improvements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="renewal_reminders"
                      checked={preferences.renewal_reminders}
                      onCheckedChange={(checked) =>
                        setPreferences((prev) => ({
                          ...prev,
                          renewal_reminders: checked === true,
                        }))
                      }
                    />
                    <div className="grid gap-1">
                      <Label htmlFor="renewal_reminders">Renewal Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get reminded before your subscriptions renew.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="promotional_emails"
                      checked={preferences.promotional_emails}
                      onCheckedChange={(checked) =>
                        setPreferences((prev) => ({
                          ...prev,
                          promotional_emails: checked === true,
                        }))
                      }
                    />
                    <div className="grid gap-1">
                      <Label htmlFor="promotional_emails">Promotional Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive promotional offers and discounts.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="weekly_digest"
                      checked={preferences.weekly_digest}
                      onCheckedChange={(checked) =>
                        setPreferences((prev) => ({
                          ...prev,
                          weekly_digest: checked === true,
                        }))
                      }
                    />
                    <div className="grid gap-1">
                      <Label htmlFor="weekly_digest">Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Get a weekly summary of your subscriptions.
                      </p>
                    </div>
                  </div>
                  <Button type="submit" disabled={isSavingPreferences}>
                    {isSavingPreferences ? "Saving..." : "Save preferences"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "billing" && <BillingTab />}
        </div>
      </div>
    </div>
  )
}
