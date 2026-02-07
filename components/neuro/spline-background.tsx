"use client"

import Spline from "@splinetool/react-spline/next"

export function SplineBackground() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Spline scene="https://prod.spline.design/EuFyVyxz7M-BFadA/scene.splinecode" />
      {/* Dark overlay to ensure readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8, 9, 18, 0.7) 0%, rgba(8, 9, 18, 0.85) 50%, rgba(8, 9, 18, 0.95) 100%)",
        }}
      />
    </div>
  )
}
