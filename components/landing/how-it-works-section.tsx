"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Describe your task",
    description:
      'Type what you need to focus on, like "Fixing the auth bug" or "Writing Q4 report".',
  },
  {
    number: "02",
    title: "Engage Deep Work",
    description:
      "NeuroCleanse scans all incoming notifications and filters out everything irrelevant to your task.",
  },
  {
    number: "03",
    title: "Enter the Zen",
    description:
      "Distractions dissolve away. Only task-relevant information remains, paired with a Pomodoro timer.",
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 sm:py-32 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 mb-16 text-center"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-primary">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
            Three steps to clarity
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex items-start gap-6 rounded-2xl border border-border/30 p-6 sm:p-8 backdrop-blur-lg"
              style={{ backgroundColor: "rgba(15, 16, 30, 0.5)" }}
            >
              <span className="text-4xl sm:text-5xl font-bold font-mono text-primary/20 shrink-0 leading-none">
                {step.number}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
