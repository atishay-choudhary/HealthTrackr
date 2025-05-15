"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from "recharts"

// Mock data for workout progress
const workoutData = [
  {
    week: "Week 1",
    cardioMinutes: 90,
    strengthMinutes: 60,
    caloriesBurned: 850,
    maxHeartRate: 165,
  },
  {
    week: "Week 2",
    cardioMinutes: 120,
    strengthMinutes: 90,
    caloriesBurned: 1050,
    maxHeartRate: 168,
  },
  {
    week: "Week 3",
    cardioMinutes: 150,
    strengthMinutes: 120,
    caloriesBurned: 1250,
    maxHeartRate: 172,
  },
  {
    week: "Week 4",
    cardioMinutes: 135,
    strengthMinutes: 150,
    caloriesBurned: 1350,
    maxHeartRate: 170,
  },
  {
    week: "Week 5",
    cardioMinutes: 180,
    strengthMinutes: 135,
    caloriesBurned: 1500,
    maxHeartRate: 175,
  },
  {
    week: "Week 6",
    cardioMinutes: 150,
    strengthMinutes: 180,
    caloriesBurned: 1600,
    maxHeartRate: 173,
  },
  {
    week: "Week 7",
    cardioMinutes: 210,
    strengthMinutes: 150,
    caloriesBurned: 1750,
    maxHeartRate: 178,
  },
  {
    week: "Week 8",
    cardioMinutes: 180,
    strengthMinutes: 210,
    caloriesBurned: 1900,
    maxHeartRate: 176,
  },
]

export function WorkoutProgressChart() {
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
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-sm">Calories Burned</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={workoutData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="week" />
          <YAxis yAxisId="minutes" domain={[0, 250]} />
          <YAxis yAxisId="calories" orientation="right" domain={[0, 2000]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar yAxisId="minutes" dataKey="cardioMinutes" fill="#3b82f6" stackId="a" />
          <Bar yAxisId="minutes" dataKey="strengthMinutes" fill="#f97316" stackId="a" />
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
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span>Calories: {payload[2].value} kcal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Max Heart Rate: {payload[0].payload.maxHeartRate} bpm</span>
            </div>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}
