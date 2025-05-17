"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeDebugger() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-card p-4 rounded-lg shadow-lg border">
      <div className="mb-2">
        <strong>Current Theme:</strong> {theme}
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setTheme("light")}>
          Force Light
        </Button>
        <Button size="sm" onClick={() => setTheme("dark")}>
          Force Dark
        </Button>
        <Button size="sm" onClick={() => setTheme("system")}>
          Force System
        </Button>
      </div>
    </div>
  )
}
