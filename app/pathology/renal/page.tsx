"use client"

import PathologyTest from '@/components/PathologyTest'

const parameters = {
  sodium: {
    name: "Sodium",
    units: "mmol/L",
    min: 135,
    max: 145,
  },
  potassium: {
    name: "Potassium",
    units: "mmol/L",
    min: 3.5,
    max: 5.0,
  },
  urea: {
    name: "Urea",
    units: "mmol/L",
    min: 2.5,
    max: 7.8,
  },
  creatinine: {
    name: "Creatinine",
    units: "μmol/L",
    min: 60,
    max: 110,
  },
  urineProtein: {
    name: "Urine Protein",
    units: "g/24h",
    min: 0,
    max: 0.15,
  },
  urineNa: {
    name: "Urine Sodium",
    units: "mmol/L",
    min: 40,
    max: 220,
  }
}

const conditions = [
  {
    name: "Acute Kidney Injury",
    ranges: {
      sodium: { min: 132, max: 145 },
      potassium: { min: 5.0, max: 6.5 },
      urea: { min: 15, max: 40 },
      creatinine: { min: 200, max: 800 },
      urineProtein: { min: 0.2, max: 1.0 },
      urineNa: { min: 10, max: 30 }
    },
    description: "Acute rise in creatinine and urea with hyperkalemia and low urine sodium"
  },
  {
    name: "Nephrotic Syndrome",
    ranges: {
      sodium: { min: 135, max: 145 },
      potassium: { min: 3.5, max: 5.0 },
      urea: { min: 2.5, max: 7.8 },
      creatinine: { min: 60, max: 120 },
      urineProtein: { min: 3.5, max: 10 },
      urineNa: { min: 40, max: 220 }
    },
    description: "Heavy proteinuria with normal renal function"
  },
  {
    name: "Hypovolemia",
    ranges: {
      sodium: { min: 145, max: 155 },
      potassium: { min: 3.0, max: 3.8 },
      urea: { min: 8, max: 15 },
      creatinine: { min: 100, max: 150 },
      urineProtein: { min: 0, max: 0.15 },
      urineNa: { min: 10, max: 30 }
    },
    description: "Hypernatremia, low urine sodium, and pre-renal pattern"
  }
]

export default function RenalPage() {
  return (
    <PathologyTest
      title="Renal Profile"
      parameters={parameters}
      conditions={conditions}
    />
  )
} 