"use client"

import { useState, useEffect } from "react"

export function HealthMetricsChart() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="animate-pulse w-full h-full bg-muted rounded"></div>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <div className="flex h-full flex-col">
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm">Water</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Activity</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-sm">Sleep</span>
          </div>
        </div>
        <div className="flex-1 relative">
          {/* Simplified chart visualization */}
          <div className="absolute inset-0 flex items-end justify-between px-2">
            {[65, 80, 60, 90, 75, 85, 70].map((value, index) => (
              <div key={index} className="flex flex-col items-center w-8">
                <div className="w-full bg-blue-500 rounded-t" style={{ height: `${value * 0.4}px` }}></div>
                <div className="text-xs mt-1">{`Day ${index + 1}`}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
