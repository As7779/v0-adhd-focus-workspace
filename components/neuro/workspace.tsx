"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sparkles, ArrowLeft, Eye, EyeOff, Shield, Target } from "lucide-react"
import { TopBar } from "./top-bar"
import { NotificationCard } from "./notification-card"
import type { NotificationItem } from "./notification-card"
import { PomodoroTimer } from "./pomodoro-timer"

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    app: "Slack",
    icon: "slack",
    title: "Lunch plans?",
    preview: "Hey, are we still on for sushi today at noon?",
    time: "2m ago",
  },
  {
    id: "2",
    app: "Gmail",
    icon: "gmail",
    title: "HR Training Reminder",
    preview: "Your compliance training is due by Friday...",
    time: "5m ago",
  },
  {
    id: "3",
    app: "Jira",
    icon: "jira",
    title: "Critical Bug in Auth Controller",
    preview: "AUTH-2847: JWT token validation failing on refresh...",
    time: "8m ago",
    isRelevant: true,
  },
  {
    id: "4",
    app: "Discord",
    icon: "discord",
    title: "Movie night poll",
    preview: "Vote for this weekend's movie: Interstellar vs...",
    time: "12m ago",
  },
  {
    id: "5",
    app: "Slack",
    icon: "slack",
    title: "Water cooler chat",
    preview: "Did anyone see the game last night? What a...",
    time: "15m ago",
  },
  {
    id: "6",
    app: "Gmail",
    icon: "gmail",
    title: "Newsletter: Weekly Digest",
    preview: "Top 10 JavaScript frameworks you should know...",
    time: "20m ago",
  },
  {
    id: "7",
    app: "Jira",
    icon: "jira",
    title: "Fix API endpoint validation",
    preview: "API-1293: Request body validation missing for /auth...",
    time: "25m ago",
    isRelevant: true,
  },
  {
    id: "8",
    app: "Slack",
    icon: "slack",
    title: "Office supply order",
    preview: "Please submit your requests for new monitors by...",
    time: "30m ago",
  },
]

export function Workspace() {
  const [focusTask, setFocusTask] = useState("")
  const [isZenMode, setIsZenMode] = useState(false)
  const [isQuietMode, setIsQuietMode] = useState(false)

  const filteredNotifications = useMemo(() => {
    if (!isZenMode || !focusTask.trim()) return MOCK_NOTIFICATIONS
    const keywords = focusTask.toLowerCase().split(/\s+/)
    return MOCK_NOTIFICATIONS.filter((n) =>
      keywords.some(
        (kw) =>
          kw.length > 2 &&
          (n.title.toLowerCase().includes(kw) ||
            n.preview.toLowerCase().includes(kw))
      )
    )
  }, [isZenMode, focusTask])

  const suppressedCount = MOCK_NOTIFICATIONS.length - filteredNotifications.length

  const handleEngage = () => {
    if (focusTask.trim()) {
      setIsZenMode(true)
    }
  }

  const handlePanic = () => {
    setIsZenMode(false)
    setIsQuietMode(false)
  }

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <TopBar isZenMode={isZenMode} suppressedCount={suppressedCount} />

      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <AnimatePresence mode="wait">
          {!isZenMode ? (
            <motion.div
              key="chaos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl flex flex-col gap-6"
            >
              {/* Focus Input */}
              <div className="flex flex-col items-center gap-3 pt-4 pb-2">
                <h1 className="text-2xl font-semibold text-foreground text-balance text-center">
                  What do you need to focus on?
                </h1>
                <p className="text-sm text-muted-foreground text-center">
                  Enter your task below and we will silence everything else.
                </p>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={focusTask}
                  onChange={(e) => setFocusTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEngage()}
                  placeholder="Enter your focus task... (e.g. Fixing API bug)"
                  className="w-full rounded-xl border border-border/50 py-4 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
                  style={{ backgroundColor: "rgba(15, 16, 30, 0.7)" }}
                />
              </div>

              <button
                type="button"
                onClick={handleEngage}
                disabled={!focusTask.trim()}
                className="group relative flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed self-center bg-primary text-primary-foreground hover:opacity-90"
              >
                <Sparkles className="h-4 w-4" />
                Engage Deep Work
                {focusTask.trim() && (
                  <div className="absolute inset-0 rounded-xl pulse-glow pointer-events-none" />
                )}
              </button>

              {/* Notification Feed */}
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-2 px-1">
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Incoming Noise
                  </span>
                  <span className="rounded-full px-2 py-0.5 text-xs font-mono text-muted-foreground border border-border/40" style={{ backgroundColor: "rgba(15, 16, 30, 0.5)" }}>
                    {MOCK_NOTIFICATIONS.length}
                  </span>
                </div>
                <AnimatePresence>
                  {MOCK_NOTIFICATIONS.map((n) => (
                    <NotificationCard key={n.id} notification={n} />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="zen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-2xl flex flex-col items-center gap-8 pt-8"
            >
              {/* Zen Header */}
              <AnimatePresence>
                {!isQuietMode && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20"
                      style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                    >
                      <Shield className="h-7 w-7 text-emerald-400" />
                    </motion.div>
                    <h2 className="text-xl font-semibold text-foreground mt-2">
                      Focus Shield Active
                    </h2>
                    <p className="text-sm text-muted-foreground text-center max-w-sm">
                      {suppressedCount} distractions suppressed. Only relevant items remain.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Primary Action Card */}
              <motion.div
                layout
                className="w-full rounded-2xl border border-primary/20 p-6 backdrop-blur-xl animate-float"
                style={{ backgroundColor: "rgba(129, 140, 248, 0.06)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-medium uppercase tracking-widest text-primary/70">
                      Active Focus
                    </span>
                    <AnimatePresence>
                      {!isQuietMode && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-lg font-semibold text-foreground"
                        >
                          {focusTask}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Relevant Cards */}
                <AnimatePresence>
                  {!isQuietMode && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-3 mt-4"
                    >
                      {filteredNotifications.map((n) => (
                        <NotificationCard key={n.id} notification={n} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Pomodoro Timer */}
              <PomodoroTimer />

              {/* Controls */}
              <div className="flex items-center gap-3 pb-8">
                <button
                  type="button"
                  onClick={() => setIsQuietMode(!isQuietMode)}
                  className="flex items-center gap-2 rounded-xl border border-border/40 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-border"
                  style={{ backgroundColor: "rgba(15, 16, 30, 0.6)" }}
                >
                  {isQuietMode ? (
                    <>
                      <Eye className="h-4 w-4" />
                      Show Details
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4" />
                      Quiet Mode
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handlePanic}
                  className="flex items-center gap-2 rounded-xl border border-destructive/30 px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:text-red-300 hover:border-destructive/50"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.06)" }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Exit Deep Work
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
