import type { SVGProps } from "react"

export function MotherboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <rect x="7" y="7" width="6" height="6" rx="1"/>
      <path d="M17 7v4M15 9h4"/>
      <rect x="15" y="15" width="4" height="4"/>
    </svg>
  )
}
