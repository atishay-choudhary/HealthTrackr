"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-lg border bg-card text-card-foreground shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="mb-6 text-muted-foreground">
          We apologize for the inconvenience. An error has occurred while loading this page.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
          <Button onClick={() => (window.location.href = "/")} variant="outline">
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
