"use client"

import PathologyTest from '@/components/PathologyTest'

const parameters = {
  alt: {
    name: "ALT (Alanine Transaminase)",
    units: "U/L",
    min: 0,
    max: 45,
  },
  ast: {
    name: "AST (Aspartate Transaminase)",
    units: "U/L",
    min: 0,
    max: 35,
  },
  alp: {
    name: "ALP (Alkaline Phosphatase)",
    units: "U/L",
    min: 30,
    max: 120,
  },
  ggt: {
    name: "GGT (Gamma GT)",
    units: "U/L",
    min: 0,
    max: 55,
  },
  bilirubin: {
    name: "Total Bilirubin",
    units: "μmol/L",
    min: 0,
    max: 21,
  },
  albumin: {
    name: "Albumin",
    units: "g/L",
    min: 35,
    max: 50,
  }
}

const conditions = [
  {
    name: "Acute Viral Hepatitis",
    ranges: {
      alt: { min: 400, max: 2000 },
      ast: { min: 300, max: 1500 },
      alp: { min: 100, max: 200 },
      ggt: { min: 80, max: 200 },
      bilirubin: { min: 25, max: 100 },
      albumin: { min: 30, max: 45 }
    },
    description: "Marked transaminitis with ALT > AST, moderate rise in ALP/GGT, and mild hyperbilirubinemia"
  },
  {
    name: "Alcoholic Hepatitis",
    ranges: {
      alt: { min: 100, max: 300 },
      ast: { min: 200, max: 600 }, // AST:ALT ratio > 2
      alp: { min: 100, max: 300 },
      ggt: { min: 200, max: 1000 },
      bilirubin: { min: 30, max: 150 },
      albumin: { min: 25, max: 35 }
    },
    description: "AST:ALT ratio >2, marked GGT elevation, and hypoalbuminemia"
  },
  {
    name: "Primary Biliary Cholangitis",
    ranges: {
      alt: { min: 30, max: 100 },
      ast: { min: 30, max: 100 },
      alp: { min: 300, max: 1000 },
      ggt: { min: 200, max: 800 },
      bilirubin: { min: 20, max: 50 },
      albumin: { min: 30, max: 40 }
    },
    description: "Marked ALP elevation with moderate GGT rise, mild transaminitis"
  },
  {
    name: "Cirrhosis",
    ranges: {
      alt: { min: 40, max: 120 },
      ast: { min: 50, max: 150 },
      alp: { min: 80, max: 200 },
      ggt: { min: 60, max: 200 },
      bilirubin: { min: 25, max: 80 },
      albumin: { min: 20, max: 30 }
    },
    description: "Low albumin, mild-moderate elevation of all other parameters"
  }
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