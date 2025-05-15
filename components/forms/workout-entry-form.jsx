"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function WorkoutEntryForm({ onSubmit }) {
  const [workoutType, setWorkoutType] = useState("cardio")
  const [duration, setDuration] = useState(30)
  const [intensity, setIntensity] = useState("moderate")
  const [caloriesBurned, setCaloriesBurned] = useState(0)
  const [notes, setNotes] = useState("")
  const [time, setTime] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      workoutType,
      duration,
      intensity,
      caloriesBurned,
      notes,
      time,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="workout-type">Workout Type</Label>
          <Select value={workoutType} onValueChange={setWorkoutType}>
            <SelectTrigger id="workout-type">
              <SelectValue placeholder="Select workout type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cardio">Cardio</SelectItem>
              <SelectItem value="strength">Strength Training</SelectItem>
              <SelectItem value="flexibility">Flexibility</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="intensity">Intensity</Label>
          <Select value={intensity} onValueChange={setIntensity}>
            <SelectTrigger id="intensity">
              <SelectValue placeholder="Select intensity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="vigorous">Vigorous</SelectItem>
              <SelectItem value="maximum">Maximum</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <span>{duration} min</span>
          </div>
          <Slider
            id="duration"
            min={5}
            max={180}
            step={5}
            value={[duration]}
            onValueChange={(value) => setDuration(value[0])}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="calories-burned">Calories Burned</Label>
          <Input
            id="calories-burned"
            type="number"
            min="0"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Time</Label>
        <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Add any additional details about this workout..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full">
        Log Workout
      </Button>
    </form>
  )
}
