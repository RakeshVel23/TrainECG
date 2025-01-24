"use client"

import PathologyTest from '@/components/PathologyTest'
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const parameters = {
  ph: {
    name: "pH",
    units: "",
    min: 7.35,
    max: 7.45,
  },
  pco2: {
    name: "PCO₂",
    units: "kPa",
    min: 4.7,
    max: 6.0,
  },
  po2: {
    name: "PO₂",
    units: "kPa",
    min: 10.0,
    max: 13.5,
  },
  hco3: {
    name: "HCO₃⁻",
    units: "mmol/L",
    min: 22,
    max: 26,
  },
  be: {
    name: "Base Excess",
    units: "mmol/L",
    min: -2,
    max: 2,
  }
}

const oxygenationStates = [
  {
    name: "Hypoxaemia",
    ranges: {
      po2: { min: 0, max: 10.0 }
    },
    description: "Low arterial oxygen levels"
  },
  {
    name: "Normoxaemia",
    ranges: {
      po2: { min: 10.0, max: 13.5 }
    },
    description: "Normal arterial oxygen levels"
  },
  {
    name: "Hyperoxaemia",
    ranges: {
      po2: { min: 13.5, max: 30.0 }
    },
    description: "Elevated arterial oxygen levels"
  }
]

const conditions = [
  {
    name: "Normal ABG",
    ranges: {
      ph: { min: 7.35, max: 7.45 },
      pco2: { min: 4.7, max: 6.0 },
      po2: { min: 10.0, max: 13.5 },
      hco3: { min: 22, max: 26 },
      be: { min: -2, max: 2 }
    },
    description: "All parameters within normal range"
  },
  {
    name: "Uncompensated Respiratory Acidosis",
    ranges: {
      ph: { min: 7.30, max: 7.35 },
      pco2: { min: 6.5, max: 8.0 },
      po2: { min: 8.0, max: 10.0 },
      hco3: { min: 22, max: 26 },
      be: { min: -2, max: 2 }
    },
    description: "Low pH with high PCO₂, normal HCO₃⁻ and BE"
  },
  {
    name: "Uncompensated Respiratory Alkalosis",
    ranges: {
      ph: { min: 7.45, max: 7.50 },
      pco2: { min: 3.5, max: 4.5 },
      po2: { min: 13.5, max: 15.0 },
      hco3: { min: 22, max: 26 },
      be: { min: -2, max: 2 }
    },
    description: "High pH with low PCO₂, normal HCO₃⁻ and BE"
  },
  {
    name: "Uncompensated Metabolic Acidosis",
    ranges: {
      ph: { min: 7.20, max: 7.35 },
      pco2: { min: 4.7, max: 6.0 },
      po2: { min: 10.0, max: 13.5 },
      hco3: { min: 12, max: 18 },
      be: { min: -8, max: -3 }
    },
    description: "Low pH with low HCO₃⁻ and negative BE"
  },
  {
    name: "Uncompensated Metabolic Alkalosis",
    ranges: {
      ph: { min: 7.45, max: 7.55 },
      pco2: { min: 4.7, max: 6.0 },
      po2: { min: 10.0, max: 13.5 },
      hco3: { min: 30, max: 35 },
      be: { min: 3, max: 8 }
    },
    description: "High pH with high HCO₃⁻ and positive BE"
  },
  {
    name: "Partially Compensated Respiratory Acidosis",
    ranges: {
      ph: { min: 7.35, max: 7.38 },
      pco2: { min: 6.5, max: 8.0 },
      po2: { min: 8.0, max: 10.0 },
      hco3: { min: 28, max: 32 },
      be: { min: 2, max: 6 }
    },
    description: "Near-normal pH with high PCO₂, elevated HCO₃⁻"
  },
  {
    name: "Partially Compensated Respiratory Alkalosis",
    ranges: {
      ph: { min: 7.42, max: 7.45 },
      pco2: { min: 3.5, max: 4.5 },
      po2: { min: 13.5, max: 15.0 },
      hco3: { min: 18, max: 22 },
      be: { min: -4, max: -2 }
    },
    description: "Near-normal pH with low PCO₂, reduced HCO₃⁻"
  },
  {
    name: "Partially Compensated Metabolic Acidosis",
    ranges: {
      ph: { min: 7.32, max: 7.35 },
      pco2: { min: 3.5, max: 4.5 },
      po2: { min: 10.0, max: 13.5 },
      hco3: { min: 12, max: 18 },
      be: { min: -8, max: -3 }
    },
    description: "Near-normal pH with low HCO₃⁻, compensatory low PCO₂"
  },
  {
    name: "Partially Compensated Metabolic Alkalosis",
    ranges: {
      ph: { min: 7.42, max: 7.45 },
      pco2: { min: 6.0, max: 7.0 },
      po2: { min: 10.0, max: 13.5 },
      hco3: { min: 30, max: 35 },
      be: { min: 3, max: 8 }
    },
    description: "Near-normal pH with high HCO₃⁻, compensatory high PCO₂"
  },
  {
    name: "Mixed Respiratory and Metabolic Acidosis",
    ranges: {
      ph: { min: 7.20, max: 7.30 },
      pco2: { min: 6.5, max: 8.0 },
      po2: { min: 8.0, max: 10.0 },
      hco3: { min: 15, max: 20 },
      be: { min: -8, max: -4 }
    },
    description: "Low pH with both high PCO₂ and low HCO₃⁻"
  },
  {
    name: "Mixed Respiratory and Metabolic Alkalosis",
    ranges: {
      ph: { min: 7.50, max: 7.60 },
      pco2: { min: 3.5, max: 4.5 },
      po2: { min: 13.5, max: 15.0 },
      hco3: { min: 28, max: 32 },
      be: { min: 3, max: 8 }
    },
    description: "High pH with both low PCO₂ and high HCO₃⁻"
  },
  {
    name: "Fully Compensated Respiratory/Metabolic Acidosis",
    ranges: {
      ph: { min: 7.35, max: 7.45 },
      pco2: { min: 3.5, max: 8.0 },
      po2: { min: 8.0, max: 13.5 },
      hco3: { min: 12, max: 32 },
      be: { min: -8, max: 6 }
    },
    description: "Normal pH with either high PCO₂ with high HCO₃⁻, or low HCO₃⁻ with low PCO₂"
  },
  {
    name: "Fully Compensated Respiratory/Metabolic Alkalosis",
    ranges: {
      ph: { min: 7.35, max: 7.45 },
      pco2: { min: 3.5, max: 7.0 },
      po2: { min: 10.0, max: 15.0 },
      hco3: { min: 18, max: 35 },
      be: { min: -4, max: 8 }
    },
    description: "Normal pH with either low PCO₂ with low HCO₃⁻, or high HCO₃⁻ with high PCO₂"
  }
]

function InterpretationGuide() {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg mb-3">Interpretation Steps</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <span className="font-medium">Step 1:</span> Assess pH
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Normal: 7.35-7.45</p>
                      <p>Acidemia: &lt;7.35</p>
                      <p>Alkalemia: &gt;7.45</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Step 2:</span> Check PCO₂
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Normal: 4.7-6.0 kPa</p>
                      <p>Respiratory component if abnormal</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Step 3:</span> Check Base Excess
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Normal: -2 to +2 mmol/L</p>
                      <p>Metabolic component if abnormal</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Step 4:</span> Check PO₂
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Normal: 10.0-13.5 kPa</p>
                      <p>Assess oxygenation status</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg mb-3">Quick Reference</h3>
            <div className="text-sm space-y-1">
              <p>• Respiratory acidosis: ↑PCO₂</p>
              <p>• Respiratory alkalosis: ↓PCO₂</p>
              <p>• Metabolic acidosis: ↓BE, ↓HCO₃⁻</p>
              <p>• Metabolic alkalosis: ↑BE, ↑HCO₃⁻</p>
              <p>• Compensation: Body's response to normalize pH</p>
              <p>• Mixed disorder: Multiple primary abnormalities</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ABGPage() {
  const [showGuide, setShowGuide] = useState(false)
  const [oxygenationState, setOxygenationState] = useState("")

  return (
    <div className="space-y-6">
      <PathologyTest
        title="Arterial Blood Gas Interpreter"
        parameters={parameters}
        conditions={conditions}
        extraSelect={
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Oxygenation Status</Label>
              <Select onValueChange={setOxygenationState} value={oxygenationState}>
                <SelectTrigger>
                  <SelectValue placeholder="Assess oxygenation..." />
                </SelectTrigger>
                <SelectContent>
                  {oxygenationStates.map((state) => (
                    <SelectItem key={state.name} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="show-guide"
                checked={showGuide}
                onCheckedChange={setShowGuide}
              />
              <Label htmlFor="show-guide">Show Interpretation Guide</Label>
            </div>
          </div>
        }
      />

      {showGuide && <InterpretationGuide />}
    </div>
  )
} 