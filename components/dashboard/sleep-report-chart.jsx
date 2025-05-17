"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts"

// Mock data for sleep report
const sleepData = [
  { date: "May 1", hours: 6.5, quality: 3, bedtime: "11:30 PM", wakeup: "6:00 AM" },
  { date: "May 2", hours: 6.8, quality: 3, bedtime: "11:15 PM", wakeup: "6:00 AM" },
  { date: "May 3", hours: 7.0, quality: 4, bedtime: "11:00 PM", wakeup: "6:00 AM" },
  { date: "May 4", hours: 7.2, quality: 4, bedtime: "10:45 PM", wakeup: "6:00 AM" },
  { date: "May 5", hours: 7.5, quality: 4, bedtime: "10:30 PM", wakeup: "6:00 AM" },
  { date: "May 6", hours: 7.8, quality: 5, bedtime: "10:15 PM", wakeup: "6:00 AM" },
  { date: "May 7", hours: 8.0, quality: 5, bedtime: "10:00 PM", wakeup: "6:00 AM" },
  { date: "May 8", hours: 7.9, quality: 5, bedtime: "10:00 PM", wakeup: "5:55 AM" },
  { date: "May 9", hours: 7.5, quality: 4, bedtime: "10:15 PM", wakeup: "5:45 AM" },
  { date: "May 10", hours: 7.2, quality: 4, bedtime: "10:30 PM", wakeup: "5:45 AM" },
  { date: "May 11", hours: 6.8, quality: 3, bedtime: "11:00 PM", wakeup: "5:50 AM" },
  { date: "May 12", hours: 7.0, quality: 3, bedtime: "10:45 PM", wakeup: "5:45 AM" },
  { date: "May 13", hours: 7.5, quality: 4, bedtime: "10:30 PM", wakeup: "6:00 AM" },
  { date: "May 14", hours: 8.0, quality: 5, bedtime: "10:00 PM", wakeup: "6:00 AM" },
  { date: "May 15", hours: 7.8, quality: 4, bedtime: "10:15 PM", wakeup: "6:00 AM" },
]

export function SleepReportChart() {
  return (
    <ChartContainer>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-purple-500" />
          <span className="text-sm">Sleep Duration (hours)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="text-sm">Sleep Quality (1-5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-sm">Optimal Range (7-9 hours)</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={sleepData}>
          <defs>
            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={7} stroke="#22c55e" strokeDasharray="3 3" />
          <ReferenceLine y={9} stroke="#22c55e" strokeDasharray="3 3" />
          <Area
            type="monotone"
            dataKey="hours"
            stroke="#a855f7"
            fillOpacity={1}
            fill="url(#colorHours)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="quality"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
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
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Sleep: {payload[0].value} hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>
                Quality:{" "}
                {payload[1].value === 5
                  ? "Excellent"
                  : payload[1].value === 4
                    ? "Good"
                    : payload[1].value === 3
                      ? "Average"
                      : payload[1].value === 2
                        ? "Poor"
                        : "Very Poor"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>Bedtime: {payload[0].payload.bedtime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Wake up: {payload[0].payload.wakeup}</span>
            </div>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}
