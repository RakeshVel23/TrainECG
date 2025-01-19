"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import UnitCircle from '@/components/UnitCircle'
import QRSComplex from '@/components/QRSComplex'

export default function ECGAxisQuiz() {
  const [qrsData, setQRSData] = useState({ leadI: 0, leadAVF: 0 })
  const [userSelection, setUserSelection] = useState<{ x: number, y: number } | null>(null)
  const [feedback, setFeedback] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)

  const generateQRS = () => {
    // Generate a random angle between -180 and 180 degrees
    const angle = (Math.random() * 360 - 180)
    const radians = angle * Math.PI / 180  // Negative for clockwise rotation
    
    // Calculate Lead I and aVF components based on the angle
    const leadI = Math.cos(radians)
    const leadAVF = -Math.sin(radians)
    
    setQRSData({ leadI, leadAVF })
    setUserSelection(null)
    setFeedback('')
  }

  const handleSelection = (x: number, y: number) => {
    setUserSelection({ x, y })
    setIsConfirmed(false)
  }

  const confirmSelection = () => {
    if (userSelection) {
      checkAnswer(userSelection.x, userSelection.y)
      setIsConfirmed(true)
    }
  }

  const checkAnswer = (x: number, y: number) => {
    const actualAngle = Math.atan2(qrsData.leadAVF, qrsData.leadI)
    const userAngle = Math.atan2(y, x)
    
    const difference = Math.abs(actualAngle - userAngle)
    const tolerance = Math.PI / 10  // About 18 degrees tolerance

    if (difference < tolerance || difference > 2 * Math.PI - tolerance) {
      setFeedback('Correct, Great job!')
    } else {
      setFeedback('Not quite. Try again!')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>ECG Axis Interpretation Quiz</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Click "Generate QRS Complexes" to create new ECG data. Use the slider or click on the unit circle to indicate where you think the electrical axis is pointing based on the QRS complexes shown.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <UnitCircle onSelect={handleSelection} userSelection={userSelection} />
              <Button onClick={confirmSelection} className="mt-4" disabled={!userSelection || isConfirmed}>
                Confirm Selection
              </Button>
            </div>
            <div>
              <QRSComplex leadI={qrsData.leadI} leadAVF={qrsData.leadAVF} />
              <Button onClick={generateQRS} className="mt-4 w-full">Generate QRS Complexes</Button>
              {feedback && <p className="mt-4 text-center font-bold">{feedback}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 