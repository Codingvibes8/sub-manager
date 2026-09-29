"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'

export type TeamRole = "admin" | "member" | "viewer"

export type TeamMember = {
  id: string
  team_id: string
  user_id: string
  role: TeamRole
  joined_at: string
  profiles: {
    full_name: string | null
    avatar_url: string | null
    username: string | null
  } | null
}

export type TeamInvite = {
  id: string
  team_id: string
  email: string
  role: TeamRole
  token: string
  invited_by: string
  expires_at: string
  created_at: string
}

export type Team = {
  id: string
  name: string
  owner_id: string
  plan: "free" | "team"
  created_at: string
}

type TeamContextType = {
  team: Team | null
  members: TeamMember[]
  invites: TeamInvite[]
  isLoading: boolean
  userRole: TeamRole | null
  isOwner: boolean
  refreshTeam: () => Promise<void>
  inviteMember: (email: string, role: TeamRole) => Promise<{ error?: string }>
  updateMemberRole: (memberId: string, role: TeamRole) => Promise<{ error?: string }>
  removeMember: (memberId: string) => Promise<{ error?: string }>
  cancelInvite: (inviteId: string) => Promise<{ error?: string }>
}

const TeamContext = createContext<TeamContextType | undefined>(undefined)

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [team, setTeam] = useState<Team | null>(null)
  const [members, setMembers] = useState<TeamMember[]>([])
  const [invites, setInvites] = useState<TeamInvite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<TeamRole | null>(null)
  const supabase = createClient()

  const fetchTeam = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .single()

    if (!error && data) {
      setTeam(data)

      const { data: memberData } = await supabase
        .from("team_members")
        .select("*, profiles(full_name, avatar_url, username)")
        .eq("team_id", data.id)

      if (memberData) {
        setMembers(memberData)
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const myMember = memberData.find((m: TeamMember) => m.user_id === user.id)
          if (myMember) {
            setUserRole(myMember.role)
          }
        }
      }

      const { data: inviteData } = await supabase
        .from("team_invites")
        .select("*")
        .eq("team_id", data.id)
        .order("created_at", { ascending: false })

      if (inviteData) {
        setInvites(inviteData)
      }
    }
    setIsLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchTeam()
  }, [fetchTeam])

  const inviteMember = async (email: string, role: TeamRole) => {
    const { error } = await supabase.from("team_invites").insert({
      team_id: team!.id,
      email,
      role,
    })

    if (error) {
      return { error: error.message }
    }

    await fetchTeam()
    return {}
  }

  const updateMemberRole = async (memberId: string, role: TeamRole) => {
    const { error } = await supabase
      .from("team_members")
      .update({ role })
      .eq("id", memberId)

    if (error) {
      return { error: error.message }
    }

    await fetchTeam()
    return {}
  }

  const removeMember = async (memberId: string) => {
    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("id", memberId)

    if (error) {
      return { error: error.message }
    }

    await fetchTeam()
    return {}
  }

  const cancelInvite = async (inviteId: string) => {
    const { error } = await supabase
      .from("team_invites")
      .delete()
      .eq("id", inviteId)

    if (error) {
      return { error: error.message }
    }

    await fetchTeam()
    return {}
  }

  const isOwner = team?.owner_id !== undefined && userRole === "admin"

  return (
    <TeamContext.Provider
      value={{
        team,
        members,
        invites,
        isLoading,
        userRole,
        isOwner,
        refreshTeam: fetchTeam,
        inviteMember,
        updateMemberRole,
        removeMember,
        cancelInvite,
      }}
    >
      {children}
    </TeamContext.Provider>
  )
}

export function useTeam() {
  const context = useContext(TeamContext)
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider")
  }
  return context
}
