"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

// Mock data for weight progress
const weightData = [
  { date: "Jan 1", weight: 185 },
  { date: "Jan 8", weight: 184 },
  { date: "Jan 15", weight: 183 },
  { date: "Jan 22", weight: 182 },
  { date: "Jan 29", weight: 181 },
  { date: "Feb 5", weight: 180 },
  { date: "Feb 12", weight: 179 },
  { date: "Feb 19", weight: 178.5 },
  { date: "Feb 26", weight: 177 },
  { date: "Mar 5", weight: 176 },
  { date: "Mar 12", weight: 175 },
  { date: "Mar 19", weight: 174 },
  { date: "Mar 26", weight: 173 },
  { date: "Apr 2", weight: 172 },
  { date: "Apr 9", weight: 171 },
  { date: "Apr 16", weight: 170 },
  { date: "Apr 23", weight: 169 },
  { date: "Apr 30", weight: 168 },
  { date: "May 7", weight: 167 },
]

export function WeightProgressChart() {
  return (
    <ChartContainer>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm">Weight (lbs)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-sm">Goal: 165 lbs</span>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">Total Loss: 18 lbs</div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={weightData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" />
          <YAxis domain={[160, 190]} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={165} stroke="#22c55e" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="hsl(var(--primary))"
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
    return (
      <ChartTooltip>
        <ChartTooltipContent>
          <div className="font-bold">{label}</div>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Weight: {payload[0].value} lbs</span>
            </div>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}
