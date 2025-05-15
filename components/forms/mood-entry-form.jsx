"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function MoodEntryForm({ onSubmit }) {
  const [rating, setRating] = useState("3")
  const [energy, setEnergy] = useState("3")
  const [stress, setStress] = useState("3")
  const [notes, setNotes] = useState("")
  const [time, setTime] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      rating: Number.parseInt(rating),
      energy: Number.parseInt(energy),
      stress: Number.parseInt(stress),
      notes,
      time,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Overall Mood</Label>
          <RadioGroup value={rating} onValueChange={setRating} className="flex justify-between">
            <div className="flex flex-col items-center">
              <RadioGroupItem value="1" id="r1" className="sr-only" />
              <Label
                htmlFor="r1"
                className={`cursor-pointer rounded-full p-2 ${rating === "1" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                😞
              </Label>
              <span className="text-xs mt-1">Very Bad</span>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="2" id="r2" className="sr-only" />
              <Label
                htmlFor="r2"
                className={`cursor-pointer rounded-full p-2 ${rating === "2" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                😕
              </Label>
              <span className="text-xs mt-1">Bad</span>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="3" id="r3" className="sr-only" />
              <Label
                htmlFor="r3"
                className={`cursor-pointer rounded-full p-2 ${rating === "3" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                😐
              </Label>
              <span className="text-xs mt-1">Neutral</span>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="4" id="r4" className="sr-only" />
              <Label
                htmlFor="r4"
                className={`cursor-pointer rounded-full p-2 ${rating === "4" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                🙂
              </Label>
              <span className="text-xs mt-1">Good</span>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="5" id="r5" className="sr-only" />
              <Label
                htmlFor="r5"
                className={`cursor-pointer rounded-full p-2 ${rating === "5" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                😄
              </Label>
              <span className="text-xs mt-1">Very Good</span>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Energy Level</Label>
          <RadioGroup value={energy} onValueChange={setEnergy} className="flex justify-between">
            <div className="flex flex-col items-center">
              <RadioGroupItem value="1" id="e1" className="sr-only" />
              <Label
                htmlFor="e1"
                className={`cursor-pointer rounded-full p-2 ${energy === "1" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                1
              </Label>
              <span className="text-xs mt-1">Low</span>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="2" id="e2" className="sr-only" />
              <Label
                htmlFor="e2"
                className={`cursor-pointer rounded-full p-2 ${energy === "2" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                2
              </Label>
              <span className="text-xs mt-1"></span>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="3" id="e3" className="sr-only" />
              <Label
                htmlFor="e3"
                className={`cursor-pointer rounded-full p-2 ${energy === "3" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                3
              </Label>
              <span className="text-xs mt-1">Medium</span>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="4" id="e4" className="sr-only" />
              <Label
                htmlFor="e4"
                className={`cursor-pointer rounded-full p-2 ${energy === "4" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                4
              </Label>
              <span className="text-xs mt-1"></span>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="5" id="e5" className="sr-only" />
              <Label
                htmlFor="e5"
                className={`cursor-pointer rounded-full p-2 ${energy === "5" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                5
              </Label>
              <span className="text-xs mt-1">High</span>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Stress Level</Label>
          <RadioGroup value={stress} onValueChange={setStress} className="flex justify-between">
            <div className="flex flex-col items-center">
              <RadioGroupItem value="1" id="s1" className="sr-only" />
              <Label
                htmlFor="s1"
                className={`cursor-pointer rounded-full p-2 ${stress === "1" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                1
              </Label>
              <span className="text-xs mt-1">Low</span>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="2" id="s2" className="sr-only" />
              <Label
                htmlFor="s2"
                className={`cursor-pointer rounded-full p-2 ${stress === "2" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                2
              </Label>
              <span className="text-xs mt-1"></span>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="3" id="s3" className="sr-only" />
              <Label
                htmlFor="s3"
                className={`cursor-pointer rounded-full p-2 ${stress === "3" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                3
              </Label>
              <span className="text-xs mt-1">Medium</span>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="4" id="s4" className="sr-only" />
              <Label
                htmlFor="s4"
                className={`cursor-pointer rounded-full p-2 ${stress === "4" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                4
              </Label>
              <span className="text-xs mt-1"></span>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="5" id="s5" className="sr-only" />
              <Label
                htmlFor="s5"
                className={`cursor-pointer rounded-full p-2 ${stress === "5" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                5
              </Label>
              <span className="text-xs mt-1">High</span>
            </div>
          </RadioGroup>
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
          placeholder="Add any additional details about your mood..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full">
        Log Mood
      </Button>
    </form>
  )
}
