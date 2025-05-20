"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { SimpleChart } from "@/components/ui/simple-chart"
import { ErrorBoundaryWrapper } from "@/components/error-boundary-wrapper"
import { Icons } from "@/components/ui/icons"

// Mock data for charts
const mockNutritionData = [2100, 2200, 1950, 2300, 2150, 2050, 2250, 2100, 2200, 2150, 2000, 2300]
const mockWorkoutData = [45, 60, 30, 45, 60, 75, 45, 60, 45, 30, 60, 45]
const mockSleepData = [7, 7.5, 6, 8, 7, 7.5, 8, 7.5, 7, 6.5, 7.5, 8]
const mockWeightData = [175, 174, 173, 172, 171, 170, 169, 168.5, 168, 167.5, 167, 166.5]
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function ReportsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <ReportsSkeleton />
  }

  return (
    <ErrorBoundaryWrapper>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Health Reports</h2>
            <p className="text-muted-foreground">Analyze your health data and track your progress over time</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icons.Menu className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Icons.Menu className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Icons.Menu className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Report Summary</CardTitle>
            <CardDescription>Overview of your health metrics for the selected time period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Average Daily Calories</CardDescription>
                  <CardTitle className="text-2xl">2,164 kcal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">↑ 3%</span> vs previous period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Weekly Activity</CardDescription>
                  <CardTitle className="text-2xl">305 min</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">↑ 12%</span> vs previous period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Average Sleep</CardDescription>
                  <CardTitle className="text-2xl">7.4 hrs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">↑ 5%</span> vs previous period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Weight Change</CardDescription>
                  <CardTitle className="text-2xl">-2.5 lbs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">On track</span> with your goal
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="nutrition" className="space-y-4">
          <TabsList>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
          </TabsList>

          <TabsContent value="nutrition" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Report</CardTitle>
                <CardDescription>Your nutritional intake over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <SimpleChart
                  data={mockNutritionData}
                  height={350}
                  color="#10b981"
                  title="Monthly Average Calories (kcal)"
                  yAxisLabel="Calories"
                  xAxisLabels={monthLabels}
                />
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Macronutrient Distribution</CardTitle>
                  <CardDescription>Average daily macronutrient breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Protein</span>
                        <span className="text-sm text-muted-foreground">125g (30%)</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[30%] rounded-full bg-red-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Carbohydrates</span>
                        <span className="text-sm text-muted-foreground">220g (52%)</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[52%] rounded-full bg-blue-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Fat</span>
                        <span className="text-sm text-muted-foreground">75g (18%)</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[18%] rounded-full bg-yellow-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Caloric Intake</CardTitle>
                  <CardDescription>Daily calorie consumption vs. goal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Average Daily Intake</p>
                        <p className="text-2xl font-bold">2,164 kcal</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Daily Goal</p>
                        <p className="text-2xl font-bold">2,200 kcal</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Progress to Goal</p>
                      <div className="h-4 w-full rounded-full bg-secondary">
                        <div className="h-full w-[98%] rounded-full bg-primary" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">You're consuming 98% of your calorie goal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workouts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Workout Report</CardTitle>
                <CardDescription>Your workout activity over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <SimpleChart
                  data={mockWorkoutData}
                  height={350}
                  color="#f59e0b"
                  title="Monthly Average Workout Duration (min)"
                  yAxisLabel="Minutes"
                  xAxisLabels={monthLabels}
                />
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Workout Distribution</CardTitle>
                  <CardDescription>Breakdown by activity type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Cardio</span>
                        <span className="text-sm text-muted-foreground">180 min (44%)</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[44%] rounded-full bg-red-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Strength</span>
                        <span className="text-sm text-muted-foreground">120 min (30%)</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[30%] rounded-full bg-blue-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Flexibility</span>
                        <span className="text-sm text-muted-foreground">60 min (15%)</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[15%] rounded-full bg-green-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Sports</span>
                        <span className="text-sm text-muted-foreground">45 min (11%)</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[11%] rounded-full bg-yellow-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                  <CardDescription>Weekly activity vs. recommended</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Weekly Activity</p>
                        <p className="text-2xl font-bold">305 min</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Recommended</p>
                        <p className="text-2xl font-bold">300 min</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Progress to Goal</p>
                      <div className="h-4 w-full rounded-full bg-secondary">
                        <div className="h-full w-[102%] rounded-full bg-primary" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">You're exceeding your activity goal by 2%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sleep" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sleep Report</CardTitle>
                <CardDescription>Your sleep patterns over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <SimpleChart
                  data={mockSleepData}
                  height={350}
                  color="#8b5cf6"
                  title="Monthly Average Sleep Duration (hrs)"
                  yAxisLabel="Hours"
                  xAxisLabels={monthLabels}
                />
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sleep Quality</CardTitle>
                  <CardDescription>Distribution of sleep quality ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Excellent (5)</span>
                        <span className="text-sm text-muted-foreground">8 days (27%)</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[27%] rounded-full bg-green-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Good (4)</span>
                        <span className="text-sm text-muted-foreground">12 days (40%)</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[40%] rounded-full bg-blue-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Average (3)</span>
                        <span className="text-sm text-muted-foreground">7 days (23%)</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[23%] rounded-full bg-yellow-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Poor (1-2)</span>
                        <span className="text-sm text-muted-foreground">3 days (10%)</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                        <div className="h-full w-[10%] rounded-full bg-red-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sleep Duration</CardTitle>
                  <CardDescription>Average sleep duration vs. recommended</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Average Duration</p>
                        <p className="text-2xl font-bold">7.4 hrs</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Recommended</p>
                        <p className="text-2xl font-bold">7-9 hrs</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Sleep Consistency</p>
                      <div className="h-4 w-full rounded-full bg-secondary">
                        <div className="h-full w-[85%] rounded-full bg-primary" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">Your sleep schedule is 85% consistent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="weight" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weight Report</CardTitle>
                <CardDescription>Your weight changes over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <SimpleChart
                  data={mockWeightData}
                  height={350}
                  color="#3b82f6"
                  title="Monthly Average Weight (lbs)"
                  yAxisLabel="Weight (lbs)"
                  xAxisLabels={monthLabels}
                />
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Change</CardTitle>
                  <CardDescription>Progress towards your weight goal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Starting Weight</p>
                        <p className="text-2xl font-bold">185 lbs</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Current Weight</p>
                        <p className="text-2xl font-bold">167 lbs</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Goal Weight</p>
                        <p className="text-2xl font-bold">165 lbs</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Progress to Goal</p>
                      <div className="h-4 w-full rounded-full bg-secondary">
                        <div className="h-full w-[90%] rounded-full bg-primary" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">You've lost 18 lbs (90% of your goal)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>BMI Tracking</CardTitle>
                  <CardDescription>Body Mass Index changes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Starting BMI</p>
                        <p className="text-2xl font-bold">28.2</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Current BMI</p>
                        <p className="text-2xl font-bold">25.4</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Goal BMI</p>
                        <p className="text-2xl font-bold">24.9</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">BMI Category</p>
                      <div className="h-4 w-full rounded-full bg-secondary">
                        <div className="h-full w-[85%] rounded-full bg-yellow-500" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Current: Overweight (25.4) - Almost to Normal
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundaryWrapper>
  )
}

function ReportsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <div className="h-8 w-64 bg-muted rounded mb-2"></div>
          <div className="h-4 w-96 bg-muted rounded"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-20 bg-muted rounded"></div>
          <div className="h-8 w-20 bg-muted rounded"></div>
          <div className="h-8 w-20 bg-muted rounded"></div>
        </div>
      </div>

      <div className="h-64 bg-muted rounded-lg"></div>

      <div className="space-y-4">
        <div className="h-10 w-64 bg-muted rounded"></div>
        <div className="h-[400px] bg-muted rounded-lg"></div>
      </div>
    </div>
  )
}
