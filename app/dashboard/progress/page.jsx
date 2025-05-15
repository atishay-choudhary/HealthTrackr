import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeightProgressChart } from "@/components/dashboard/weight-progress-chart"
import { NutritionProgressChart } from "@/components/dashboard/nutrition-progress-chart"
import { WorkoutProgressChart } from "@/components/dashboard/workout-progress-chart"
import { SleepProgressChart } from "@/components/dashboard/sleep-progress-chart"
import { GoalProgressCards } from "@/components/dashboard/goal-progress-cards"

export default function ProgressPage() {
  return (
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
              <WeightProgressChart />
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
              <NutritionProgressChart />
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
              <WorkoutProgressChart />
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
              <SleepProgressChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
