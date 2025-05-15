import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarIcon, PlusCircle } from "lucide-react"
import Link from "next/link"
import { HealthMetricsChart } from "@/components/dashboard/health-metrics-chart"
import { WaterIntakeCard } from "@/components/dashboard/water-intake-card"
import { SleepQualityCard } from "@/components/dashboard/sleep-quality-card"
import { ActivitySummaryCard } from "@/components/dashboard/activity-summary-card"
import { NutritionSummaryCard } from "@/components/dashboard/nutrition-summary-card"
import { WellnessTipCard } from "@/components/dashboard/wellness-tip-card"
import { StreakCard } from "@/components/dashboard/streak-card"

export default function DashboardPage() {
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
              <PlusCircle className="mr-2 h-4 w-4" />
              Log Entry
            </Button>
          </Link>
          <Link href="/dashboard/calendar">
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
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
            <WaterIntakeCard />
            <SleepQualityCard />
            <StreakCard />
            <WellnessTipCard />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
                <CardDescription>Your health metrics over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <HealthMetricsChart />
              </CardContent>
            </Card>

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
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <NutritionSummaryCard />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <ActivitySummaryCard />
        </TabsContent>

        <TabsContent value="sleep" className="space-y-4">
          <SleepQualityCard detailed />
        </TabsContent>
      </Tabs>
    </div>
  )
}
