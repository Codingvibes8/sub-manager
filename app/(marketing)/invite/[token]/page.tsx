"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

function AcceptInviteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Invalid invite link")
      return
    }

    const acceptInvite = async () => {
      const res = await fetch("/api/team/accept-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus("error")
        setMessage(data.error || "Failed to accept invitation")
        return
      }

      setStatus("success")
      setMessage("You've been added to the team!")
      toast.success("Welcome to the team!")
      setTimeout(() => router.push("/dashboard/team"), 2000)
    }

    acceptInvite()
  }, [token, router])

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {status === "loading" && <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />}
          {status === "success" && <CheckCircle className="h-12 w-12 mx-auto mb-4 text-emerald-500" />}
          {status === "error" && <XCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />}
          <CardTitle>
            {status === "loading" && "Accepting invitation..."}
            {status === "success" && "Welcome to the team!"}
            {status === "error" && "Invitation failed"}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === "error" && (
            <Button onClick={() => router.push("/dashboard/team")}>
              Go to Dashboard
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <AcceptInviteContent />
    </Suspense>
  )
}
