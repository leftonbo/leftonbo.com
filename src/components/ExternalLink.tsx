import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { UiIcon } from './UiIcon'

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a {...props}>
      {children}
      <UiIcon className="external-mark" name="box-arrow-up-right" width="16" height="16" />
    </a>
  )
}
