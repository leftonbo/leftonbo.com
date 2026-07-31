import { describe, expect, it } from 'vitest'
import globalCss from './global.css?raw'

describe('reduced motion styles', () => {
  it('disables motion-dependent transitions site-wide', () => {
    expect(globalCss).toContain('@media (prefers-reduced-motion: reduce)')
    expect(globalCss).toContain('animation-duration: 0.01ms !important')
  })
})
