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

interface TestParameter {
  name: string
  units: string
  min: number
  max: number
}

interface TestResult {
  [key: string]: number
}

interface Condition {
  name: string
  ranges: {
    [key: string]: {
      min: number
      max: number
    }
  }
  description: string
}

interface PathologyTestProps {
  title: string
  parameters: { [key: string]: TestParameter }
  conditions: Condition[]
  extraSelect?: React.ReactNode
}

export default function PathologyTest({ title, parameters, conditions, extraSelect }: PathologyTestProps) {
  const [currentTest, setCurrentTest] = useState<TestResult | null>(null)
  const [currentCondition, setCurrentCondition] = useState<Condition | null>(null)
  const [userSelection, setUserSelection] = useState<string>("")
  const [feedback, setFeedback] = useState<string>("")
  const [showRanges, setShowRanges] = useState(false)
  const [showAbnormal, setShowAbnormal] = useState(true)

  const generateRandomValue = (min: number, max: number) => {
    return +(min + Math.random() * (max - min)).toFixed(2)
  }

  const generateTest = () => {
    // Randomly select a condition
    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    
    // Generate values within the condition's ranges
    const test: TestResult = {}
    Object.keys(parameters).forEach(key => {
      test[key] = generateRandomValue(
        condition.ranges[key].min,
        condition.ranges[key].max
      )
    })

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
    generateTest()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{title}</CardTitle>
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
            {/* Left side: Test Results */}
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
                        <TableCell className="font-medium">
                          {parameters[key].name}
                        </TableCell>
                        <TableCell
                          className={
                            showAbnormal && (
                              value < parameters[key].min ||
                              value > parameters[key].max
                            )
                              ? "text-red-600 font-bold"
                              : ""
                          }
                        >
                          {value}
                        </TableCell>
                        <TableCell>{parameters[key].units}</TableCell>
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
                    {Object.entries(parameters).map(([key, param]) => (
                      <div key={key} className="grid grid-cols-2">
                        <span>{param.name}</span>
                        <span>{param.min} - {param.max} {param.units}</span>
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

                {extraSelect}

                <div className="flex gap-4">
                  <Button onClick={checkAnswer} disabled={!userSelection}>
                    Check Answer
                  </Button>
                  <Button onClick={generateTest} variant="outline">
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