"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function SleepEntryForm({ onSubmit }) {
  const [bedtime, setBedtime] = useState("")
  const [wakeTime, setWakeTime] = useState("")
  const [duration, setDuration] = useState(7.5)
  const [quality, setQuality] = useState("3")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      bedtime,
      wakeTime,
      duration,
      quality: Number.parseInt(quality),
      notes,
    })
  }

  // Calculate duration when bedtime and wake time change
  const calculateDuration = () => {
    if (bedtime && wakeTime) {
      const bedtimeDate = new Date(`2000-01-01T${bedtime}:00`)
      const wakeTimeDate = new Date(`2000-01-01T${wakeTime}:00`)

      // If wake time is earlier than bedtime, add a day to wake time
      if (wakeTimeDate < bedtimeDate) {
        wakeTimeDate.setDate(wakeTimeDate.getDate() + 1)
      }

      const diffMs = wakeTimeDate.getTime() - bedtimeDate.getTime()
      const diffHrs = diffMs / (1000 * 60 * 60)
      setDuration(Number.parseFloat(diffHrs.toFixed(1)))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="bedtime">Bedtime</Label>
          <Input
            id="bedtime"
            type="time"
            value={bedtime}
            onChange={(e) => {
              setBedtime(e.target.value)
              if (wakeTime) calculateDuration()
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="wake-time">Wake Time</Label>
          <Input
            id="wake-time"
            type="time"
            value={wakeTime}
            onChange={(e) => {
              setWakeTime(e.target.value)
              if (bedtime) calculateDuration()
            }}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="duration">Sleep Duration</Label>
          <span>{duration} hours</span>
        </div>
        <Slider
          id="duration"
          min={0}
          max={12}
          step={0.1}
          value={[duration]}
          onValueChange={(value) => setDuration(value[0])}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quality">Sleep Quality</Label>
        <RadioGroup id="quality" value={quality} onValueChange={setQuality} className="flex space-x-2">
          <div className="flex flex-col items-center">
            <RadioGroupItem value="1" id="q1" className="sr-only" />
            <Label
              htmlFor="q1"
              className={`cursor-pointer rounded-full p-2 ${quality === "1" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              1
            </Label>
            <span className="text-xs mt-1">Poor</span>
          </div>
          <div className="flex flex-col items-center">
            <RadioGroupItem value="2" id="q2" className="sr-only" />
            <Label
              htmlFor="q2"
              className={`cursor-pointer rounded-full p-2 ${quality === "2" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              2
            </Label>
            <span className="text-xs mt-1"></span>
          </div>
          <div className="flex flex-col items-center">
            <RadioGroupItem value="3" id="q3" className="sr-only" />
            <Label
              htmlFor="q3"
              className={`cursor-pointer rounded-full p-2 ${quality === "3" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              3
            </Label>
            <span className="text-xs mt-1">Average</span>
          </div>
          <div className="flex flex-col items-center">
            <RadioGroupItem value="4" id="q4" className="sr-only" />
            <Label
              htmlFor="q4"
              className={`cursor-pointer rounded-full p-2 ${quality === "4" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              4
            </Label>
            <span className="text-xs mt-1"></span>
          </div>
          <div className="flex flex-col items-center">
            <RadioGroupItem value="5" id="q5" className="sr-only" />
            <Label
              htmlFor="q5"
              className={`cursor-pointer rounded-full p-2 ${quality === "5" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              5
            </Label>
            <span className="text-xs mt-1">Excellent</span>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Add any additional details about your sleep..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full">
        Log Sleep
      </Button>
    </form>
  )
}
