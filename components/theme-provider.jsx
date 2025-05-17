"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({})

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }) {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    // Remove all existing theme classes
    root.classList.remove("light", "dark")

    // Add the current theme class
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme) => {
      setTheme(newTheme)
      // Save to localStorage
      try {
        localStorage.setItem(storageKey, newTheme)
      } catch (e) {
        console.error("Failed to save theme preference", e)
      }
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
