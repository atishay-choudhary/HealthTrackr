"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function FoodEntryForm({ onSubmit }) {
  const [foodName, setFoodName] = useState("")
  const [mealType, setMealType] = useState("breakfast")
  const [calories, setCalories] = useState(0)
  const [protein, setProtein] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [fat, setFat] = useState(0)
  const [notes, setNotes] = useState("")
  const [time, setTime] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      foodName,
      mealType,
      calories,
      protein,
      carbs,
      fat,
      notes,
      time,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="food-name">Food Name</Label>
          <Input
            id="food-name"
            placeholder="e.g., Grilled Chicken Salad"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meal-type">Meal Type</Label>
          <Select value={mealType} onValueChange={setMealType}>
            <SelectTrigger id="meal-type">
              <SelectValue placeholder="Select meal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="calories">Calories (kcal)</Label>
          <Input
            id="calories"
            type="number"
            min="0"
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Macronutrients (g)</Label>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="protein">Protein</Label>
              <span>{protein}g</span>
            </div>
            <Slider
              id="protein"
              min={0}
              max={100}
              step={1}
              value={[protein]}
              onValueChange={(value) => setProtein(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="carbs">Carbs</Label>
              <span>{carbs}g</span>
            </div>
            <Slider
              id="carbs"
              min={0}
              max={200}
              step={1}
              value={[carbs]}
              onValueChange={(value) => setCarbs(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="fat">Fat</Label>
              <span>{fat}g</span>
            </div>
            <Slider id="fat" min={0} max={100} step={1} value={[fat]} onValueChange={(value) => setFat(value[0])} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Add any additional details about this meal..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full">
        Log Food Entry
      </Button>
    </form>
  )
}
