"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for sleep quality
const sleepData = [
  { day: "Mon", hours: 7.2, quality: 3 },
  { day: "Tue", hours: 7.5, quality: 4 },
  { day: "Wed", hours: 6.8, quality: 3 },
  { day: "Thu", hours: 7.0, quality: 3 },
  { day: "Fri", hours: 7.8, quality: 4 },
  { day: "Sat", hours: 8.5, quality: 5 },
  { day: "Sun", hours: 7.2, quality: 4 },
]

export function SleepQualityCard({ detailed = false }) {
  if (detailed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sleep Quality</CardTitle>
          <CardDescription>Your sleep patterns for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 10]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="hours" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-medium mb-2">Sleep Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Average Sleep</p>
                  <p className="text-xl font-bold">7.4 hrs</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Sleep Quality</p>
                  <p className="text-xl font-bold">Good</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Bedtime</p>
                  <p className="text-xl font-bold">11:30 PM</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Wake Time</p>
                  <p className="text-xl font-bold">7:00 AM</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Sleep Insights</h4>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm">
                  Your sleep duration has been consistent this week. Maintaining a regular sleep schedule helps improve
                  overall sleep quality and daytime energy levels.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Sleep Quality</CardTitle>
        <CardDescription>Last night's sleep</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-4xl font-bold text-purple-500">7.5</div>
          <div className="text-sm text-muted-foreground">hours</div>
          <div className="flex mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">Good quality</div>
        </div>
      </CardContent>
    </Card>
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
                {payload[0].payload.quality === 5
                  ? "Excellent"
                  : payload[0].payload.quality === 4
                    ? "Good"
                    : payload[0].payload.quality === 3
                      ? "Average"
                      : payload[0].payload.quality === 2
                        ? "Poor"
                        : "Very Poor"}
              </span>
            </div>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}
