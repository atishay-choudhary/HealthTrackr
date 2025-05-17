"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from "recharts"

// Mock data for workout report
const workoutData = [
  {
    date: "Week 1",
    cardioMinutes: 90,
    strengthMinutes: 60,
    flexibilityMinutes: 30,
    sportsMinutes: 0,
    caloriesBurned: 850,
  },
  {
    date: "Week 2",
    cardioMinutes: 120,
    strengthMinutes: 90,
    flexibilityMinutes: 30,
    sportsMinutes: 0,
    caloriesBurned: 1050,
  },
  {
    date: "Week 3",
    cardioMinutes: 150,
    strengthMinutes: 120,
    flexibilityMinutes: 30,
    sportsMinutes: 0,
    caloriesBurned: 1250,
  },
  {
    date: "Week 4",
    cardioMinutes: 135,
    strengthMinutes: 150,
    flexibilityMinutes: 30,
    sportsMinutes: 45,
    caloriesBurned: 1350,
  },
  {
    date: "Week 5",
    cardioMinutes: 180,
    strengthMinutes: 135,
    flexibilityMinutes: 45,
    sportsMinutes: 0,
    caloriesBurned: 1500,
  },
  {
    date: "Week 6",
    cardioMinutes: 150,
    strengthMinutes: 180,
    flexibilityMinutes: 45,
    sportsMinutes: 0,
    caloriesBurned: 1600,
  },
  {
    date: "Week 7",
    cardioMinutes: 210,
    strengthMinutes: 150,
    flexibilityMinutes: 30,
    sportsMinutes: 0,
    caloriesBurned: 1750,
  },
  {
    date: "Week 8",
    cardioMinutes: 180,
    strengthMinutes: 210,
    flexibilityMinutes: 30,
    sportsMinutes: 45,
    caloriesBurned: 1900,
  },
]

export function WorkoutReportChart() {
  return (
    <ChartContainer>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-sm">Cardio (min)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-orange-500" />
          <span className="text-sm">Strength (min)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-sm">Flexibility (min)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="text-sm">Sports (min)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-sm">Calories Burned</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={workoutData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" />
          <YAxis yAxisId="minutes" domain={[0, 500]} />
          <YAxis yAxisId="calories" orientation="right" domain={[0, 2000]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar yAxisId="minutes" dataKey="cardioMinutes" stackId="a" fill="#3b82f6" />
          <Bar yAxisId="minutes" dataKey="strengthMinutes" stackId="a" fill="#f97316" />
          <Bar yAxisId="minutes" dataKey="flexibilityMinutes" stackId="a" fill="#22c55e" />
          <Bar yAxisId="minutes" dataKey="sportsMinutes" stackId="a" fill="#f59e0b" />
          <Line
            yAxisId="calories"
            type="monotone"
            dataKey="caloriesBurned"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const totalMinutes =
      payload[0].value + payload[1].value + payload[2].value + (payload[3].value ? payload[3].value : 0)

    return (
      <ChartTooltip>
        <ChartTooltipContent>
          <div className="font-bold">{label}</div>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Cardio: {payload[0].value} min</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <span>Strength: {payload[1].value} min</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Flexibility: {payload[2].value} min</span>
            </div>
            {payload[3].value > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span>Sports: {payload[3].value} min</span>
              </div>
            )}
            <div className="flex items-center gap-2 pt-1 border-t border-gray-200 mt-1">
              <div className="h-2 w-2 rounded-full bg-gray-500" />
              <span>Total: {totalMinutes} min</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span>Calories: {payload[4].value} kcal</span>
            </div>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}
