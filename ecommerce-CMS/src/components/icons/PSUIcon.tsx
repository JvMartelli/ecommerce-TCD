import type { SVGProps } from "react"

export function PSUIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="10" rx="2"/>
      <circle cx="8" cy="12" r="2"/>
      <path d="M14 10h4M14 14h4"/>
    </svg>
  )
}
