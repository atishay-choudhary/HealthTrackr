"use client"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendItem } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

// Mock data for the health metrics chart
const data = [
  {
    date: "Mon",
    calories: 2100,
    water: 2.2,
    steps: 8500,
    sleep: 7.2,
  },
  {
    date: "Tue",
    calories: 1950,
    water: 2.5,
    steps: 10200,
    sleep: 7.5,
  },
  {
    date: "Wed",
    calories: 2200,
    water: 2.0,
    steps: 7800,
    sleep: 6.8,
  },
  {
    date: "Thu",
    calories: 2050,
    water: 2.3,
    steps: 9500,
    sleep: 7.0,
  },
  {
    date: "Fri",
    calories: 2300,
    water: 2.7,
    steps: 11000,
    sleep: 7.8,
  },
  {
    date: "Sat",
    calories: 2400,
    water: 2.4,
    steps: 8200,
    sleep: 8.5,
  },
  {
    date: "Sun",
    calories: 2150,
    water: 2.1,
    steps: 7500,
    sleep: 7.2,
  },
]

export function HealthMetricsChart() {
  return (
    <ChartContainer>
      <ChartLegend className="justify-center mb-4">
        <ChartLegendItem name="Calories" color="#ef4444" />
        <ChartLegendItem name="Water (L)" color="#3b82f6" />
        <ChartLegendItem name="Steps" color="#22c55e" />
        <ChartLegendItem name="Sleep (hrs)" color="#a855f7" />
      </ChartLegend>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" />
          <YAxis yAxisId="calories" orientation="left" domain={[1500, 2500]} />
          <YAxis yAxisId="water" orientation="right" domain={[1.5, 3]} />
          <YAxis yAxisId="steps" orientation="right" hide />
          <YAxis yAxisId="sleep" orientation="right" hide />
          <Tooltip content={<CustomTooltip />} />
          <Line
            yAxisId="calories"
            type="monotone"
            dataKey="calories"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="water"
            type="monotone"
            dataKey="water"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="steps"
            type="monotone"
            dataKey="steps"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="sleep"
            type="monotone"
            dataKey="sleep"
            stroke="#a855f7"
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
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span>Calories: {payload[0].value}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Water: {payload[1].value}L</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Steps: {payload[2].value}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Sleep: {payload[3].value} hrs</span>
            </div>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}
