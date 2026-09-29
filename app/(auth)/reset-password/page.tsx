import { Suspense } from "react"
import ResetPasswordForm from "./reset-password-form"

export const metadata = {
  title: "Reset Password",
  description: "Set a new password for your account",
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
