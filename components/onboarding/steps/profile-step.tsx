"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, User } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

type ProfileStepProps = {
  onNext: () => void
  onBack: () => void
}

export function ProfileStep({ onNext, onBack }: ProfileStepProps) {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function loadProfile() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, username')
        .eq('id', userData.user.id)
        .single()

      if (profile) {
        setFullName(profile.full_name || '')
        setUsername(profile.username || '')
      }

      if (userData.user.user_metadata?.full_name) {
        setFullName(prev => prev || userData.user.user_metadata.full_name)
      }
      if (userData.user.user_metadata?.preferred_username) {
        setUsername(prev => prev || userData.user.user_metadata.preferred_username)
      }
    }
    loadProfile()
  }, [supabase])

  const handleSave = async () => {
    setIsSaving(true)
    const { data: userData } = await supabase.auth.getUser()
    if (userData.user) {
      await supabase
        .from('profiles')
        .upsert({
          id: userData.user.id,
          full_name: fullName || null,
          username: username || null,
          updated_at: new Date().toISOString(),
        })
    }
    setIsSaving(false)
    onNext()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-2">
        <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <User className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <p className="text-sm font-medium">Set up your profile</p>
          <p className="text-xs text-muted-foreground">This helps personalize your experience</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium">
            Full name
          </Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium">
            Username
          </Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe"
            className="bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500"
          />
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
