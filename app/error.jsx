"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Global error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md p-8 rounded-lg border bg-card text-card-foreground shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="mb-6 text-muted-foreground">
          We apologize for the inconvenience. An error has occurred while loading this page.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
