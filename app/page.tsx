"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { CTASection } from "@/components/landing/cta-section"
import { Workspace } from "@/components/neuro/workspace"

export default function Page() {
  const [showWorkspace, setShowWorkspace] = useState(false)

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {!showWorkspace ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar onLaunch={() => setShowWorkspace(true)} />
            <HeroSection onLaunch={() => setShowWorkspace(true)} />
            <FeaturesSection />
            <HowItWorksSection />
            <CTASection onLaunch={() => setShowWorkspace(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="workspace"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen"
          >
            {/* Back to landing button */}
            <button
              type="button"
              onClick={() => setShowWorkspace(false)}
              className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl border border-border/40 px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl transition-colors hover:text-foreground hover:border-border"
              style={{ backgroundColor: "rgba(15, 16, 30, 0.7)" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
            <Workspace />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
