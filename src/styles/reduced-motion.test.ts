import { describe, expect, it } from 'vitest'
import componentCss from './components.css?raw'
import globalCss from './global.css?raw'

describe('reduced motion styles', () => {
  it('disables route drawing and motion-dependent transitions', () => {
    expect(globalCss).toContain('@media (prefers-reduced-motion: reduce)')
    expect(globalCss).toContain('animation-duration: 0.01ms !important')
    expect(componentCss).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.flight-map__route[\s\S]*animation: none/,
    )
  })
})
