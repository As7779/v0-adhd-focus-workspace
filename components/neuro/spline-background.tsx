"use client"

export function SplineBackground() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(234 89% 74% / 0.15), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 60%, hsl(160 60% 45% / 0.1), transparent 60%)",
        }}
      />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8, 9, 18, 0.3) 0%, rgba(8, 9, 18, 0.6) 50%, rgba(8, 9, 18, 0.85) 100%)",
        }}
      />
    </div>
  )
}
