"use client"

import { useRef, useEffect, useState } from 'react'
import { Slider } from "@/components/ui/slider"

interface UnitCircleProps {
  onSelect: (x: number, y: number) => void
  userSelection: { x: number, y: number } | null
}

const UnitCircle: React.FC<UnitCircleProps> = ({ onSelect, userSelection }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawCircle = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw the circle
      ctx.beginPath()
      ctx.arc(150, 150, 140, 0, 2 * Math.PI)
      ctx.stroke()

      // Draw Lead I axis
      ctx.beginPath()
      ctx.moveTo(10, 150)
      ctx.lineTo(290, 150)
      ctx.stroke()
      ctx.fillText('I', 280, 140)

      // Draw Lead aVF axis
      ctx.beginPath()
      ctx.moveTo(150, 10)
      ctx.lineTo(150, 290)
      ctx.stroke()
      ctx.fillText('aVF', 160, 280)

      // Draw angle indicator line (negative angle for clockwise rotation)
      const x = Math.cos(-angle * Math.PI / 180) * 140
      const y = Math.sin(-angle * Math.PI / 180) * 140
      ctx.beginPath()
      ctx.moveTo(150, 150)
      ctx.lineTo(150 + x, 150 - y)
      ctx.strokeStyle = 'red'
      ctx.stroke()
      ctx.strokeStyle = 'black'

      // Draw angle value in a red box
      // ctx.fillStyle = 'white'
      // ctx.fillRect(10, 10, 40, 30)
      // ctx.fillStyle = 'black'
      // ctx.font = '16px Arial'
      // ctx.fillText(`${angle}°`, 15, 30)
    }

    drawCircle()
  }, [onSelect, userSelection, angle])

  const handleAngleChange = (newAngle: number[]) => {
    setAngle(newAngle[0])
    // Use negative angle for clockwise rotation
    const x = Math.cos(-newAngle[0] * Math.PI / 180)
    const y = Math.sin(-newAngle[0] * Math.PI / 180)
    onSelect(x, y)
  }

  return (
    <div className="flex flex-col gap-4">
      <canvas ref={canvasRef} width={300} height={300} />
      <div className="px-4">
        <Slider
          value={[angle]}
          onValueChange={handleAngleChange}
          min={-180}
          max={180}
          step={1}
          className="w-full"
        />
        <div className="text-center mt-2">
          Angle: {angle}°
        </div>
      </div>
    </div>
  )
}

export default UnitCircle