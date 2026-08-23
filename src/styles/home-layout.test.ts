import { describe, expect, it } from 'vitest'
import componentsCss from './components.css?raw'
import homeCss from './pages/home.css?raw'
import notFoundCss from './pages/not-found.css?raw'
import profileCss from './pages/profile.css?raw'
import sharedCss from './pages/shared.css?raw'
import workDetailCss from './pages/work-detail.css?raw'

describe('home layout styles', () => {
  it('uses the dark hero composition without the former outline ornaments', () => {
    expect(homeCss).toMatch(/\.hero\s*\{[^}]*min-height: clamp\(32rem, 71vh, 45rem\);/s)
    expect(homeCss).toMatch(/\.hero h1 span\s*\{[^}]*font-size: clamp\(3\.6rem, 7\.2vw, 6\.5rem\);/s)
    expect(homeCss).toMatch(/\.hero::before\s*\{[^}]*border: 0;/s)
    expect(homeCss).toMatch(/\.hero::after\s*\{[^}]*display: none;/s)
  })

  it('keeps shared page introductions within the compact type scale', () => {
    expect(componentsCss).toMatch(
      /\.page-intro\s*\{[^}]*padding-block: clamp\(2\.5rem, 5vw, 3\.25rem\) clamp\(2rem, 4vw, 2\.5rem\);/s,
    )
    expect(componentsCss).toMatch(
      /\.page-intro h1\s*\{[^}]*font-size: clamp\(2\.5rem, 5\.5vw, 4\.75rem\);/s,
    )
  })

  it('does not retain selectors from the previous home layout', () => {
    const pageCss = [sharedCss, homeCss, workDetailCss, profileCss, notFoundCss].join('\n')
    expect(pageCss).not.toMatch(
      /\.hero__lead|\.hero__note|\.activity-index|\.links-preview(?:\s|\{|--)|\.official-link-strip/,
    )
  })
})
