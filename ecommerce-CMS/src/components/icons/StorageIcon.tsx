import type { SVGProps } from "react"

export function StorageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 4v2M12 18v2"/>
    </svg>
  )
}
