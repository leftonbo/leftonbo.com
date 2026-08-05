import { describe, expect, it } from 'vitest'
import pagesCss from './pages.css?raw'

describe('work gallery styles', () => {
  it('lets the gallery aspect ratio determine image height', () => {
    expect(pagesCss).toMatch(/\.work-gallery img\s*\{[^}]*height: auto;/s)
  })
})
