"use client"

import { motion } from "framer-motion"
import { Sparkles, Brain } from "lucide-react"

interface CTASectionProps {
  onLaunch: () => void
}

export function CTASection({ onLaunch }: CTASectionProps) {
  return (
    <section id="workspace" className="relative py-24 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center gap-8 rounded-3xl border border-primary/20 p-10 sm:p-14 text-center backdrop-blur-xl overflow-hidden"
          style={{ backgroundColor: "rgba(129, 140, 248, 0.04)" }}
        >
          {/* Subtle glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: "rgba(129, 140, 248, 0.08)" }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-center gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <Brain className="h-7 w-7 text-primary" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
              Ready to reclaim your focus?
            </h2>

            <p className="text-base text-muted-foreground max-w-md text-pretty">
              Launch the NeuroCleanse workspace and experience the Chaos-to-Zen transition for yourself.
            </p>

            <button
              type="button"
              onClick={onLaunch}
              className="group relative flex items-center gap-2 rounded-xl bg-primary px-10 py-4 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" />
              Launch Workspace Now
              <div className="absolute inset-0 rounded-xl pulse-glow pointer-events-none" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center mt-16">
        <span className="text-xs text-muted-foreground/50">
          NeuroCleanse - Designed for ADHD minds
        </span>
      </div>
    </section>
  )
}
