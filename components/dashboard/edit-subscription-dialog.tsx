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
import { Input } from "@/components/ui/input"
import { useSubscriptions, type Subscription } from "@/components/subscriptions-provider"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function EditSubscriptionDialog({ subscription }: { subscription: Subscription }) {
  const { editSubscription } = useSubscriptions()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(subscription.name)
  const [price, setPrice] = useState(subscription.price.toString())
  const [category, setCategory] = useState(subscription.category)
  const [renewalDate, setRenewalDate] = useState(subscription.renewalDate)

  const handleSave = () => {
    editSubscription(subscription.id, {
      name,
      price: parseFloat(price) || 0,
      category,
      renewalDate
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit details</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-panel border-emerald-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">Edit Subscription</DialogTitle>
          <DialogDescription className="text-emerald-500/70 dark:text-emerald-400/70">
            Update the details for this subscription.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-name" className="text-right text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Name
            </label>
            <Input id="edit-name" value={name} onChange={e => setName(e.target.value)} className="col-span-3 bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500 transition-all duration-300" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-price" className="text-right text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Price
            </label>
            <Input id="edit-price" type="number" value={price} onChange={e => setPrice(e.target.value)} className="col-span-3 bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500 transition-all duration-300" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-category" className="text-right text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Category
            </label>
            <Input id="edit-category" value={category} onChange={e => setCategory(e.target.value)} className="col-span-3 bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500 transition-all duration-300" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-date" className="text-right text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Next Renewal
            </label>
            <Input id="edit-date" type="date" value={renewalDate} onChange={e => setRenewalDate(e.target.value)} className="col-span-3 bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-500 transition-all duration-300" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="btn-gradient glow-hover rounded-full px-8">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
