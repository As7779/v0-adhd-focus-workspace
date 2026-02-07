"use client"

import { motion } from "framer-motion"
import { MessageSquare, Mail, Trello, Gamepad2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface NotificationItem {
  id: string
  app: string
  icon: string
  title: string
  preview: string
  time: string
  isRelevant?: boolean
  actionTag: "ACTION NEEDED" | "INFO ONLY" | "FYI" | "URGENT"
  summary: string
}

const iconMap: Record<string, LucideIcon> = {
  slack: MessageSquare,
  gmail: Mail,
  jira: Trello,
  discord: Gamepad2,
}

const colorMap: Record<string, string> = {
  slack: "#818cf8",
  gmail: "#f87171",
  jira: "#38bdf8",
  discord: "#a78bfa",
}

const tagStyles: Record<string, { bg: string; text: string; border: string }> = {
  "ACTION NEEDED": {
    bg: "rgba(251, 146, 60, 0.12)",
    text: "#fb923c",
    border: "rgba(251, 146, 60, 0.3)",
  },
  URGENT: {
    bg: "rgba(248, 113, 113, 0.12)",
    text: "#f87171",
    border: "rgba(248, 113, 113, 0.3)",
  },
  "INFO ONLY": {
    bg: "rgba(129, 140, 248, 0.12)",
    text: "#818cf8",
    border: "rgba(129, 140, 248, 0.3)",
  },
  FYI: {
    bg: "rgba(74, 222, 128, 0.12)",
    text: "#4ade80",
    border: "rgba(74, 222, 128, 0.3)",
  },
}

interface NotificationCardProps {
  notification: NotificationItem
}

export function NotificationCard({ notification }: NotificationCardProps) {
  const Icon = iconMap[notification.icon] || MessageSquare
  const color = colorMap[notification.icon] || "#818cf8"
  const tag = tagStyles[notification.actionTag] || tagStyles["INFO ONLY"]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20, filter: "blur(8px)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative rounded-xl border border-border/40 p-4 backdrop-blur-lg transition-colors hover:border-primary/30 cursor-default"
      style={{ backgroundColor: "rgba(15, 16, 30, 0.6)" }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${color}15`, color }}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {notification.app}
              </span>
              <span
                className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: tag.bg,
                  color: tag.text,
                  border: `1px solid ${tag.border}`,
                }}
              >
                {notification.actionTag}
              </span>
            </div>
            <span className="text-xs text-muted-foreground/60 shrink-0">
              {notification.time}
            </span>
          </div>
          <p className="mt-1.5 text-sm font-medium text-foreground/90 leading-relaxed">
            {notification.summary}
          </p>
        </div>
      </div>
      {notification.isRelevant && (
        <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-emerald-400" />
      )}
    </motion.div>
  )
}
