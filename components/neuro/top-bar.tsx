"use client"

import { Brain, Shield, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface TopBarProps {
  isZenMode: boolean
  suppressedCount: number
}

export function TopBar({ isZenMode, suppressedCount }: TopBarProps) {
  return (
    <motion.header
      layout
      className="flex items-center justify-between px-6 py-4 backdrop-blur-xl border-b border-border/30"
      style={{ backgroundColor: "rgba(10, 11, 20, 0.6)" }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Brain className="h-6 w-6 text-primary" />
          {isZenMode && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400"
            />
          )}
        </div>
        <span className="text-lg font-semibold tracking-tight text-foreground">
          NeuroCleanse
        </span>
      </div>

      <div className="flex items-center gap-4">
        {isZenMode ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 rounded-full px-4 py-1.5 border border-emerald-500/30"
            style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
          >
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">
              {suppressedCount} distractions blocked
            </span>
          </motion.div>
        ) : (
          <div
            className="flex items-center gap-2 rounded-full px-4 py-1.5 border border-destructive/30"
            style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
          >
            <Zap className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-red-300">
              Cognitive Load: High (88%)
            </span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
          </div>
        )}
      </div>
    </motion.header>
  )
}
