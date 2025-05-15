"use client"

import Link from "next/link"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for calendar entries
const mockEntries = [
  { date: new Date(2025, 4, 1), type: "food", count: 3 },
  { date: new Date(2025, 4, 1), type: "water", count: 1 },
  { date: new Date(2025, 4, 1), type: "workout", count: 1 },
  { date: new Date(2025, 4, 2), type: "food", count: 4 },
  { date: new Date(2025, 4, 2), type: "sleep", count: 1 },
  { date: new Date(2025, 4, 3), type: "food", count: 3 },
  { date: new Date(2025, 4, 3), type: "water", count: 1 },
  { date: new Date(2025, 4, 3), type: "mood", count: 1 },
  { date: new Date(2025, 4, 4), type: "food", count: 3 },
  { date: new Date(2025, 4, 4), type: "workout", count: 1 },
  { date: new Date(2025, 4, 5), type: "food", count: 3 },
  { date: new Date(2025, 4, 5), type: "water", count: 1 },
  { date: new Date(2025, 4, 5), type: "sleep", count: 1 },
  { date: new Date(2025, 4, 6), type: "food", count: 2 },
  { date: new Date(2025, 4, 7), type: "food", count: 3 },
  { date: new Date(2025, 4, 7), type: "water", count: 1 },
  { date: new Date(2025, 4, 7), type: "workout", count: 1 },
  { date: new Date(2025, 4, 7), type: "mood", count: 1 },
  { date: new Date(2025, 4, 8), type: "food", count: 3 },
  { date: new Date(2025, 4, 8), type: "sleep", count: 1 },
  { date: new Date(2025, 4, 9), type: "food", count: 3 },
  { date: new Date(2025, 4, 9), type: "water", count: 1 },
  { date: new Date(2025, 4, 10), type: "food", count: 3 },
  { date: new Date(2025, 4, 10), type: "workout", count: 1 },
  { date: new Date(2025, 4, 11), type: "food", count: 3 },
  { date: new Date(2025, 4, 11), type: "water", count: 1 },
  { date: new Date(2025, 4, 11), type: "sleep", count: 1 },
  { date: new Date(2025, 4, 12), type: "food", count: 3 },
  { date: new Date(2025, 4, 12), type: "mood", count: 1 },
]

// Mock data for day details
const mockDayDetails = {
  food: [
    { id: 1, name: "Breakfast", calories: 450, protein: 20, carbs: 50, fat: 15, time: "08:30 AM" },
    { id: 2, name: "Lunch", calories: 650, protein: 35, carbs: 70, fat: 20, time: "12:30 PM" },
    { id: 3, name: "Dinner", calories: 700, protein: 40, carbs: 60, fat: 25, time: "07:00 PM" },
  ],
  water: [
    { id: 1, amount: 500, unit: "ml", time: "09:00 AM" },
    { id: 2, amount: 500, unit: "ml", time: "12:00 PM" },
    { id: 3, amount: 500, unit: "ml", time: "03:00 PM" },
    { id: 4, amount: 500, unit: "ml", time: "06:00 PM" },
  ],
  workout: [{ id: 1, type: "Cardio", duration: 45, calories: 350, time: "06:00 AM" }],
  sleep: [{ id: 1, duration: 7.5, quality: "Good", bedtime: "11:00 PM", wakeup: "06:30 AM" }],
  mood: [{ id: 1, rating: 4, notes: "Feeling energetic and positive", time: "08:00 PM" }],
}

export default function CalendarPage() {
  const [date, setDate] = useState(new Date())
  const [showDetails, setShowDetails] = useState(false)

  // Function to get entries for a specific date
  const getEntriesForDate = (date) => {
    if (!date) return []

    return mockEntries.filter(
      (entry) =>
        entry.date.getDate() === date.getDate() &&
        entry.date.getMonth() === date.getMonth() &&
        entry.date.getFullYear() === date.getFullYear(),
    )
  }

  // Function to render badges for a date
  const renderDateContent = (date) => {
    const entries = getEntriesForDate(date)
    if (entries.length === 0) return null

    return (
      <div className="flex flex-wrap gap-1 mt-1 justify-center">
        {entries.some((e) => e.type === "food") && <div className="h-1.5 w-1.5 rounded-full bg-green-500" />}
        {entries.some((e) => e.type === "water") && <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
        {entries.some((e) => e.type === "workout") && <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />}
        {entries.some((e) => e.type === "sleep") && <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />}
        {entries.some((e) => e.type === "mood") && <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />}
      </div>
    )
  }

  const selectedDateEntries = date ? getEntriesForDate(date) : []
  const hasEntries = selectedDateEntries.length > 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Health Calendar</h2>
        <p className="text-muted-foreground">View and manage your health data by date</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view your health entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                components={{
                  DayContent: ({ date }) => (
                    <>
                      {date.getDate()}
                      {renderDateContent(date)}
                    </>
                  ),
                }}
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-xs">Food</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-xs">Water</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-orange-500" />
                <span className="text-xs">Workout</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-purple-500" />
                <span className="text-xs">Sleep</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="text-xs">Mood</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {date
                ? date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Select a date"}
            </CardTitle>
            <CardDescription>
              {hasEntries
                ? `${selectedDateEntries.reduce((acc, entry) => acc + entry.count, 0)} entries recorded`
                : "No entries for this date"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasEntries ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedDateEntries.map((entry, index) => (
                    <Badge key={index} variant="outline" className="capitalize">
                      {entry.type}: {entry.count} {entry.count === 1 ? "entry" : "entries"}
                    </Badge>
                  ))}
                </div>

                <Dialog open={showDetails} onOpenChange={setShowDetails}>
                  <DialogTrigger asChild>
                    <Button className="w-full">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>
                        {date?.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </DialogTitle>
                      <DialogDescription>Detailed view of your health entries</DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="food" className="mt-4">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="food">Food</TabsTrigger>
                        <TabsTrigger value="water">Water</TabsTrigger>
                        <TabsTrigger value="workout">Workout</TabsTrigger>
                        <TabsTrigger value="sleep">Sleep</TabsTrigger>
                        <TabsTrigger value="mood">Mood</TabsTrigger>
                      </TabsList>

                      <ScrollArea className="h-[400px] mt-4">
                        <TabsContent value="food" className="space-y-4">
                          {mockDayDetails.food.map((item) => (
                            <Card key={item.id}>
                              <CardHeader className="py-2">
                                <div className="flex justify-between items-center">
                                  <CardTitle className="text-base">{item.name}</CardTitle>
                                  <span className="text-sm text-muted-foreground">{item.time}</span>
                                </div>
                              </CardHeader>
                              <CardContent className="py-2">
                                <div className="grid grid-cols-4 gap-2 text-sm">
                                  <div>
                                    <p className="font-medium">Calories</p>
                                    <p>{item.calories} kcal</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Protein</p>
                                    <p>{item.protein}g</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Carbs</p>
                                    <p>{item.carbs}g</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Fat</p>
                                    <p>{item.fat}g</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </TabsContent>

                        <TabsContent value="water" className="space-y-4">
                          {mockDayDetails.water.map((item) => (
                            <Card key={item.id}>
                              <CardHeader className="py-2">
                                <div className="flex justify-between items-center">
                                  <CardTitle className="text-base">Water Intake</CardTitle>
                                  <span className="text-sm text-muted-foreground">{item.time}</span>
                                </div>
                              </CardHeader>
                              <CardContent className="py-2">
                                <p>
                                  {item.amount} {item.unit}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </TabsContent>

                        <TabsContent value="workout" className="space-y-4">
                          {mockDayDetails.workout.map((item) => (
                            <Card key={item.id}>
                              <CardHeader className="py-2">
                                <div className="flex justify-between items-center">
                                  <CardTitle className="text-base">{item.type}</CardTitle>
                                  <span className="text-sm text-muted-foreground">{item.time}</span>
                                </div>
                              </CardHeader>
                              <CardContent className="py-2">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <p className="font-medium">Duration</p>
                                    <p>{item.duration} minutes</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Calories Burned</p>
                                    <p>{item.calories} kcal</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </TabsContent>

                        <TabsContent value="sleep" className="space-y-4">
                          {mockDayDetails.sleep.map((item) => (
                            <Card key={item.id}>
                              <CardHeader className="py-2">
                                <CardTitle className="text-base">Sleep Record</CardTitle>
                              </CardHeader>
                              <CardContent className="py-2">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="font-medium">Duration</p>
                                    <p>{item.duration} hours</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Quality</p>
                                    <p>{item.quality}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Bedtime</p>
                                    <p>{item.bedtime}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Wake Up</p>
                                    <p>{item.wakeup}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </TabsContent>

                        <TabsContent value="mood" className="space-y-4">
                          {mockDayDetails.mood.map((item) => (
                            <Card key={item.id}>
                              <CardHeader className="py-2">
                                <div className="flex justify-between items-center">
                                  <CardTitle className="text-base">Mood Entry</CardTitle>
                                  <span className="text-sm text-muted-foreground">{item.time}</span>
                                </div>
                              </CardHeader>
                              <CardContent className="py-2">
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <p className="font-medium">Rating</p>
                                    <div className="flex items-center">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <svg
                                          key={i}
                                          className={`h-5 w-5 ${i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
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
                                  </div>
                                  <div>
                                    <p className="font-medium">Notes</p>
                                    <p>{item.notes}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </TabsContent>
                      </ScrollArea>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] space-y-4">
                <p className="text-muted-foreground text-center">No health data recorded for this date.</p>
                <Button asChild>
                  <Link href="/dashboard/log">Log New Entry</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
