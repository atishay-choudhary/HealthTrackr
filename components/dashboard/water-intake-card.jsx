"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function WaterIntakeCard() {
  const { toast } = useToast()

  const handleQuickAdd = () => {
    toast({
      title: "Water intake logged",
      description: "Added 250ml of water to your daily intake.",
    })
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Water Intake</CardTitle>
        <CardDescription>Today's hydration</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="relative h-24 w-24">
            <svg className="h-full w-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="#e2e8f0" strokeWidth="10" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#3b82f6"
                strokeWidth="10"
                strokeDasharray="282.7"
                strokeDashoffset="70.7"
                transform="rotate(-90 50 50)"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">75%</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">1.5 / 2.0 L</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" size="sm" onClick={handleQuickAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Quick Add
        </Button>
      </CardFooter>
    </Card>
  )
}
