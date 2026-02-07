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

interface NotificationCardProps {
  notification: NotificationItem
}

export function NotificationCard({ notification }: NotificationCardProps) {
  const Icon = iconMap[notification.icon] || MessageSquare
  const color = colorMap[notification.icon] || "#818cf8"

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
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {notification.app}
            </span>
            <span className="text-xs text-muted-foreground/60">
              {notification.time}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-foreground leading-snug truncate">
            {notification.title}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground truncate">
            {notification.preview}
          </p>
        </div>
      </div>
      {notification.isRelevant && (
        <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary" />
      )}
    </motion.div>
  )
}
