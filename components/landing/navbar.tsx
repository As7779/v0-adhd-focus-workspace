"use client"

import { useState } from "react"
import { Brain, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NavbarProps {
  onLaunch: () => void
}

export function Navbar({ onLaunch }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl border-b border-border/20"
      style={{ backgroundColor: "rgba(10, 11, 20, 0.5)" }}
    >
      <div className="flex items-center gap-3">
        <Brain className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold tracking-tight text-foreground">
          NeuroCleanse
        </span>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Features
        </a>
        <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          How It Works
        </a>
        <a href="#workspace" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Workspace
        </a>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <button
          type="button"
          onClick={onLaunch}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Launch App
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden text-foreground"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 border-b border-border/20 backdrop-blur-xl p-6 flex flex-col gap-4 md:hidden"
            style={{ backgroundColor: "rgba(10, 11, 20, 0.95)" }}
          >
            <a href="#features" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#workspace" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Workspace
            </a>
            <button
              type="button"
              onClick={() => { setMobileOpen(false); onLaunch() }}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 w-full"
            >
              Launch App
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
