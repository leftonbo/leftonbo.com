import { describe, expect, it } from 'vitest'
import globalCss from './global.css?raw'
import homeCss from './pages/home.css?raw'

describe('reduced motion styles', () => {
  it('disables motion-dependent transitions site-wide', () => {
    expect(globalCss).toContain('@media (prefers-reduced-motion: reduce)')
    expect(globalCss).toContain('animation-duration: 0.01ms !important')
  })

  it('turns the wisp parade into a static three-character scene', () => {
    expect(homeCss).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*\.hero-wisp\s*\{[^}]*animation: none !important/s)
    expect(homeCss).toMatch(/\.hero-wisp:nth-child\(-n \+ 3\)\s*\{[^}]*display: block/s)
    expect(homeCss).toMatch(/\.hero-wisp__particle,[\s\S]*\.hero-wisp__body::before\s*\{[^}]*animation: none !important/s)
    expect(homeCss).toMatch(/\.hero-wisp__particle:nth-child\(1\),[\s\S]*\.hero-wisp__particle:nth-child\(2\)\s*\{[^}]*display: block/s)
    expect(homeCss).toMatch(/\.hero-wisps__control\s*\{[^}]*display: none/s)
  })
})
