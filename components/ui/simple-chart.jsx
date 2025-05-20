"use client"

import { useEffect, useRef, useState } from "react"

export function SimpleChart({
  data = [],
  height = 300,
  color = "#3b82f6",
  title = "Chart",
  yAxisLabel = "",
  xAxisLabels = [],
}) {
  const canvasRef = useRef(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !canvasRef.current || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const chartHeight = canvas.height - 40 // Leave space for labels

    // Find max value for scaling
    const maxValue = Math.max(...data, 1) * 1.1 // Add 10% padding

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#ccc"
    ctx.lineWidth = 1
    ctx.moveTo(40, 10)
    ctx.lineTo(40, chartHeight + 10)
    ctx.lineTo(width - 10, chartHeight + 10)
    ctx.stroke()

    // Draw data
    if (data.length > 1) {
      const step = (width - 60) / (data.length - 1)

      // Draw line
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.moveTo(40, chartHeight + 10 - (data[0] / maxValue) * chartHeight)

      for (let i = 1; i < data.length; i++) {
        const x = 40 + i * step
        const y = chartHeight + 10 - (data[i] / maxValue) * chartHeight
        ctx.lineTo(x, y)
      }

      ctx.stroke()

      // Draw points
      for (let i = 0; i < data.length; i++) {
        const x = 40 + i * step
        const y = chartHeight + 10 - (data[i] / maxValue) * chartHeight

        ctx.beginPath()
        ctx.fillStyle = color
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw x-axis labels
      if (xAxisLabels.length === data.length) {
        ctx.fillStyle = "#666"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"

        for (let i = 0; i < data.length; i++) {
          const x = 40 + i * step
          ctx.fillText(xAxisLabels[i], x, chartHeight + 30)
        }
      }

      // Draw y-axis label
      if (yAxisLabel) {
        ctx.save()
        ctx.fillStyle = "#666"
        ctx.font = "10px sans-serif"
        ctx.translate(15, chartHeight / 2)
        ctx.rotate(-Math.PI / 2)
        ctx.textAlign = "center"
        ctx.fillText(yAxisLabel, 0, 0)
        ctx.restore()
      }
    } else if (data.length === 1) {
      // Draw single point
      const x = width / 2
      const y = chartHeight + 10 - (data[0] / maxValue) * chartHeight

      ctx.beginPath()
      ctx.fillStyle = color
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [isClient, data, color, height, yAxisLabel, xAxisLabels])

  if (!isClient) {
    return (
      <div className="w-full h-[300px] bg-muted rounded-md flex items-center justify-center">
        <div className="text-muted-foreground">Loading chart...</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="relative w-full" style={{ height: `${height}px` }}>
        <canvas ref={canvasRef} width={800} height={height} className="w-full h-full" />
      </div>
    </div>
  )
}
