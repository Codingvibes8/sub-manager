import { Suspense } from "react"
import LoginForm from "./login-form"

export const metadata = {
  title: "Login",
  description: "Login to your account",
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
      <LoginForm initialMessage={(await searchParams).message} />
    </Suspense>
  )
}