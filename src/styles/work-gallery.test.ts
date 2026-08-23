import { describe, expect, it } from 'vitest'
import workDetailCss from './pages/work-detail.css?raw'

describe('work gallery styles', () => {
  it('lets the gallery aspect ratio determine image height', () => {
    expect(workDetailCss).toMatch(/\.work-gallery img\s*\{[^}]*height: auto;/s)
  })
})
