import { describe, expect, it } from 'vitest'
import componentsCss from './components.css?raw'
import pagesCss from './pages.css?raw'

describe('header layout styles', () => {
  it('keeps the home hero compact on desktop viewports', () => {
    expect(pagesCss).toMatch(/\.hero\s*\{[^}]*padding-block: clamp\(2\.5rem, 6vh, 4rem\);/s)
    expect(pagesCss).toMatch(/\.hero h1 span\s*\{[^}]*font-size: clamp\(3\.25rem, 6\.4vw, 5\.5rem\);/s)
  })

  it('caps the flight map height while preserving the mobile touch target override', () => {
    expect(componentsCss).toMatch(
      /\.flight-map__preview\s*\{[^}]*min-height: clamp\(20rem, 45vh, 22rem\);/s,
    )
    expect(componentsCss).toMatch(
      /@media \(max-width: 767\.98px\)[\s\S]*?\.flight-map__stop a\s*\{[^}]*min-height: 5\.75rem;/,
    )
  })

  it('keeps shared page introductions within the compact type scale', () => {
    expect(componentsCss).toMatch(
      /\.page-intro\s*\{[^}]*padding-block: clamp\(2\.5rem, 5vw, 3\.25rem\) clamp\(2rem, 4vw, 2\.5rem\);/s,
    )
    expect(componentsCss).toMatch(
      /\.page-intro h1\s*\{[^}]*font-size: clamp\(2\.5rem, 5\.5vw, 4\.75rem\);/s,
    )
  })
})
