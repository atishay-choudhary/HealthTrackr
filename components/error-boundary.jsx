"use client"

import { Component } from "react"
import { Button } from "@/components/ui/button"

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Something went wrong</h3>
          <div className="mt-4 text-sm text-red-700 dark:text-red-300">
            <p>An error occurred while rendering this component.</p>
          </div>
          <Button
            className="mt-4 bg-red-600 hover:bg-red-700 text-white"
            onClick={() => {
              this.setState({ hasError: false, error: null, errorInfo: null })
              window.location.reload()
            }}
          >
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
