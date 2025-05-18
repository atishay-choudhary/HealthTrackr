"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({})

export function ThemeProvider({ children, defaultTheme = "dark", storageKey = "ui-theme", ...props }) {
  const [theme, setTheme] = useState(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Only run this effect on the client
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem(storageKey)
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      localStorage.setItem(storageKey, defaultTheme)
    }
  }, [defaultTheme, storageKey])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme, mounted])

  const value = {
    theme,
    setTheme: (newTheme) => {
      setTheme(newTheme)
      try {
        localStorage.setItem(storageKey, newTheme)
      } catch (e) {
        console.error("Failed to save theme preference", e)
      }
    },
  }

  // Avoid rendering theme-dependent content until mounted
  // This prevents hydration mismatch
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
