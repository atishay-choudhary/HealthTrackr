"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock data for activity summary
const weeklyActivityData = [
  { day: "Mon", minutes: 45, calories: 320 },
  { day: "Tue", minutes: 60, calories: 450 },
  { day: "Wed", minutes: 30, calories: 200 },
  { day: "Thu", minutes: 45, calories: 350 },
  { day: "Fri", minutes: 50, calories: 380 },
  { day: "Sat", minutes: 75, calories: 520 },
  { day: "Sun", minutes: 0, calories: 0 },
]

const activityTypeData = [
  { name: "Cardio", value: 180 },
  { name: "Strength", value: 120 },
  { name: "Flexibility", value: 60 },
  { name: "Sports", value: 45 },
]

const COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b"]

export function ActivitySummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Summary</CardTitle>
        <CardDescription>Your workout activity for the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="weekly">Weekly Activity</TabsTrigger>
            <TabsTrigger value="types">Activity Types</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <ChartContainer>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar dataKey="minutes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-xl font-bold">305 min</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Calories Burned</p>
                <p className="text-xl font-bold">2,220 kcal</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="types">
            <ChartContainer>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={activityTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {activityTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="mt-4 flex justify-center">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {activityTypeData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-sm">
                      {entry.name}: {entry.value} min
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Weekly Goal</p>
                  <p className="text-xl font-bold">300 min</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-xl font-bold">102%</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Avg. Session</p>
                  <p className="text-xl font-bold">51 min</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Active Days</p>
                  <p className="text-xl font-bold">6/7</p>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Activity Insights</h4>
                <p className="text-sm">
                  You've exceeded your weekly activity goal by 2%. Your consistency is excellent with 6 active days this
                  week. Keep up the good work!
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function CustomBarTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltip>
        <ChartTooltipContent>
          <div className="font-bold">{label}</div>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Duration: {payload[0].value} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <span>Calories: {payload[0].payload.calories} kcal</span>
            </div>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}

function CustomPieTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltip>
        <ChartTooltipContent>
          <div className="font-bold">{payload[0].name}</div>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: payload[0].color }} />
              <span>{payload[0].value} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{((payload[0].value / 405) * 100).toFixed(1)}% of total activity</span>
            </div>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}
