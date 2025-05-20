"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimpleChart } from "@/components/ui/simple-chart"
import { ErrorBoundaryWrapper } from "@/components/error-boundary-wrapper"

// Mock data for charts
const mockWeightData = [180, 178, 176, 175, 173, 172, 170, 169, 168, 167]
const mockNutritionData = [1800, 2100, 1950, 2200, 2000, 1900, 2150, 2050, 2100, 2150]
const mockWorkoutData = [30, 45, 60, 30, 45, 60, 75, 45, 60, 45]
const mockSleepData = [6.5, 7, 7.5, 6, 8, 7, 7.5, 8, 7.5, 7]
const dateLabels = ["Jan 1", "Jan 5", "Jan 10", "Jan 15", "Jan 20", "Jan 25", "Feb 1", "Feb 5", "Feb 10", "Feb 15"]

export default function ProgressPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <ProgressSkeleton />
  }

  return (
    <ErrorBoundaryWrapper>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Progress Tracking</h2>
          <p className="text-muted-foreground">Monitor your health and fitness progress over time</p>
        </div>

        <GoalProgressCards />

        <Tabs defaultValue="weight" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
          </TabsList>

          <TabsContent value="weight" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weight Progress</CardTitle>
                <CardDescription>Track your weight changes over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <SimpleChart
                  data={mockWeightData}
                  height={350}
                  color="#3b82f6"
                  title="Weight (lbs)"
                  yAxisLabel="Weight (lbs)"
                  xAxisLabels={dateLabels}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Progress</CardTitle>
                <CardDescription>Track your nutritional intake over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <SimpleChart
                  data={mockNutritionData}
                  height={350}
                  color="#10b981"
                  title="Calories (kcal)"
                  yAxisLabel="Calories"
                  xAxisLabels={dateLabels}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workouts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Workout Progress</CardTitle>
                <CardDescription>Track your workout performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <SimpleChart
                  data={mockWorkoutData}
                  height={350}
                  color="#f59e0b"
                  title="Workout Duration (min)"
                  yAxisLabel="Minutes"
                  xAxisLabels={dateLabels}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sleep" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sleep Progress</CardTitle>
                <CardDescription>Track your sleep patterns over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <SimpleChart
                  data={mockSleepData}
                  height={350}
                  color="#8b5cf6"
                  title="Sleep Duration (hrs)"
                  yAxisLabel="Hours"
                  xAxisLabels={dateLabels}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundaryWrapper>
  )
}

function ProgressSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-64 bg-muted rounded mb-2"></div>
        <div className="h-4 w-96 bg-muted rounded"></div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="h-10 w-64 bg-muted rounded"></div>
        <div className="h-[400px] bg-muted rounded-lg"></div>
      </div>
    </div>
  )
}

function GoalProgressCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Weight Goal</CardDescription>
          <CardTitle className="text-2xl">167 / 165 lbs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div className="bg-primary h-full" style={{ width: "90%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">90% to goal</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Activity Goal</CardDescription>
          <CardTitle className="text-2xl">305 / 300 min</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div className="bg-primary h-full" style={{ width: "102%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Goal achieved!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Water Goal</CardDescription>
          <CardTitle className="text-2xl">2.1 / 2.5 L</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div className="bg-primary h-full" style={{ width: "84%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">84% to goal</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Sleep Goal</CardDescription>
          <CardTitle className="text-2xl">7.4 / 8 hrs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div className="bg-primary h-full" style={{ width: "92.5%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">92.5% to goal</p>
        </CardContent>
      </Card>
    </div>
  )
}
