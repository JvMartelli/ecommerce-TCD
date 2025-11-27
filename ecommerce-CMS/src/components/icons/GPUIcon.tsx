import type { SVGProps } from "react"

export function GPUIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="10" rx="2"/>
      <circle cx="8" cy="12" r="3"/>
      <path d="M14 9h4M14 12h4M14 15h4"/>
      <path d="M6 5v2M10 5v2"/>
      <path d="M6 17v2M10 17v2"/>
    </svg>
  )
}
