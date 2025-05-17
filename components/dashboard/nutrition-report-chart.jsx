"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

// Mock data for nutrition report
const nutritionData = [
  { date: "May 1", calories: 2100, protein: 120, carbs: 220, fat: 70 },
  { date: "May 2", calories: 1950, protein: 115, carbs: 200, fat: 65 },
  { date: "May 3", calories: 2200, protein: 130, carbs: 230, fat: 75 },
  { date: "May 4", calories: 2050, protein: 125, carbs: 210, fat: 70 },
  { date: "May 5", calories: 2300, protein: 140, carbs: 240, fat: 80 },
  { date: "May 6", calories: 2400, protein: 145, carbs: 250, fat: 85 },
  { date: "May 7", calories: 2150, protein: 125, carbs: 220, fat: 75 },
  { date: "May 8", calories: 2250, protein: 135, carbs: 230, fat: 80 },
  { date: "May 9", calories: 2050, protein: 120, carbs: 210, fat: 70 },
  { date: "May 10", calories: 2150, protein: 130, carbs: 220, fat: 75 },
  { date: "May 11", calories: 2300, protein: 140, carbs: 240, fat: 80 },
  { date: "May 12", calories: 2200, protein: 135, carbs: 230, fat: 75 },
  { date: "May 13", calories: 2100, protein: 125, carbs: 220, fat: 70 },
  { date: "May 14", calories: 2050, protein: 120, carbs: 210, fat: 70 },
  { date: "May 15", calories: 2250, protein: 135, carbs: 230, fat: 80 },
]

export function NutritionReportChart() {
  return (
    <ChartContainer>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-sm">Calories (kcal)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-sm">Protein (g)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-sm">Carbs (g)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="text-sm">Fat (g)</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={nutritionData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" />
          <YAxis yAxisId="calories" domain={[1800, 2500]} />
          <YAxis yAxisId="macros" orientation="right" domain={[0, 300]} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine yAxisId="calories" y={2200} stroke="#888" strokeDasharray="3 3" label="Goal" />
          <Line
            yAxisId="calories"
            type="monotone"
            dataKey="calories"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            yAxisId="macros"
            type="monotone"
            dataKey="protein"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            yAxisId="macros"
            type="monotone"
            dataKey="carbs"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            yAxisId="macros"
            type="monotone"
            dataKey="fat"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
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
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span>Calories: {payload[0].value} kcal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Protein: {payload[1].value}g</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Carbs: {payload[2].value}g</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>Fat: {payload[3].value}g</span>
            </div>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}
