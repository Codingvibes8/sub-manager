"use client"

import React from "react"
import { useOnboarding } from "./onboarding-provider"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { WelcomeStep } from "./steps/welcome-step"
import { ProfileStep } from "./steps/profile-step"
import { AddSubscriptionStep } from "./steps/add-subscription-step"
import { PreferencesStep } from "./steps/preferences-step"
import { CompleteStep } from "./steps/complete-step"

const STEPS = [
  { id: "welcome", title: "Welcome" },
  { id: "profile", title: "Profile" },
  { id: "subscription", title: "Add Subscription" },
  { id: "preferences", title: "Preferences" },
  { id: "complete", title: "All Set" },
]

export function OnboardingWizard() {
  const { showOnboarding, currentStep, setCurrentStep, completeOnboarding, skipOnboarding } = useOnboarding()

  if (!showOnboarding) return null

  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    skipOnboarding()
  }

  const handleComplete = () => {
    completeOnboarding()
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={goNext} onSkip={handleSkip} />
      case 1:
        return <ProfileStep onNext={goNext} onBack={goBack} />
      case 2:
        return <AddSubscriptionStep onNext={goNext} onBack={goBack} onSkip={handleSkip} />
      case 3:
        return <PreferencesStep onNext={goNext} onBack={goBack} />
      case 4:
        return <CompleteStep onComplete={handleComplete} />
      default:
        return null
    }
  }

  return (
    <Dialog open={showOnboarding} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-[500px] glass-panel border-emerald-500/20 p-0 gap-0 overflow-hidden"
        showCloseButton={false}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div className="flex items-center gap-1.5">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index <= currentStep
                    ? "bg-emerald-500 w-8"
                    : "bg-muted w-4"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {currentStep + 1} of {STEPS.length}
          </span>
        </div>

        <div className="px-6 pb-2 pt-2">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gradient">
              {STEPS[currentStep].title}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 pt-2 min-h-[300px]">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
