import type { SVGProps } from "react"

export function CaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2" width="10" height="20" rx="1"/>
      <circle cx="12" cy="7" r="1"/>
      <rect x="10" y="12" width="4" height="6" rx="1"/>
    </svg>
  )
}
