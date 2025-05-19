"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Mock wellness tips
const wellnessTips = [
  "Try to get at least 7-8 hours of sleep each night to support recovery and overall health.",
  "Stay hydrated by drinking at least 8 glasses of water daily, especially before and after workouts.",
  "Include protein in every meal to support muscle recovery and maintenance.",
  "Take short walking breaks throughout the day if you have a sedentary job.",
  "Practice deep breathing for 5 minutes daily to reduce stress and improve focus.",
  "Aim for at least 30 minutes of moderate exercise most days of the week.",
  "Include a variety of colorful vegetables in your diet to ensure you get a range of nutrients.",
  "Consider meal prepping on weekends to make healthy eating easier during busy weekdays.",
  "Stretch for 10 minutes daily to improve flexibility and reduce injury risk.",
  "Take time to unplug from technology at least one hour before bedtime for better sleep quality.",
]

export function WellnessTipCard() {
  const [currentTip, setCurrentTip] = useState(wellnessTips[0])
  const [isLoading, setIsLoading] = useState(false)

  const getNewTip = () => {
    setIsLoading(true)

    // Simulate API call for a new tip
    setTimeout(() => {
      const randomTip = wellnessTips[Math.floor(Math.random() * wellnessTips.length)]
      setCurrentTip(randomTip)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Wellness Tip</CardTitle>
        <CardDescription>AI-generated health advice</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-2 min-h-[100px]">
          <p className="text-center text-sm">{currentTip}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" size="sm" onClick={getNewTip} disabled={isLoading}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
          {isLoading ? "Loading..." : "New Tip"}
        </Button>
      </CardFooter>
    </Card>
  )
}
