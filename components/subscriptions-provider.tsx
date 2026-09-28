"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'

export type Subscription = {
  id: string
  name: string
  price: number
  status: "active" | "canceled" | "past_due"
  category: string
  renewalDate: string
}

type SubscriptionsContextType = {
  subscriptions: Subscription[]
  addSubscription: (sub: Omit<Subscription, "id">) => Promise<void>
  editSubscription: (id: string, sub: Partial<Omit<Subscription, "id">>) => Promise<void>
  removeSubscription: (id: string) => Promise<void>
  isLoading: boolean
}

const SubscriptionsContext = createContext<SubscriptionsContextType | undefined>(undefined)

export function SubscriptionsProvider({ children }: { children: React.ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const fetchSubscriptions = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (!error && data) {
      setSubscriptions(
        data.map(sub => ({
          id: sub.id,
          name: sub.name,
          price: sub.price,
          status: sub.status,
          category: sub.category,
          renewalDate: sub.renewal_date,
        }))
      )
    }
    setIsLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchSubscriptions()
  }, [fetchSubscriptions])

  const addSubscription = async (sub: Omit<Subscription, "id">) => {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return

    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userData.user.id,
        name: sub.name,
        price: sub.price,
        status: sub.status,
        category: sub.category,
        renewal_date: sub.renewalDate,
      })
      .select()
      .single()

    if (!error && data) {
      const newSub = {
        id: data.id,
        name: data.name,
        price: data.price,
        status: data.status,
        category: data.category,
        renewalDate: data.renewal_date,
      }
      setSubscriptions(prev => [newSub, ...prev])
    }
  }

  const removeSubscription = async (id: string) => {
    const { error } = await supabase.from('subscriptions').delete().eq('id', id)
    if (!error) {
      setSubscriptions(prev => prev.filter(sub => sub.id !== id))
    }
  }

  const editSubscription = async (id: string, sub: Partial<Omit<Subscription, "id">>) => {
    const updates: any = {}
    if (sub.name !== undefined) updates.name = sub.name
    if (sub.price !== undefined) updates.price = sub.price
    if (sub.status !== undefined) updates.status = sub.status
    if (sub.category !== undefined) updates.category = sub.category
    if (sub.renewalDate !== undefined) updates.renewal_date = sub.renewalDate

    const { error } = await supabase.from('subscriptions').update(updates).eq('id', id)
    if (!error) {
      setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, ...sub } : s))
    }
  }

  return (
    <SubscriptionsContext.Provider value={{ subscriptions, addSubscription, editSubscription, removeSubscription, isLoading }}>
      {children}
    </SubscriptionsContext.Provider>
  )
}

export function useSubscriptions() {
  const context = useContext(SubscriptionsContext)
  if (!context) {
    throw new Error("useSubscriptions must be used within a SubscriptionsProvider")
  }
  return context
}
