import { Suspense } from "react"
import ForgotPasswordForm from "./forgot-password-form"

export const metadata = {
  title: "Forgot Password",
  description: "Reset your account password",
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
      <ForgotPasswordForm />
    </Suspense>
  )
}
