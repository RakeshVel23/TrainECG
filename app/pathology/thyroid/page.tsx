"use client"

import PathologyTest from '@/components/PathologyTest'

const parameters = {
  tsh: {
    name: "TSH",
    units: "mU/L",
    min: 0.4,
    max: 4.0,
  },
  t4: {
    name: "Free T4",
    units: "pmol/L",
    min: 10,
    max: 20,
  },
  t3: {
    name: "Free T3",
    units: "pmol/L",
    min: 3.5,
    max: 6.5,
  }
}

const conditions = [
  {
    name: "Primary Hypothyroidism",
    ranges: {
      tsh: { min: 10, max: 100 },
      t4: { min: 5, max: 10 },
      t3: { min: 2, max: 3.5 }
    },
    description: "High TSH with low T4 and T3 indicating primary thyroid failure"
  },
  {
    name: "Graves' Disease",
    ranges: {
      tsh: { min: 0.01, max: 0.1 },
      t4: { min: 25, max: 50 },
      t3: { min: 8, max: 20 }
    },
    description: "Suppressed TSH with elevated T4 and markedly elevated T3"
  },
  {
    name: "Subclinical Hypothyroidism",
    ranges: {
      tsh: { min: 4.5, max: 10 },
      t4: { min: 10, max: 20 },
      t3: { min: 3.5, max: 6.5 }
    },
    description: "Mildly elevated TSH with normal T4 and T3"
  }
]

export default function ThyroidPage() {
  return (
    <PathologyTest
      title="Thyroid Function Tests"
      parameters={parameters}
      conditions={conditions}
    />
  )
} 