"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface BloodTest {
  hb: number          // Haemoglobin (g/L)
  wbc: number         // White Blood Cells (×10^9/L)
  plt: number         // Platelets (×10^9/L)
  mcv: number         // Mean Corpuscular Volume (fL)
  mch: number         // Mean Corpuscular Haemoglobin (pg)
  mchc: number        // Mean Corpuscular Haemoglobin Concentration (g/L)
  neutrophils: number // Neutrophils (×10^9/L)
  lymphocytes: number // Lymphocytes (×10^9/L)
  monocytes: number   // Monocytes (×10^9/L)
  eosinophils: number // Eosinophils (×10^9/L)
  basophils: number   // Basophils (×10^9/L)
}

interface Condition {
  name: string
  ranges: {
    [K in keyof BloodTest]: {
      min: number
      max: number
    }
  }
  description: string
}

const conditions: Condition[] = [
  {
    name: "Iron Deficiency Anaemia",
    ranges: {
      hb: { min: 70, max: 110 },    // Low
      wbc: { min: 4, max: 11 },     // Normal
      plt: { min: 150, max: 450 },  // Normal
      mcv: { min: 60, max: 75 },    // Low
      mch: { min: 19, max: 25 },    // Low
      mchc: { min: 300, max: 320 }, // Low-Normal
      neutrophils: { min: 2, max: 7.5 },
      lymphocytes: { min: 1.5, max: 4.5 },
      monocytes: { min: 0.2, max: 0.8 },
      eosinophils: { min: 0.04, max: 0.4 },
      basophils: { min: 0.01, max: 0.1 }
    },
    description: "Microcytic anaemia caused by iron deficiency. Characterized by low Hb, MCV, and MCH."
  },
  {
    name: "B12/Folate Deficiency",
    ranges: {
      hb: { min: 80, max: 110 },    // Low
      wbc: { min: 2, max: 4 },      // Low
      plt: { min: 100, max: 150 },  // Low
      mcv: { min: 100, max: 120 },  // High
      mch: { min: 34, max: 40 },    // High
      mchc: { min: 320, max: 360 }, // Normal-High
      neutrophils: { min: 1.5, max: 3 },
      lymphocytes: { min: 1, max: 2 },
      monocytes: { min: 0.2, max: 0.8 },
      eosinophils: { min: 0.04, max: 0.4 },
      basophils: { min: 0.01, max: 0.1 }
    },
    description: "Macrocytic anaemia due to B12 or folate deficiency. Shows pancytopenia with high MCV."
  },
  {
    name: "Acute Myeloid Leukaemia",
    ranges: {
      hb: { min: 70, max: 100 },     // Low
      wbc: { min: 50, max: 200 },    // Very High
      plt: { min: 20, max: 100 },    // Low
      mcv: { min: 80, max: 100 },    // Normal
      mch: { min: 27, max: 32 },     // Normal
      mchc: { min: 320, max: 360 },  // Normal
      neutrophils: { min: 30, max: 150 },
      lymphocytes: { min: 1, max: 4 },
      monocytes: { min: 5, max: 20 },
      eosinophils: { min: 0.04, max: 0.4 },
      basophils: { min: 0.01, max: 0.1 }
    },
    description: "Characterized by very high WBC with blast cells, anaemia, and thrombocytopenia."
  },
  {
    name: "Chronic Lymphocytic Leukaemia",
    ranges: {
      hb: { min: 90, max: 120 },    // Mild Low
      wbc: { min: 30, max: 200 },   // High
      plt: { min: 100, max: 300 },  // Normal-Low
      mcv: { min: 80, max: 100 },   // Normal
      mch: { min: 27, max: 32 },    // Normal
      mchc: { min: 320, max: 360 }, // Normal
      neutrophils: { min: 2, max: 7 },
      lymphocytes: { min: 25, max: 150 },
      monocytes: { min: 0.2, max: 0.8 },
      eosinophils: { min: 0.04, max: 0.4 },
      basophils: { min: 0.01, max: 0.1 }
    },
    description: "Characterized by lymphocytosis with mature-appearing lymphocytes."
  },
  {
    name: "Thalassemia Trait",
    ranges: {
      hb: { min: 90, max: 120 },    // Mild Low
      wbc: { min: 4, max: 11 },     // Normal
      plt: { min: 150, max: 450 },  // Normal
      mcv: { min: 60, max: 75 },    // Low
      mch: { min: 19, max: 25 },    // Low
      mchc: { min: 300, max: 320 }, // Low-Normal
      neutrophils: { min: 2, max: 7.5 },
      lymphocytes: { min: 1.5, max: 4.5 },
      monocytes: { min: 0.2, max: 0.8 },
      eosinophils: { min: 0.04, max: 0.4 },
      basophils: { min: 0.01, max: 0.1 }
    },
    description: "Microcytic anaemia with normal iron studies. Typically milder than iron deficiency."
  },
  {
    name: "Aplastic Anaemia",
    ranges: {
      hb: { min: 60, max: 90 },     // Very Low
      wbc: { min: 1, max: 3 },      // Very Low
      plt: { min: 10, max: 50 },    // Very Low
      mcv: { min: 80, max: 100 },   // Normal
      mch: { min: 27, max: 32 },    // Normal
      mchc: { min: 320, max: 360 }, // Normal
      neutrophils: { min: 0.5, max: 1.5 },
      lymphocytes: { min: 0.5, max: 1.5 },
      monocytes: { min: 0.1, max: 0.3 },
      eosinophils: { min: 0.02, max: 0.2 },
      basophils: { min: 0.01, max: 0.05 }
    },
    description: "Pancytopenia with normal cell morphology due to bone marrow failure."
  }
]

const normalRanges = {
  hb: { min: 130, max: 170, units: "g/L" },
  wbc: { min: 4, max: 11, units: "×10^9/L" },
  plt: { min: 150, max: 450, units: "×10^9/L" },
  mcv: { min: 80, max: 100, units: "fL" },
  mch: { min: 27, max: 32, units: "pg" },
  mchc: { min: 320, max: 360, units: "g/L" },
  neutrophils: { min: 2, max: 7.5, units: "×10^9/L" },
  lymphocytes: { min: 1.5, max: 4.5, units: "×10^9/L" },
  monocytes: { min: 0.2, max: 0.8, units: "×10^9/L" },
  eosinophils: { min: 0.04, max: 0.4, units: "×10^9/L" },
  basophils: { min: 0.01, max: 0.1, units: "×10^9/L" }
}

export default function BloodTestInterpreter() {
  const [currentTest, setCurrentTest] = useState<BloodTest | null>(null)
  const [currentCondition, setCurrentCondition] = useState<Condition | null>(null)
  const [userSelection, setUserSelection] = useState<string>("")
  const [feedback, setFeedback] = useState<string>("")
  const [showRanges, setShowRanges] = useState(false)
  const [showAbnormal, setShowAbnormal] = useState(true)

  const generateRandomValue = (min: number, max: number) => {
    return +(min + Math.random() * (max - min)).toFixed(2)
  }

  const generateBloodTest = () => {
    // Randomly select a condition
    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    
    // Generate values within the condition's ranges
    const test: BloodTest = {
      hb: generateRandomValue(condition.ranges.hb.min, condition.ranges.hb.max),
      wbc: generateRandomValue(condition.ranges.wbc.min, condition.ranges.wbc.max),
      plt: generateRandomValue(condition.ranges.plt.min, condition.ranges.plt.max),
      mcv: generateRandomValue(condition.ranges.mcv.min, condition.ranges.mcv.max),
      mch: generateRandomValue(condition.ranges.mch.min, condition.ranges.mch.max),
      mchc: generateRandomValue(condition.ranges.mchc.min, condition.ranges.mchc.max),
      neutrophils: generateRandomValue(condition.ranges.neutrophils.min, condition.ranges.neutrophils.max),
      lymphocytes: generateRandomValue(condition.ranges.lymphocytes.min, condition.ranges.lymphocytes.max),
      monocytes: generateRandomValue(condition.ranges.monocytes.min, condition.ranges.monocytes.max),
      eosinophils: generateRandomValue(condition.ranges.eosinophils.min, condition.ranges.eosinophils.max),
      basophils: generateRandomValue(condition.ranges.basophils.min, condition.ranges.basophils.max),
    }

    setCurrentTest(test)
    setCurrentCondition(condition)
    setUserSelection("")
    setFeedback("")
  }

  const checkAnswer = () => {
    if (currentCondition && userSelection === currentCondition.name) {
      setFeedback("Correct! " + currentCondition.description)
    } else {
      setFeedback("Incorrect. Try again!")
    }
  }

  // Generate initial test on mount
  useEffect(() => {
    generateBloodTest()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Blood Test Interpreter</CardTitle>
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-abnormal"
                  checked={showAbnormal}
                  onCheckedChange={setShowAbnormal}
                />
                <Label htmlFor="show-abnormal">Highlight Abnormal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-ranges"
                  checked={showRanges}
                  onCheckedChange={setShowRanges}
                />
                <Label htmlFor="show-ranges">Show Reference Ranges</Label>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side: Blood Test Results */}
            <div>
              {currentTest && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test</TableHead>
                      <TableCell>Result</TableCell>
                      <TableCell>Units</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(currentTest).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium">{key.toUpperCase()}</TableCell>
                        <TableCell
                          className={
                            showAbnormal && (
                              value < normalRanges[key as keyof BloodTest].min ||
                              value > normalRanges[key as keyof BloodTest].max
                            )
                              ? "text-red-600 font-bold"
                              : ""
                          }
                        >
                          {value}
                        </TableCell>
                        <TableCell>{normalRanges[key as keyof BloodTest].units}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            {/* Right side: Reference Ranges and Diagnosis */}
            <div className="space-y-6">
              {showRanges && (
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Reference Ranges</h3>
                  <div className="text-sm space-y-1">
                    {Object.entries(normalRanges).map(([key, range]) => (
                      <div key={key} className="grid grid-cols-2">
                        <span>{key.toUpperCase()}</span>
                        <span>{range.min} - {range.max} {range.units}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Select onValueChange={setUserSelection} value={userSelection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select diagnosis..." />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition.name} value={condition.name}>
                        {condition.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-4">
                  <Button onClick={checkAnswer} disabled={!userSelection}>
                    Check Answer
                  </Button>
                  <Button onClick={generateBloodTest} variant="outline">
                    New Case
                  </Button>
                </div>

                {feedback && (
                  <div className={`p-4 rounded-lg ${
                    feedback.includes("Correct") ? "bg-green-100" : "bg-red-100"
                  }`}>
                    {feedback}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 