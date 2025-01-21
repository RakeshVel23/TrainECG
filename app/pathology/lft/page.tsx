"use client"

import PathologyTest from '@/components/PathologyTest'

const parameters = {
  alt: {
    name: "ALT",
    units: "U/L",
    min: 0,
    max: 41,
  },
  ast: {
    name: "AST",
    units: "U/L",
    min: 0,
    max: 40,
  },
  // ... other LFT parameters
}

const conditions = [
  {
    name: "Acute Hepatitis",
    ranges: {
      alt: { min: 200, max: 1000 },
      ast: { min: 200, max: 1000 },
      // ... ranges for other parameters
    },
    description: "Acute inflammation of the liver with marked transaminitis"
  },
  // ... other liver conditions
]

export default function LFTPage() {
  return (
    <PathologyTest
      title="Liver Function Tests"
      parameters={parameters}
      conditions={conditions}
    />
  )
} 