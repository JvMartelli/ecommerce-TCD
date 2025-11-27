import type { SVGProps } from "react"

export function WaterCoolerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="12" r="4"/>
      <rect x="14" y="7" width="6" height="10" rx="2"/>
      <path d="M12 12h2"/>
    </svg>
  )
}
