"use client"

import { Suspense } from "react"
import Spline from "@splinetool/react-spline/next"

function SplineScene() {
  return (
    <Spline scene="https://prod.spline.design/EuFyVyxz7M-BFadA/scene.splinecode" />
  )
}

export function SplineBackground() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      {/* Base background color while Spline loads */}
      <div className="absolute inset-0 bg-background" />
      {/* Spline 3D scene */}
      <Suspense fallback={null}>
        <SplineScene />
      </Suspense>
      {/* Overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8, 9, 18, 0.65) 0%, rgba(8, 9, 18, 0.8) 50%, rgba(8, 9, 18, 0.92) 100%)",
        }}
      />
    </div>
  )
}
