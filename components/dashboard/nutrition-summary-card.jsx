"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock data for nutrition summary
const weeklyNutritionData = [
  { day: "Mon", calories: 2100, protein: 120, carbs: 220, fat: 70 },
  { day: "Tue", calories: 1950, protein: 115, carbs: 200, fat: 65 },
  { day: "Wed", calories: 2200, protein: 130, carbs: 230, fat: 75 },
  { day: "Thu", calories: 2050, protein: 125, carbs: 210, fat: 70 },
  { day: "Fri", calories: 2300, protein: 140, carbs: 240, fat: 80 },
  { day: "Sat", calories: 2400, protein: 145, carbs: 250, fat: 85 },
  { day: "Sun", calories: 2150, protein: 125, carbs: 220, fat: 75 },
]

const macroData = [
  { name: "Protein", value: 125 },
  { name: "Carbs", value: 220 },
  { name: "Fat", value: 75 },
]

const COLORS = ["#ef4444", "#3b82f6", "#f59e0b"]

export function NutritionSummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrition Summary</CardTitle>
        <CardDescription>Your nutritional intake for the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calories" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calories">Calories</TabsTrigger>
            <TabsTrigger value="macros">Macros</TabsTrigger>
            <TabsTrigger value="meals">Meals</TabsTrigger>
          </TabsList>

          <TabsContent value="calories">
            <ChartContainer>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyNutritionData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="day" />
                  <YAxis domain={[1500, 2500]} />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar dataKey="calories" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Daily Average</p>
                <p className="text-xl font-bold">2,164 kcal</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Daily Goal</p>
                <p className="text-xl font-bold">2,200 kcal</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="macros">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChartContainer>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm">Protein: 125g (30%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-sm">Carbs: 220g (52%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="text-sm">Fat: 75g (18%)</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Protein Goal</p>
                <p className="text-xl font-bold">130g</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Carbs Goal</p>
                <p className="text-xl font-bold">225g</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Fat Goal</p>
                <p className="text-xl font-bold">73g</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="meals">
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Breakfast</p>
                    <p className="text-sm text-muted-foreground">8:30 AM</p>
                  </div>
                  <p className="font-bold">450 kcal</p>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Protein</p>
                    <p>25g</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Carbs</p>
                    <p>50g</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fat</p>
                    <p>15g</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Lunch</p>
                    <p className="text-sm text-muted-foreground">12:30 PM</p>
                  </div>
                  <p className="font-bold">650 kcal</p>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Protein</p>
                    <p>40g</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Carbs</p>
                    <p>70g</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fat</p>
                    <p>25g</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Dinner</p>
                    <p className="text-sm text-muted-foreground">7:00 PM</p>
                  </div>
                  <p className="font-bold">700 kcal</p>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Protein</p>
                    <p>45g</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Carbs</p>
                    <p>75g</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fat</p>
                    <p>25g</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Snacks</p>
                    <p className="text-sm text-muted-foreground">Various times</p>
                  </div>
                  <p className="font-bold">350 kcal</p>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Protein</p>
                    <p>15g</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Carbs</p>
                    <p>35g</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fat</p>
                    <p>15g</p>
                  </div>
                </div>
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
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span>Calories: {payload[0].value} kcal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Protein: {payload[0].payload.protein}g</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Carbs: {payload[0].payload.carbs}g</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>Fat: {payload[0].payload.fat}g</span>
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
              <span>{payload[0].value}g</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{((payload[0].value / 420) * 100).toFixed(1)}% of total macros</span>
            </div>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}
