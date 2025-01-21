"use client"

import PathologyTest from '@/components/PathologyTest'

const parameters = {
  glucose: {
    name: "Fasting Glucose",
    units: "mmol/L",
    min: 3.9,
    max: 5.5,
  },
  hba1c: {
    name: "HbA1c",
    units: "%",
    min: 4.0,
    max: 5.6,
  },
  randomGlucose: {
    name: "Random Glucose",
    units: "mmol/L",
    min: 4.0,
    max: 7.8,
  }
}

const conditions = [
  {
    name: "Type 2 Diabetes (New)",
    ranges: {
      glucose: { min: 7.0, max: 12 },
      hba1c: { min: 6.5, max: 8.0 },
      randomGlucose: { min: 11, max: 15 }
    },
    description: "Elevated fasting glucose and HbA1c consistent with new diabetes"
  },
  {
    name: "Poor Glycemic Control",
    ranges: {
      glucose: { min: 10, max: 20 },
      hba1c: { min: 9, max: 15 },
      randomGlucose: { min: 15, max: 25 }
    },
    description: "Markedly elevated glucose and HbA1c indicating poor control"
  },
  {
    name: "Pre-diabetes",
    ranges: {
      glucose: { min: 5.6, max: 6.9 },
      hba1c: { min: 5.7, max: 6.4 },
      randomGlucose: { min: 7.8, max: 11.0 }
    },
    description: "Impaired fasting glucose and elevated HbA1c but below diabetic range"
  }
]

export default function DiabetesPage() {
  return (
    <PathologyTest
      title="Diabetes Screen"
      parameters={parameters}
      conditions={conditions}
    />
  )
} 