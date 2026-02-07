import { SplineBackground } from "@/components/neuro/spline-background"
import { Workspace } from "@/components/neuro/workspace"

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <SplineBackground />
      <Workspace />
    </div>
  )
}
