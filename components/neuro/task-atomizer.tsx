"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, CheckCircle2, Circle } from "lucide-react"
import { useSound } from "@/hooks/use-sound"

interface MicroStep {
  id: string
  text: string
  done: boolean
}

function generateMicroSteps(goal: string): MicroStep[] {
  const lower = goal.toLowerCase()

  if (lower.includes("bug") || lower.includes("fix") || lower.includes("error") || lower.includes("debug")) {
    return [
      { id: "1", text: "Reproduce the bug in dev environment (5 min)", done: false },
      { id: "2", text: "Read error logs and isolate the root cause (5 min)", done: false },
      { id: "3", text: "Write the fix and verify with a quick test (5 min)", done: false },
    ]
  }
  if (lower.includes("email") || lower.includes("write") || lower.includes("message") || lower.includes("draft")) {
    return [
      { id: "1", text: "Jot down the 3 main points to cover (5 min)", done: false },
      { id: "2", text: "Write a rough first draft without editing (5 min)", done: false },
      { id: "3", text: "Proofread once and hit send (5 min)", done: false },
    ]
  }
  if (lower.includes("design") || lower.includes("ui") || lower.includes("page") || lower.includes("layout")) {
    return [
      { id: "1", text: "Sketch a quick wireframe on paper (5 min)", done: false },
      { id: "2", text: "Set up the basic layout structure in code (5 min)", done: false },
      { id: "3", text: "Add colors, spacing, and polish one section (5 min)", done: false },
    ]
  }
  if (lower.includes("api") || lower.includes("endpoint") || lower.includes("backend") || lower.includes("route")) {
    return [
      { id: "1", text: "Define the request/response shape (5 min)", done: false },
      { id: "2", text: "Write the route handler with basic logic (5 min)", done: false },
      { id: "3", text: "Test the endpoint with a quick curl/fetch (5 min)", done: false },
    ]
  }
  if (lower.includes("meeting") || lower.includes("prep") || lower.includes("present")) {
    return [
      { id: "1", text: "List 3 key talking points (5 min)", done: false },
      { id: "2", text: "Gather any data or links you need (5 min)", done: false },
      { id: "3", text: "Do a 2-minute dry run out loud (5 min)", done: false },
    ]
  }

  // Generic fallback
  return [
    { id: "1", text: `Open the file/tool related to "${goal.slice(0, 30)}" (5 min)`, done: false },
    { id: "2", text: "Make the first small change or write the first paragraph (5 min)", done: false },
    { id: "3", text: "Review what you did and note next steps (5 min)", done: false },
  ]
}

interface TaskAtomizerProps {
  goal: string
  onAllComplete?: () => void
}

export function TaskAtomizer({ goal, onAllComplete }: TaskAtomizerProps) {
  const [steps, setSteps] = useState<MicroStep[]>(() => generateMicroSteps(goal))
  const [showSteps, setShowSteps] = useState(false)
  const { playDing } = useSound()

  const completedCount = steps.filter((s) => s.done).length
  const allDone = completedCount === steps.length

  const toggleStep = useCallback(
    (id: string) => {
      setSteps((prev) => {
        const updated = prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
        const justCompleted = updated.find((s) => s.id === id)
        if (justCompleted?.done) {
          playDing()
        }
        if (updated.every((s) => s.done)) {
          onAllComplete?.()
        }
        return updated
      })
    },
    [playDing, onAllComplete],
  )

  const handleBreakDown = useCallback(() => {
    setSteps(generateMicroSteps(goal))
    setShowSteps(true)
  }, [goal])

  return (
    <div className="flex flex-col gap-3 w-full">
      {!showSteps ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleBreakDown}
          className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/30 py-3 px-4 text-sm font-medium text-primary/80 transition-all hover:border-primary/60 hover:text-primary"
          style={{ backgroundColor: "rgba(129, 140, 248, 0.04)" }}
        >
          <Zap className="h-4 w-4" />
          Break it Down into Micro-Steps
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Micro-Steps
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {completedCount}/{steps.length}
            </span>
          </div>

          {/* Progress bar for micro-steps */}
          <div
            className="h-1.5 rounded-full overflow-hidden mb-1"
            style={{ backgroundColor: "rgba(15, 16, 30, 0.8)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: allDone
                  ? "linear-gradient(90deg, #4ade80, #22d3ee)"
                  : "linear-gradient(90deg, #6366f1, #818cf8)",
              }}
              animate={{ width: `${(completedCount / steps.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <AnimatePresence>
            {steps.map((step, i) => (
              <motion.button
                key={step.id}
                type="button"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => toggleStep(step.id)}
                className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all"
                style={{
                  backgroundColor: step.done
                    ? "rgba(74, 222, 128, 0.06)"
                    : "rgba(15, 16, 30, 0.5)",
                  borderColor: step.done
                    ? "rgba(74, 222, 128, 0.2)"
                    : "rgba(255, 255, 255, 0.06)",
                }}
              >
                {step.done ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-muted-foreground/50" />
                )}
                <span
                  className={
                    step.done
                      ? "line-through text-muted-foreground/60"
                      : "text-foreground/90"
                  }
                >
                  {step.text}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>

          {allDone && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm font-medium text-emerald-400 mt-2"
            >
              All micro-steps complete! You are unstoppable.
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  )
}
