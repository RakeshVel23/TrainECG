"use client"

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
      </div>
    </div>
  )
} 