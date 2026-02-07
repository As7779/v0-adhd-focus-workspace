import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  title: 'NeuroCleanse - ADHD Focus Workspace',
  description: 'An ADHD-optimized deep focus workspace that filters distractions and enhances productivity.',
}

export const viewport: Viewport = {
  themeColor: '#0a0b14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen overflow-x-hidden">{children}</body>
    </html>
  )
}
