import type { SVGProps } from "react"

export function SpherTekIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2 19 6v12l-7 4-7-4V6l7-4z" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  )
}
