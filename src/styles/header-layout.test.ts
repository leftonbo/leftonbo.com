import { describe, expect, it } from 'vitest'
import componentsCss from './components.css?raw'
import pagesCss from './pages.css?raw'

describe('header layout styles', () => {
  it('uses the dark hero composition without the former outline ornaments', () => {
    expect(pagesCss).toMatch(/\/\* Home redesign \*\/[\s\S]*\.hero\s*\{[^}]*min-height: clamp\(32rem, 71vh, 45rem\);/s)
    expect(pagesCss).toMatch(/\.hero h1 span\s*\{[^}]*font-size: clamp\(3\.6rem, 7\.2vw, 6\.5rem\);/s)
    expect(pagesCss).toMatch(/\.hero::before\s*\{[^}]*border: 0;/s)
    expect(pagesCss).toMatch(/\.hero::after\s*\{[^}]*display: none;/s)
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
