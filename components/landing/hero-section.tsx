"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowDown } from "lucide-react"
import Spline from "@splinetool/react-spline/next"

interface HeroSectionProps {
  onLaunch: () => void
}

export function HeroSection({ onLaunch }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Spline scene="https://prod.spline.design/EuFyVyxz7M-BFadA/scene.splinecode" />
        {/* Subtle overlay for readability - lighter than before to let the 3D shine */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(8, 9, 18, 0.4) 0%, rgba(8, 9, 18, 0.75) 70%, rgba(8, 9, 18, 0.92) 100%)",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-4xl mx-auto pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-2 rounded-full border border-primary/30 px-4 py-1.5 backdrop-blur-md"
          style={{ backgroundColor: "rgba(129, 140, 248, 0.08)" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-medium text-primary tracking-wide">
            ADHD-Optimized Workspace
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance leading-tight"
        >
          Silence the noise.
          <br />
          <span className="text-primary">Find your focus.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed text-pretty"
        >
          NeuroCleanse filters your digital chaos into a calm, focused workspace.
          Powered by intelligent distraction suppression designed for ADHD minds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            type="button"
            onClick={onLaunch}
            className="group relative flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            <Sparkles className="h-4 w-4" />
            Launch Workspace
            <div className="absolute inset-0 rounded-xl pulse-glow pointer-events-none" />
          </button>
          <a
            href="#features"
            className="flex items-center gap-2 rounded-xl border border-border/40 px-8 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-border backdrop-blur-md bg-transparent"
            style={{ backgroundColor: "rgba(15, 16, 30, 0.4)" }}
          >
            See How It Works
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center gap-8 sm:gap-12 mt-8"
        >
          {[
            { value: "92%", label: "Focus Improvement" },
            { value: "6x", label: "Fewer Distractions" },
            { value: "25min", label: "Pomodoro Sessions" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-12"
        >
          <a
            href="#features"
            className="flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            aria-label="Scroll to features"
          >
            <span className="text-xs tracking-widest uppercase">Explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
