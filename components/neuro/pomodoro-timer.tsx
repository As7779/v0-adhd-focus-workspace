"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Play, Pause, RotateCcw } from "lucide-react"

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)

  const totalTime = 25 * 60
  const progress = ((totalTime - timeLeft) / totalTime) * 100
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const reset = useCallback(() => {
    setTimeLeft(totalTime)
    setIsRunning(false)
  }, [totalTime])

  const circumference = 2 * Math.PI * 54

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative h-36 w-36">
        <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="hsl(240 8% 18%)"
            strokeWidth="4"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="hsl(234 89% 74%)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-mono font-semibold text-foreground tabular-nums tracking-wider">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsRunning(!isRunning)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-foreground transition-colors hover:bg-secondary"
          style={{ backgroundColor: "rgba(15, 16, 30, 0.8)" }}
          aria-label={isRunning ? "Pause timer" : "Start timer"}
        >
          {isRunning ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </button>
        <button
          type="button"
          onClick={reset}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          style={{ backgroundColor: "rgba(15, 16, 30, 0.8)" }}
          aria-label="Reset timer"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
      <span className="text-xs text-muted-foreground uppercase tracking-widest">
        Pomodoro
      </span>
    </motion.div>
  )
}
