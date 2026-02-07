"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw, Droplets, Wind, StretchHorizontal } from "lucide-react"
import { useSound } from "@/hooks/use-sound"

interface PomodoroTimerProps {
  onRewardDismiss?: () => void
}

export function PomodoroTimer({ onRewardDismiss }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const { playClick, playReward } = useSound()

  const totalTime = 25 * 60
  const progress = ((totalTime - timeLeft) / totalTime) * 100
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsRunning(false)
          setShowReward(true)
          playReward()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, playReward])

  const reset = useCallback(() => {
    setTimeLeft(totalTime)
    setIsRunning(false)
    setShowReward(false)
  }, [totalTime])

  const handleStart = useCallback(() => {
    if (!isRunning) playClick()
    setIsRunning(!isRunning)
  }, [isRunning, playClick])

  const handleRewardSelect = useCallback(
    (reward: string) => {
      setShowReward(false)
      setTimeLeft(5 * 60)
      setIsRunning(false)
      onRewardDismiss?.()
      void reward
    },
    [onRewardDismiss],
  )

  const circumference = 2 * Math.PI * 54

  const rewards = [
    { label: "Drink Water", icon: Droplets, color: "#38bdf8" },
    { label: "2-min Stretch", icon: StretchHorizontal, color: "#4ade80" },
    { label: "Deep Breath", icon: Wind, color: "#a78bfa" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-5 w-full"
    >
      <AnimatePresence mode="wait">
        {showReward ? (
          <motion.div
            key="reward"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-5 w-full max-w-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-4xl"
              role="img"
              aria-label="Celebration"
            >
              <span className="block text-center text-2xl font-bold text-emerald-400">
                Session Complete
              </span>
            </motion.div>

            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Time for a dopamine reset. Pick your quick reward:
            </p>

            <div className="flex flex-col gap-3 w-full">
              {rewards.map((reward, i) => {
                const RewardIcon = reward.icon
                return (
                  <motion.button
                    key={reward.label}
                    type="button"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    onClick={() => handleRewardSelect(reward.label)}
                    className="flex items-center gap-3 rounded-xl border border-border/40 px-4 py-3.5 text-sm font-medium text-foreground/90 backdrop-blur-lg transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: "rgba(15, 16, 30, 0.7)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${reward.color}50`
                      e.currentTarget.style.backgroundColor = `${reward.color}08`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = ""
                      e.currentTarget.style.backgroundColor =
                        "rgba(15, 16, 30, 0.7)"
                    }}
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${reward.color}15` }}
                    >
                      <RewardIcon
                        className="h-4 w-4"
                        style={{ color: reward.color }}
                      />
                    </div>
                    {reward.label}
                  </motion.button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={reset}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
            >
              Skip and reset timer
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="timer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-5"
          >
            {/* Circular timer */}
            <div className="relative h-36 w-36">
              <svg
                className="h-36 w-36 -rotate-90"
                viewBox="0 0 120 120"
                role="img"
                aria-label={`Timer: ${minutes} minutes ${seconds} seconds remaining`}
              >
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="hsl(240 8% 14%)"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke={
                    progress > 80
                      ? "hsl(142 71% 45%)"
                      : progress > 50
                        ? "hsl(47 96% 53%)"
                        : "hsl(234 89% 74%)"
                  }
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference - (progress / 100) * circumference
                  }
                  transition={{ duration: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-mono font-semibold text-foreground tabular-nums tracking-wider">
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Dopamine Progress Bar */}
            <div className="w-full max-w-[200px] flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Dopamine Progress
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(15, 16, 30, 0.8)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      progress > 80
                        ? "linear-gradient(90deg, #818cf8, #4ade80)"
                        : progress > 50
                          ? "linear-gradient(90deg, #818cf8, #facc15)"
                          : "linear-gradient(90deg, #6366f1, #818cf8)",
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground/70 text-center">
                {progress < 25
                  ? "Just getting started..."
                  : progress < 50
                    ? "Building momentum..."
                    : progress < 75
                      ? "In the zone!"
                      : progress < 100
                        ? "Almost there! Keep going!"
                        : "Done!"}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleStart}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-foreground transition-colors hover:border-primary/50"
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:text-foreground hover:border-border"
                style={{ backgroundColor: "rgba(15, 16, 30, 0.8)" }}
                aria-label="Reset timer"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Focus Timer
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
