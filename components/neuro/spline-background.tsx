"use client"

import dynamic from "next/dynamic"

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-background" />
  ),
})

export function SplineBackground() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Spline scene="https://prod.spline.design/EuFyVyxz7M-BFadA/scene.splinecode" />
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
