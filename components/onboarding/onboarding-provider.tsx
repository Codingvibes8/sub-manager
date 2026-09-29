"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ONBOARDING_KEY = 'submanager_onboarding_completed'

type OnboardingContextType = {
  isComplete: boolean
  isLoading: boolean
  showOnboarding: boolean
  currentStep: number
  openOnboarding: () => void
  completeOnboarding: () => void
  skipOnboarding: () => void
  setCurrentStep: (step: number) => void
  resetOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isComplete, setIsComplete] = useState(() => {
    if (typeof window === 'undefined') return true
    return localStorage.getItem(ONBOARDING_KEY) === 'true'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const openOnboarding = useCallback(() => {
    setCurrentStep(0)
    setIsComplete(false)
  }, [])

  const completeOnboarding = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    setIsComplete(true)
  }, [])

  const skipOnboarding = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    setIsComplete(true)
  }, [])

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(ONBOARDING_KEY)
    setIsComplete(false)
    setCurrentStep(0)
  }, [])

  const showOnboarding = !isLoading && !isComplete

  return (
    <OnboardingContext.Provider
      value={{
        isComplete,
        isLoading,
        showOnboarding,
        currentStep,
        openOnboarding,
        completeOnboarding,
        skipOnboarding,
        setCurrentStep,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}
