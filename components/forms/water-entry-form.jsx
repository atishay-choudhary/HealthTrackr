"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function WaterEntryForm({ onSubmit }) {
  const [amount, setAmount] = useState(250)
  const [unit, setUnit] = useState("ml")
  const [time, setTime] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      amount,
      unit,
      time,
    })
  }

  const handleQuickAdd = (value) => {
    setAmount(value)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="water-amount">Amount</Label>
        <div className="flex items-center gap-2">
          <Input
            id="water-amount"
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ml">ml</SelectItem>
              <SelectItem value="oz">oz</SelectItem>
              <SelectItem value="cup">cup</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Quick Add</Label>
        <div className="grid grid-cols-4 gap-2">
          <Button type="button" variant="outline" onClick={() => handleQuickAdd(250)}>
            250ml
          </Button>
          <Button type="button" variant="outline" onClick={() => handleQuickAdd(500)}>
            500ml
          </Button>
          <Button type="button" variant="outline" onClick={() => handleQuickAdd(750)}>
            750ml
          </Button>
          <Button type="button" variant="outline" onClick={() => handleQuickAdd(1000)}>
            1000ml
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Amount Slider</Label>
        <div className="flex items-center gap-4">
          <Slider min={0} max={2000} step={50} value={[amount]} onValueChange={(value) => setAmount(value[0])} />
          <span className="w-16 text-right">
            {amount}
            {unit}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Time</Label>
        <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>

      <Button type="submit" className="w-full">
        Log Water Intake
      </Button>
    </form>
  )
}
