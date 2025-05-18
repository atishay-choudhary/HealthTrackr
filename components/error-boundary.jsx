"use client"

import { Component } from "react"

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Something went wrong</h3>
          <div className="mt-2 text-sm text-red-700 dark:text-red-300">
            <p>An error occurred while rendering this component.</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
