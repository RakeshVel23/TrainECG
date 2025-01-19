"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

interface NephronDiagramProps {
  values: {
    hydrostatic_pressure: number
    oncotic_pressure: number
    bowman_pressure: number
    filtration_coefficient: number
  }
  gfr: number
}

export default function NephronDiagram({ values, gfr }: NephronDiagramProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        <img 
          src="/nephron-diagram.png" 
          alt="Nephron diagram showing filtration, reabsorption, secretion, and excretion processes"
          className="w-full max-w-[500px] h-auto"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="absolute bottom-0 right-0 p-1">
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                Image by Madhero88, CC BY 3.0, via Wikimedia Commons
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
} 