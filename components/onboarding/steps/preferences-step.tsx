"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, ArrowRight, Bell, Mail, Megaphone, BarChart3 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

type PreferencesStepProps = {
  onNext: () => void
  onBack: () => void
}

export function PreferencesStep({ onNext, onBack }: PreferencesStepProps) {
  const [preferences, setPreferences] = useState({
    renewal_reminders: true,
    weekly_digest: true,
    product_updates: false,
    promotional_emails: false,
  })
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function loadPreferences() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) return

      const { data: prefs } = await supabase
        .from('email_preferences')
        .select('*')
        .eq('id', userData.user.id)
        .single()

      if (prefs) {
        setPreferences({
          renewal_reminders: prefs.renewal_reminders ?? true,
          weekly_digest: prefs.weekly_digest ?? true,
          product_updates: prefs.product_updates ?? false,
          promotional_emails: prefs.promotional_emails ?? false,
        })
      }
    }
    loadPreferences()
  }, [supabase])

  const handleSave = async () => {
    setIsSaving(true)
    const { data: userData } = await supabase.auth.getUser()
    if (userData.user) {
      await supabase
        .from('email_preferences')
        .upsert({
          id: userData.user.id,
          ...preferences,
          updated_at: new Date().toISOString(),
        })
    }
    setIsSaving(false)
    onNext()
  }

  const togglePref = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 pb-2">
        <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <Bell className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <p className="text-sm font-medium">Notification preferences</p>
          <p className="text-xs text-muted-foreground">Choose what you want to hear about</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-background/50">
          <Checkbox
            id="renewal_reminders"
            checked={preferences.renewal_reminders}
            onCheckedChange={() => togglePref('renewal_reminders')}
            className="mt-0.5"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-emerald-500" />
              <label htmlFor="renewal_reminders" className="text-sm font-medium cursor-pointer">
                Renewal reminders
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Get notified before your subscriptions renew so you can cancel if needed
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-background/50">
          <Checkbox
            id="weekly_digest"
            checked={preferences.weekly_digest}
            onCheckedChange={() => togglePref('weekly_digest')}
            className="mt-0.5"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-emerald-500" />
              <label htmlFor="weekly_digest" className="text-sm font-medium cursor-pointer">
                Weekly digest
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              A weekly summary of your spending and upcoming renewals
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-background/50">
          <Checkbox
            id="product_updates"
            checked={preferences.product_updates}
            onCheckedChange={() => togglePref('product_updates')}
            className="mt-0.5"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-500" />
              <label htmlFor="product_updates" className="text-sm font-medium cursor-pointer">
                Product updates
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              News about new features and improvements
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-background/50">
          <Checkbox
            id="promotional_emails"
            checked={preferences.promotional_emails}
            onCheckedChange={() => togglePref('promotional_emails')}
            className="mt-0.5"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-emerald-500" />
              <label htmlFor="promotional_emails" className="text-sm font-medium cursor-pointer">
                Promotional emails
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Special offers and discounts
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleSave} disabled={isSaving} className="btn-gradient glow-hover rounded-full px-6">
          {isSaving ? 'Saving...' : 'Continue'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
