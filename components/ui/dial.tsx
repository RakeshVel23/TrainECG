"use client"

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from "@/lib/utils"

interface DialProps {
  value: number
  min: number
  max: number
  step: number
  onValueChange: (value: number) => void
  className?: string
  label?: string
  units?: string
}

export function Dial({
  value,
  min,
  max,
  step,
  onValueChange,
  className,
  label,
  units
}: DialProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {label && <span className="text-sm font-medium">{label}</span>}
      <div className="h-20 w-20 relative">
        <div className="absolute inset-0 rounded-full border-2 border-muted-foreground/20" />
        <SliderPrimitive.Root
          className="relative flex items-center select-none touch-none h-full w-full"
          value={[value]}
          onValueChange={(values) => onValueChange(values[0])}
          min={min}
          max={max}
          step={step}
          aria-label={label}
        >
          <SliderPrimitive.Track className="relative h-full w-full rounded-full bg-muted">
            <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        </SliderPrimitive.Root>
      </div>
      <span className="text-xs text-muted-foreground">
        {value} {units}
      </span>
    </div>
  )
} 