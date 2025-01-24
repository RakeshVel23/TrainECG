"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import UnitCircle from '@/components/UnitCircle'
import QRSComplex from '@/components/QRSComplex'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

export default function ECGAxisQuiz() {
  const [qrsData, setQRSData] = useState({ leadI: 0, leadAVF: 0 })
  const [userSelection, setUserSelection] = useState<{ x: number, y: number } | null>(null)
  const [feedback, setFeedback] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [streak, setStreak] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [correctAngle, setCorrectAngle] = useState<number | null>(null)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [correctAttempts, setCorrectAttempts] = useState(0)

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  // Add useEffect to generate QRS on mount
  useEffect(() => {
    generateQRS()
  }, []) // Empty dependency array means this runs once on mount

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generateQRS = () => {
    if (!isActive) {
      setIsActive(true);
      setTimer(0);
    }
    const angle = (Math.random() * 360 - 180)
    const radians = angle * Math.PI / 180
    const leadI = Math.cos(radians)
    const leadAVF = -Math.sin(radians)
    
    setQRSData({ leadI, leadAVF })
    setUserSelection(null)
    setFeedback('')
    setCorrectAngle(null)
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
    const tolerance = Math.PI / 10

    // Convert angles to degrees for display
    const actualDegrees = Math.round((actualAngle * 180) / Math.PI)
    const userDegrees = Math.round((userAngle * 180) / Math.PI)
    setCorrectAngle(actualDegrees)
    setTotalAttempts(prev => prev + 1)

    if (difference < tolerance || difference > 2 * Math.PI - tolerance) {
      setFeedback('Correct, Great job!')
      setStreak(prev => prev + 1)
      setCorrectAttempts(prev => prev + 1)
    } else {
      setFeedback('Not quite. Try again!')
      setStreak(0)
      setIsActive(false)
      // Reset accuracy when streak ends
      setTotalAttempts(0)
      setCorrectAttempts(0)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                ECG Axis Interpretation Quiz
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-5 w-5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Click "Generate QRS Complexes" to start. Use the unit circle to indicate the mean electrical axis based on the QRS complexes shown.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium">
                Streak: <span className="text-green-600">{streak}</span>
              </div>
              <div className="text-sm font-medium">
                Accuracy: <span className="text-purple-600">
                  {totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0}%
                </span>
              </div>
              <div className="text-sm font-medium">
                Time: <span className="text-blue-600">{formatTime(timer)}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <UnitCircle onSelect={handleSelection} userSelection={userSelection} />
              <div className="absolute inset-0 pointer-events-none">
                <img 
                  src="/heart-diagram.png" 
                  alt="Heart diagram"
                  className="absolute top-[25%] left-1/2 transform -translate-x-1/2 w-24 h-24 opacity-50"
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="absolute top-[45%] left-1/2 transform translate-x-4 -translate-y-8 pointer-events-auto">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        Stenemo, CC BY-SA 4.0, via Wikimedia Commons
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={confirmSelection} 
                      className="mt-4" 
                      disabled={!userSelection || isConfirmed}
                    >
                      Confirm Selection
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to confirm your axis selection</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <div className="relative">
                <QRSComplex leadI={qrsData.leadI} leadAVF={qrsData.leadAVF} />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={generateQRS} className="mt-4 w-full">
                        Generate QRS Complexes
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Generate new QRS complexes to practice with</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {feedback && (
                <div className={`mt-4 p-3 rounded-lg text-center space-y-1 ${
                  feedback.includes('Correct') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <p className="font-bold">{feedback}</p>
                  {correctAngle !== null && (
                    <p className="text-sm">
                      {feedback.includes('Correct') 
                        ? `The axis was ${correctAngle}°` 
                        : `The correct axis was ${correctAngle}°`}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 