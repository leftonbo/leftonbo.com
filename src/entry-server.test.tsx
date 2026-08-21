import { describe, expect, it } from 'vitest'
import { renderPage } from './entry-server'

describe('server page rendering', () => {
  it('keeps JSON-LD while using shared metadata', () => {
    const page = renderPage('/works/light-trail/')

    expect(page.head.title).toBe('Light Trail｜LefTonbo')
    expect(page.jsonLd).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
    })
  })

  it('keeps noindex metadata and WebPage JSON-LD for the 404 route', () => {
    const page = renderPage('/404.html')

    expect(page.head.noindex).toBe(true)
    expect(page.jsonLd).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
    })
  })
})
