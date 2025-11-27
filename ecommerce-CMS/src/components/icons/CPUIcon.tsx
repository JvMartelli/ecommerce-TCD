import type { SVGProps } from "react"

export function CPUIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="8" y="8" width="8" height="8" rx="1"/>
      <path d="M4 2v2M8 2v2M12 2v2M16 2v2M20 2v2"/>
      <path d="M4 20v2M8 20v2M12 20v2M16 20v2M20 20v2"/>
      <path d="M2 4h2M2 8h2M2 12h2M2 16h2M2 20h2"/>
      <path d="M20 4h2M20 8h2M20 12h2M20 16h2M20 20h2"/>
    </svg>
  )
}
