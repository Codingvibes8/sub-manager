"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSubscriptions } from "@/components/subscriptions-provider"

export function AddSubscriptionDialog() {
  const { addSubscription } = useSubscriptions()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [renewalDate, setRenewalDate] = useState('')

  const handleSave = () => {
    addSubscription({
      name,
      price: parseFloat(price) || 0,
      status: "active",
      category,
      renewalDate
    })
    setOpen(false)
    setName('')
    setPrice('')
    setCategory('')
    setRenewalDate('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-gradient glow-hover rounded-full px-6">
          <Plus className="mr-2 h-4 w-4" /> Add Subscription
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-panel border-emerald-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">Add Subscription</DialogTitle>
          <DialogDescription className="text-emerald-500/70 dark:text-emerald-400/70">
            Enter the details for your new subscription.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Name
            </label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3 bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500 transition-all duration-300" placeholder="Netflix" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="price" className="text-right text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Price
            </label>
            <Input id="price" type="number" value={price} onChange={e => setPrice(e.target.value)} className="col-span-3 bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500 transition-all duration-300" placeholder="19.99" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="category" className="text-right text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Category
            </label>
            <Input id="category" value={category} onChange={e => setCategory(e.target.value)} className="col-span-3 bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500 transition-all duration-300" placeholder="Entertainment" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="date" className="text-right text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Next Renewal
            </label>
            <Input id="date" type="date" value={renewalDate} onChange={e => setRenewalDate(e.target.value)} className="col-span-3 bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500 transition-all duration-300" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="btn-gradient glow-hover rounded-full px-8">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
