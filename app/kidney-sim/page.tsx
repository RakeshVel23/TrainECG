"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import NephronDiagram from '@/components/NephronDiagram'
import { HelpCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PhysiologyValues {
  // GFR variables
  hydrostatic_pressure: number  // mmHg
  oncotic_pressure: number      // mmHg
  bowman_pressure: number       // mmHg
  filtration_coefficient: number // ml/min/mmHg
  
  // Clearance variables
  plasma_concentration: number  // mg/ml
  urine_concentration: number   // mg/ml
  urine_flow_rate: number      // ml/min
}

export default function KidneySimulator() {
  const [values, setValues] = useState<PhysiologyValues>({
    hydrostatic_pressure: 55,    // Normal ~55 mmHg
    oncotic_pressure: 30,        // Normal ~30 mmHg
    bowman_pressure: 15,         // Normal ~15 mmHg
    filtration_coefficient: 12.5, // Normal ~12.5 ml/min/mmHg
    
    plasma_concentration: 1,     // Example value
    urine_concentration: 20,     // Example value
    urine_flow_rate: 1,         // Normal ~1 ml/min
  })

  const [gfr, setGFR] = useState(0)

  useEffect(() => {
    // Calculate GFR using the formula:
    // GFR = Kf * (ΔP - Δπ)
    // where ΔP is hydrostatic pressure difference and Δπ is oncotic pressure
    const net_pressure = (values.hydrostatic_pressure - values.bowman_pressure) - values.oncotic_pressure
    const calculated_gfr = values.filtration_coefficient * net_pressure

    setGFR(calculated_gfr)
  }, [values])

  const updateValue = (key: keyof PhysiologyValues, value: number[]) => {
    setValues(prev => ({ ...prev, [key]: value[0] }))
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Kidney Physiology Simulator</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Adjust the parameters to see how they affect Glomerular Filtration Rate (GFR).
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Center diagram */}
            <div className="mx-auto w-[500px] relative">
              <NephronDiagram values={values} gfr={gfr} />

              {/* Hydrostatic Pressure - Top Left */}
              <div className="absolute top-0 left-0 -translate-x-[60%] w-48">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">Hydrostatic Pressure</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Blood pressure in the glomerular capillaries that pushes fluid out. Normal range: 45-65 mmHg. Higher pressure increases filtration.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="p-2 rounded-lg bg-red-50 border border-red-200">
                    <Slider
                      value={[values.hydrostatic_pressure]}
                      onValueChange={(value) => updateValue('hydrostatic_pressure', value)}
                      min={0}
                      max={100}
                      step={1}
                      className="w-36"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {values.hydrostatic_pressure} mmHg
                    </p>
                  </div>
                </div>
              </div>

              {/* Oncotic Pressure - Top Right */}
              <div className="absolute top-0 right-0 translate-x-[60%] w-48">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">Oncotic Pressure</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Pressure created by plasma proteins that opposes filtration by pulling water back into capillaries. Normal range: 25-35 mmHg.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                    <Slider
                      value={[values.oncotic_pressure]}
                      onValueChange={(value) => updateValue('oncotic_pressure', value)}
                      min={0}
                      max={60}
                      step={1}
                      className="w-36"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {values.oncotic_pressure} mmHg
                    </p>
                  </div>
                </div>
              </div>

              {/* Bowman's Pressure - Middle Left */}
              <div className="absolute top-[45%] left-0 -translate-x-[60%] w-48">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">Bowman's Pressure</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Pressure within Bowman's capsule that opposes filtration. Normal range: 10-20 mmHg. Higher pressure reduces filtration.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="p-2 rounded-lg bg-yellow-50 border border-yellow-200">
                    <Slider
                      value={[values.bowman_pressure]}
                      onValueChange={(value) => updateValue('bowman_pressure', value)}
                      min={0}
                      max={30}
                      step={1}
                      className="w-36"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {values.bowman_pressure} mmHg
                    </p>
                  </div>
                </div>
              </div>

              {/* Filtration Coefficient - Middle Right */}
              <div className="absolute top-1/3 right-0 translate-x-[60%] w-48">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">Filtration Coefficient</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Measure of how easily fluid can cross the filtration barrier. Normal range: 10-15 ml/min/mmHg. Affected by surface area and membrane permeability.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-50 border border-purple-200">
                    <Slider
                      value={[values.filtration_coefficient]}
                      onValueChange={(value) => updateValue('filtration_coefficient', value)}
                      min={0}
                      max={25}
                      step={0.5}
                      className="w-36"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {values.filtration_coefficient} ml/min/mmHg
                    </p>
                  </div>
                </div>
              </div>

              {/* GFR Equation */}
              <div className="absolute top-1/2 left-0 -translate-x-[60%] w-48 mt-16">
                <div className="p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <h4 className="text-sm font-medium mb-2">GFR Equation:</h4>
                  <div className="text-xs space-y-1">
                    <p>GFR = <span className="text-purple-600">K<sub>f</sub></span> × (ΔP - <span className="text-blue-600">Δπ</span>)</p>
                    <p>where:</p>
                    <p>ΔP = <span className="text-red-600">P<sub>H</sub></span> - <span className="text-yellow-600">P<sub>B</sub></span></p>
                    <p><span className="text-red-600">P<sub>H</sub></span> = Hydrostatic Pressure</p>
                    <p><span className="text-yellow-600">P<sub>B</sub></span> = Bowman's Pressure</p>
                    <p><span className="text-blue-600">Δπ</span> = Oncotic Pressure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* GFR display */}
            <div className="mt-8 p-4 bg-muted rounded-lg max-w-md mx-auto text-center">
              <p className="font-semibold">Calculated GFR: {gfr.toFixed(1)} ml/min</p>
              <p className="text-sm text-muted-foreground">Normal range: 90-120 ml/min</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 