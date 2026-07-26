import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a {...props}>
      {children}
      <span className="external-mark" aria-hidden="true">
        ↗
      </span>
    </a>
  )
}
