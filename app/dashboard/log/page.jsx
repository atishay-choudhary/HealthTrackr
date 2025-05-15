"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { FoodEntryForm } from "@/components/forms/food-entry-form"
import { WaterEntryForm } from "@/components/forms/water-entry-form"
import { WorkoutEntryForm } from "@/components/forms/workout-entry-form"
import { SleepEntryForm } from "@/components/forms/sleep-entry-form"
import { MoodEntryForm } from "@/components/forms/mood-entry-form"

export default function LogEntryPage() {
  const [activeTab, setActiveTab] = useState("food")
  const { toast } = useToast()

  const handleSubmit = (data) => {
    // This would be replaced with actual data submission logic
    console.log("Submitting data:", data)

    toast({
      title: "Entry logged successfully",
      description: `Your ${activeTab} entry has been saved.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Log Health Data</h2>
        <p className="text-muted-foreground">Track your daily health metrics to monitor your progress.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Entry</CardTitle>
          <CardDescription>Select a category and enter your health data</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="water">Water</TabsTrigger>
              <TabsTrigger value="workout">Workout</TabsTrigger>
              <TabsTrigger value="sleep">Sleep</TabsTrigger>
              <TabsTrigger value="mood">Mood</TabsTrigger>
            </TabsList>

            <TabsContent value="food">
              <FoodEntryForm onSubmit={handleSubmit} />
            </TabsContent>

            <TabsContent value="water">
              <WaterEntryForm onSubmit={handleSubmit} />
            </TabsContent>

            <TabsContent value="workout">
              <WorkoutEntryForm onSubmit={handleSubmit} />
            </TabsContent>

            <TabsContent value="sleep">
              <SleepEntryForm onSubmit={handleSubmit} />
            </TabsContent>

            <TabsContent value="mood">
              <MoodEntryForm onSubmit={handleSubmit} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
