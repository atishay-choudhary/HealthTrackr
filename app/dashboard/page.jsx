"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"
import dynamic from "next/dynamic"
import { Icons } from "@/components/ui/icons"

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
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
              <SafeComponent component="WaterIntakeCard" />
            </ErrorBoundary>
            <ErrorBoundary fallback={<CardSkeleton />}>
              <SafeComponent component="SleepQualityCard" />
            </ErrorBoundary>
            <ErrorBoundary fallback={<CardSkeleton />}>
              <SafeComponent component="StreakCard" />
            </ErrorBoundary>
            <ErrorBoundary fallback={<CardSkeleton />}>
              <SafeComponent component="WellnessTipCard" />
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
                  <SafeComponent component="HealthMetricsChart" />
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
            <SafeComponent component="NutritionSummaryCard" />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <ErrorBoundary fallback={<CardSkeleton height="400px" />}>
            <SafeComponent component="ActivitySummaryCard" />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-4">
          <ErrorBoundary fallback={<CardSkeleton height="400px" />}>
            <SafeComponent component="SleepQualityCard" detailed={true} />
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Safe component loader
function SafeComponent({ component, ...props }) {
  const components = {
    WaterIntakeCard: dynamic(
      () => import("@/components/dashboard/water-intake-card").then((mod) => mod.WaterIntakeCard),
      {
        ssr: false,
        loading: () => <CardSkeleton />,
      },
    ),
    SleepQualityCard: dynamic(
      () => import("@/components/dashboard/sleep-quality-card").then((mod) => mod.SleepQualityCard),
      {
        ssr: false,
        loading: () => <CardSkeleton />,
      },
    ),
    StreakCard: dynamic(() => import("@/components/dashboard/streak-card").then((mod) => mod.StreakCard), {
      ssr: false,
      loading: () => <CardSkeleton />,
    }),
    WellnessTipCard: dynamic(
      () => import("@/components/dashboard/wellness-tip-card").then((mod) => mod.WellnessTipCard),
      {
        ssr: false,
        loading: () => <CardSkeleton />,
      },
    ),
    HealthMetricsChart: dynamic(
      () => import("@/components/dashboard/health-metrics-chart").then((mod) => mod.HealthMetricsChart),
      {
        ssr: false,
        loading: () => <div className="h-[300px] flex items-center justify-center">Loading chart...</div>,
      },
    ),
    NutritionSummaryCard: dynamic(
      () => import("@/components/dashboard/nutrition-summary-card").then((mod) => mod.NutritionSummaryCard),
      {
        ssr: false,
        loading: () => <CardSkeleton height="400px" />,
      },
    ),
    ActivitySummaryCard: dynamic(
      () => import("@/components/dashboard/activity-summary-card").then((mod) => mod.ActivitySummaryCard),
      {
        ssr: false,
        loading: () => <CardSkeleton height="400px" />,
      },
    ),
  }

  const Component = components[component]
  if (!Component) return null

  return <Component {...props} />
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
