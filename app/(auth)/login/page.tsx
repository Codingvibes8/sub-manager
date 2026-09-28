import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export const metadata = {
  title: "Login",
  description: "Login to your account",
}

export default async function LoginPage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <form className="flex w-full max-w-sm flex-col gap-4 border p-8 rounded-lg shadow-sm">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to sign in
          </p>
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="email">Email</label>
          <Input id="email" name="email" type="email" required />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="password">Password</label>
          <Input id="password" name="password" type="password" required />
        </div>

        <Button formAction={login} className="w-full">
          Sign In
        </Button>
        <Button formAction={signup} variant="outline" className="w-full">
          Sign Up
        </Button>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-red-100 text-red-700 text-center rounded">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
