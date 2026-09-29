"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import { useSubscriptions } from '@/components/subscriptions-provider'

type AddSubscriptionStepProps = {
  onNext: () => void
  onBack: () => void
  onSkip: () => void
}

const POPULAR_SUBSCRIPTIONS = [
  { name: 'Netflix', price: 15.99, category: 'Entertainment' },
  { name: 'Spotify', price: 9.99, category: 'Music' },
  { name: 'iCloud', price: 2.99, category: 'Cloud' },
  { name: 'Xbox Game Pass', price: 14.99, category: 'Gaming' },
]

function getDefaultRenewalDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toISOString().split('T')[0]
}

export function AddSubscriptionStep({ onNext, onBack, onSkip }: AddSubscriptionStepProps) {
  const { addSubscription } = useSubscriptions()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [renewalDate, setRenewalDate] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!name || !price) return
    setIsSaving(true)
    await addSubscription({
      name,
      price: parseFloat(price),
      status: 'active',
      category: category || 'Other',
      renewalDate: renewalDate || getDefaultRenewalDate(),
    })
    setIsSaving(false)
    onNext()
  }

  const handleQuickAdd = async (sub: { name: string; price: number; category: string }) => {
    setIsSaving(true)
    await addSubscription({
      name: sub.name,
      price: sub.price,
      status: 'active',
      category: sub.category,
      renewalDate: getDefaultRenewalDate(),
    })
    setIsSaving(false)
    onNext()
  }

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Add your first subscription or pick a popular one:</p>
        <div className="grid grid-cols-2 gap-2">
          {POPULAR_SUBSCRIPTIONS.map((sub) => (
            <button
              key={sub.name}
              onClick={() => handleQuickAdd(sub)}
              disabled={isSaving}
              className="flex items-center gap-2 p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-accent hover:border-emerald-500/30 transition-all text-left group"
            >
              <Plus className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
              <div>
                <p className="text-sm font-medium">{sub.name}</p>
                <p className="text-xs text-muted-foreground">${sub.price}/mo</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or add your own</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="sub-name" className="text-xs font-medium">Name</Label>
            <Input
              id="sub-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Netflix"
              className="bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500 h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sub-price" className="text-xs font-medium">Price ($/mo)</Label>
            <Input
              id="sub-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="15.99"
              className="bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500 h-9"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="sub-category" className="text-xs font-medium">Category</Label>
            <Input
              id="sub-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Entertainment"
              className="bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500 h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sub-date" className="text-xs font-medium">Next renewal</Label>
            <Input
              id="sub-date"
              type="date"
              value={renewalDate}
              onChange={(e) => setRenewalDate(e.target.value)}
              className="bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500 h-9"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onSkip} className="text-muted-foreground">
            Skip
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name || !price || isSaving}
            className="btn-gradient glow-hover rounded-full px-6"
          >
            {isSaving ? 'Adding...' : 'Add & Continue'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
