"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"
import { Icons } from "@/components/ui/icons"

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Delay setting isLoaded to ensure all client-side code is ready
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500) // Increased delay for better stability

    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, John! Here's your health summary.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/log">
            <Button>
              <Icons.PlusCircle className="mr-2 h-4 w-4" />
              Log Entry
            </Button>
          </Link>
          <Link href="/dashboard/calendar">
            <Button variant="outline">
              <Icons.Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ErrorBoundary fallback={<CardSkeleton />}>
              <SimpleWaterIntakeCard />
            </ErrorBoundary>
            <ErrorBoundary fallback={<CardSkeleton />}>
              <SimpleSleepQualityCard />
            </ErrorBoundary>
            <ErrorBoundary fallback={<CardSkeleton />}>
              <SimpleStreakCard />
            </ErrorBoundary>
            <ErrorBoundary fallback={<CardSkeleton />}>
              <SimpleWellnessTipCard />
            </ErrorBoundary>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <ErrorBoundary fallback={<CardSkeleton className="lg:col-span-4" />}>
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Health Metrics</CardTitle>
                  <CardDescription>Your health metrics over the past 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <SimpleHealthMetricsChart />
                </CardContent>
              </Card>
            </ErrorBoundary>

            <ErrorBoundary fallback={<CardSkeleton className="lg:col-span-3" />}>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Today's Summary</CardTitle>
                  <CardDescription>Your health data for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Calories</p>
                        <p className="text-sm text-muted-foreground">1,800 / 2,200 kcal</p>
                      </div>
                      <div className="h-4 w-40 rounded-full bg-secondary">
                        <div className="h-full w-[75%] rounded-full bg-primary" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Water</p>
                        <p className="text-sm text-muted-foreground">1.5 / 2.5 L</p>
                      </div>
                      <div className="h-4 w-40 rounded-full bg-secondary">
                        <div className="h-full w-[60%] rounded-full bg-blue-500" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Steps</p>
                        <p className="text-sm text-muted-foreground">7,500 / 10,000 steps</p>
                      </div>
                      <div className="h-4 w-40 rounded-full bg-secondary">
                        <div className="h-full w-[75%] rounded-full bg-green-500" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Sleep</p>
                        <p className="text-sm text-muted-foreground">7 / 8 hours</p>
                      </div>
                      <div className="h-4 w-40 rounded-full bg-secondary">
                        <div className="h-full w-[87.5%] rounded-full bg-purple-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ErrorBoundary>
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <ErrorBoundary fallback={<CardSkeleton height="400px" />}>
            <SimpleNutritionSummaryCard />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <ErrorBoundary fallback={<CardSkeleton height="400px" />}>
            <SimpleActivitySummaryCard />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-4">
          <ErrorBoundary fallback={<CardSkeleton height="400px" />}>
            <SimpleSleepQualityCard detailed={true} />
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Simple components that don't rely on external dependencies
function SimpleWaterIntakeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Intake</CardTitle>
        <CardDescription>Today's hydration</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-2">
        <div className="text-3xl font-bold">1.5L</div>
        <p className="text-sm text-muted-foreground">60% of daily goal</p>
        <div className="h-2 w-full rounded-full bg-secondary">
          <div className="h-full w-[60%] rounded-full bg-blue-500" />
        </div>
      </CardContent>
    </Card>
  )
}

function SimpleSleepQualityCard({ detailed = false }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep Quality</CardTitle>
        <CardDescription>Last night's sleep</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-2">
        <div className="text-3xl font-bold">7h 15m</div>
        <p className="text-sm text-muted-foreground">Good quality</p>
        {detailed && (
          <div className="w-full pt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Deep sleep</span>
              <span>2h 30m</span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary mb-3">
              <div className="h-full w-[35%] rounded-full bg-purple-700" />
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Light sleep</span>
              <span>3h 45m</span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary mb-3">
              <div className="h-full w-[52%] rounded-full bg-purple-500" />
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>REM</span>
              <span>1h 00m</span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
              <div className="h-full w-[13%] rounded-full bg-purple-300" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function SimpleStreakCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Streak</CardTitle>
        <CardDescription>Consecutive days active</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-2">
        <div className="text-3xl font-bold">7 Days</div>
        <p className="text-sm text-muted-foreground">Keep it up!</p>
        <div className="flex space-x-1 pt-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-2 w-4 rounded-full bg-green-500" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SimpleWellnessTipCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wellness Tip</CardTitle>
        <CardDescription>Daily health advice</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Try to take short breaks every hour during work to stretch and rest your eyes. This can improve productivity
          and reduce strain.
        </p>
      </CardContent>
    </Card>
  )
}

function SimpleHealthMetricsChart() {
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

function SimpleNutritionSummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrition Summary</CardTitle>
        <CardDescription>Today's nutritional intake</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Macronutrients</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-2 border rounded-md">
                <span className="text-sm font-medium">Protein</span>
                <span className="text-xl font-bold">75g</span>
                <span className="text-xs text-muted-foreground">30%</span>
              </div>
              <div className="flex flex-col items-center p-2 border rounded-md">
                <span className="text-sm font-medium">Carbs</span>
                <span className="text-xl font-bold">225g</span>
                <span className="text-xs text-muted-foreground">45%</span>
              </div>
              <div className="flex flex-col items-center p-2 border rounded-md">
                <span className="text-sm font-medium">Fat</span>
                <span className="text-xl font-bold">55g</span>
                <span className="text-xs text-muted-foreground">25%</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Calories</h4>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Total</p>
                <p className="text-sm text-muted-foreground">1,800 / 2,200 kcal</p>
              </div>
              <div className="h-4 w-40 rounded-full bg-secondary">
                <div className="h-full w-[75%] rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SimpleActivitySummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Summary</CardTitle>
        <CardDescription>Today's physical activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-2 border rounded-md">
              <span className="text-sm font-medium">Steps</span>
              <span className="text-xl font-bold">7,500</span>
              <span className="text-xs text-muted-foreground">75%</span>
            </div>
            <div className="flex flex-col items-center p-2 border rounded-md">
              <span className="text-sm font-medium">Distance</span>
              <span className="text-xl font-bold">5.2km</span>
              <span className="text-xs text-muted-foreground">65%</span>
            </div>
            <div className="flex flex-col items-center p-2 border rounded-md">
              <span className="text-sm font-medium">Calories</span>
              <span className="text-xl font-bold">320</span>
              <span className="text-xs text-muted-foreground">40%</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Active Minutes</h4>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Total</p>
                <p className="text-sm text-muted-foreground">45 / 60 min</p>
              </div>
              <div className="h-4 w-40 rounded-full bg-secondary">
                <div className="h-full w-[75%] rounded-full bg-green-500" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Skeleton components
function CardSkeleton({ className, height }) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="h-5 w-1/3 bg-muted rounded"></div>
        <div className="h-4 w-1/2 bg-muted rounded"></div>
      </CardHeader>
      <CardContent>
        <div className={`flex items-center justify-center ${height ? `h-[${height}]` : "h-[100px]"}`}>
          <div className="h-full w-full bg-muted rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <div className="h-8 w-64 bg-muted rounded mb-2"></div>
          <div className="h-4 w-80 bg-muted rounded"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-10 w-28 bg-muted rounded"></div>
          <div className="h-10 w-28 bg-muted rounded"></div>
        </div>
      </div>

      <div className="h-10 w-80 bg-muted rounded"></div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <CardSkeleton className="lg:col-span-4" height="300px" />
          <CardSkeleton className="lg:col-span-3" height="300px" />
        </div>
      </div>
    </div>
  )
}
