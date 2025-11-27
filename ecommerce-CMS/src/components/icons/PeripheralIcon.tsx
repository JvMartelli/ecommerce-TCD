import type { SVGProps } from "react"

export function PeripheralIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="10" rx="2"/>
      <rect x="8" y="16" width="8" height="4" rx="1"/>
    </svg>
  )
}
