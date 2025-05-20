"use client"

import { useState, useEffect } from "react"

export function Logo({ size = "small" }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Dimensions based on size prop
  const dimensions = size === "small" ? { width: 24, height: 24 } : { width: 400, height: 400 }

  useEffect(() => {
    // Preload the image
    const img = new Image()
    img.src = "/health-tech-logo.png"
    img.onload = () => setImageLoaded(true)
    img.onerror = () => setImageError(true)
  }, [])

  if (imageError) {
    // Fallback to a simple colored div with text
    return (
      <div
        className={`flex items-center justify-center bg-primary text-primary-foreground rounded-full`}
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <span className={`font-bold ${size === "small" ? "text-xs" : "text-xl"}`}>HT</span>
      </div>
    )
  }

  return (
    <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
      {!imageLoaded && (
        <div
          className="absolute inset-0 bg-muted animate-pulse rounded-full"
          style={{ width: dimensions.width, height: dimensions.height }}
        />
      )}
      <img
        src="/health-tech-logo.png"
        alt="HealthTrackr Logo"
        width={dimensions.width}
        height={dimensions.height}
        className={`object-contain ${imageLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  )
}
