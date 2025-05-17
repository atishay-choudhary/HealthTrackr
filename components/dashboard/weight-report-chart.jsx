"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

// Mock data for weight report
const weightData = [
  { date: "Jan 1", weight: 185, bmi: 28.2 },
  { date: "Jan 15", weight: 183, bmi: 27.9 },
  { date: "Feb 1", weight: 181, bmi: 27.6 },
  { date: "Feb 15", weight: 179, bmi: 27.3 },
  { date: "Mar 1", weight: 177, bmi: 27.0 },
  { date: "Mar 15", weight: 175, bmi: 26.7 },
  { date: "Apr 1", weight: 173, bmi: 26.4 },
  { date: "Apr 15", weight: 171, bmi: 26.1 },
  { date: "May 1", weight: 169, bmi: 25.8 },
  { date: "May 15", weight: 167, bmi: 25.4 },
]

export function WeightReportChart() {
  return (
    <ChartContainer>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm">Weight (lbs)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-sm">BMI</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-sm">Goal: 165 lbs</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={weightData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" />
          <YAxis yAxisId="weight" domain={[160, 190]} />
          <YAxis yAxisId="bmi" orientation="right" domain={[24, 30]} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine yAxisId="weight" y={165} stroke="#22c55e" strokeDasharray="3 3" label="Goal" />
          <Line
            yAxisId="weight"
            type="monotone"
            dataKey="weight"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="bmi"
            type="monotone"
            dataKey="bmi"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    let bmiCategory = "Obese"
    const bmi = payload[1].value

    if (bmi < 18.5) {
      bmiCategory = "Underweight"
    } else if (bmi < 25) {
      bmiCategory = "Normal weight"
    } else if (bmi < 30) {
      bmiCategory = "Overweight"
    }

    return (
      <ChartTooltip>
        <ChartTooltipContent>
          <div className="font-bold">{label}</div>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Weight: {payload[0].value} lbs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>
                BMI: {payload[1].value} ({bmiCategory})
              </span>
            </div>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}
