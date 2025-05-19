"use client"

import { useEffect, useState } from "react"
import { ErrorBoundary } from "@/components/error-boundary"

export function ErrorBoundaryWrapper({ children }) {
  const [mounted, setMounted] = useState(false)

  // Only render children after component has mounted to avoid hydration issues
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="p-4 rounded-md bg-muted animate-pulse">
        <div className="h-8 w-64 bg-muted-foreground/20 rounded mb-4"></div>
        <div className="h-4 w-full bg-muted-foreground/20 rounded mb-2"></div>
        <div className="h-4 w-full bg-muted-foreground/20 rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-muted-foreground/20 rounded"></div>
      </div>
    )
  }

  return <ErrorBoundary>{children}</ErrorBoundary>
}
