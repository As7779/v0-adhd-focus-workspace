"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Brain, Timer, EyeOff, Filter } from "lucide-react"

const features = [
  {
    icon: Filter,
    title: "Intelligent Filtering",
    description:
      "Enter your task and NeuroCleanse scans all incoming notifications, surfacing only what matters to your current focus.",
    color: "#818cf8",
  },
  {
    icon: Shield,
    title: "Focus Shield",
    description:
      "A real-time counter shows exactly how many distractions have been blocked, reinforcing your productive state.",
    color: "#34d399",
  },
  {
    icon: Zap,
    title: "Chaos-to-Zen Transition",
    description:
      "Watch irrelevant notifications sweep away with fluid animations, transforming your cluttered inbox into calm clarity.",
    color: "#f87171",
  },
  {
    icon: Timer,
    title: "Built-in Pomodoro",
    description:
      "A gentle 25-minute timer with visual progress keeps your sessions structured without adding cognitive overhead.",
    color: "#38bdf8",
  },
  {
    icon: EyeOff,
    title: "Quiet Mode",
    description:
      "Strips away all text and detail, leaving only a minimal icon of your active task for maximum distraction-free focus.",
    color: "#a78bfa",
  },
  {
    icon: Brain,
    title: "ADHD-First Design",
    description:
      "Every interaction is designed to reduce cognitive load. Clean typography, calm colors, and deliberate whitespace.",
    color: "#fbbf24",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 mb-16 text-center"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-primary">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
            Built for distracted minds
          </h2>
          <p className="text-base text-muted-foreground max-w-lg text-pretty">
            Every feature is designed to reduce noise, amplify signal, and protect your deep work sessions.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="group rounded-2xl border border-border/30 p-6 backdrop-blur-lg transition-all hover:border-border/60 cursor-default"
                style={{ backgroundColor: "rgba(15, 16, 30, 0.5)" }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                  style={{
                    backgroundColor: `${feature.color}12`,
                    color: feature.color,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
