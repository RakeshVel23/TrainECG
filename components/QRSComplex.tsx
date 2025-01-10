"use client"

import { useRef, useEffect } from 'react'

interface QRSComplexProps {
  leadI: number
  leadAVF: number
}

const QRSComplex: React.FC<QRSComplexProps> = ({ leadI, leadAVF }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawGrid = (yOffset: number) => {
      // Draw background
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, yOffset, 200, 60)
      
      // Draw grid
      ctx.strokeStyle = '#ffebee'
      ctx.lineWidth = 0.5
      
      // Vertical lines
      for (let x = 0; x <= 200; x += 10) {
        ctx.beginPath()
        ctx.moveTo(x, yOffset)
        ctx.lineTo(x, yOffset + 60)
        ctx.stroke()
      }
      
      // Horizontal lines
      for (let y = 0; y <= 60; y += 10) {
        ctx.beginPath()
        ctx.moveTo(0, yOffset + y)
        ctx.lineTo(200, yOffset + y)
        ctx.stroke()
      }
    }

    const drawQRS = (lead: number, yOffset: number) => {
      const baseline = yOffset + 30
      const amplitude = lead * 20  // Scale factor for QRS amplitude
      
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 1.5
      
      ctx.beginPath()
      // Draw baseline
      ctx.moveTo(80, baseline)
      
      if (amplitude >= 0) {
        // Positive deflection
        ctx.lineTo(90, baseline)
        ctx.lineTo(95, baseline - amplitude)
        ctx.lineTo(100, baseline)
      } else {
        // Negative deflection
        ctx.lineTo(90, baseline)
        ctx.lineTo(95, baseline - amplitude)
        ctx.lineTo(100, baseline)
      }
      
      ctx.lineTo(110, baseline)
      ctx.stroke()
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw Lead I
    drawGrid(0)
    ctx.fillStyle = 'blue'
    ctx.font = '12px Arial'
    ctx.fillText('Lead I', 10, 20)
    drawQRS(leadI, 0)
    
    // Draw Lead aVF
    drawGrid(80)
    ctx.fillStyle = 'red'
    ctx.fillText('Lead aVF', 10, 100)
    drawQRS(-leadAVF, 80)

  }, [leadI, leadAVF])

  return <canvas ref={canvasRef} width={200} height={140} className="border" />
}

export default QRSComplex