import { describe, expect, it } from 'vitest'
import { works } from '../content/works'
import { matchRoute, normalizePathname } from './routes'

describe('route matching', () => {
  it('normalizes extensionless and index paths', () => {
    expect(normalizePathname('/works')).toBe('/works/')
    expect(normalizePathname('/index.html')).toBe('/')
    expect(normalizePathname('/profile/index.html')).toBe('/profile/')
    expect(normalizePathname('/works/light-trail/index.html')).toBe('/works/light-trail/')
    expect(normalizePathname('/works/?category=past-game')).toBe('/works/')
  })

  it('matches a directly linked work detail', () => {
    const route = matchRoute('/works/light-trail/', works)
    expect(route.kind).toBe('work-detail')
    if (route.kind === 'work-detail') {
      expect(route.work.title).toBe('Light Trail')
    }
  })

  it('returns the recovery page for an invalid detail URL', () => {
    expect(matchRoute('/works/not-a-real-work/', works).kind).toBe('not-found')
    expect(matchRoute('/somewhere-else/', works).kind).toBe('not-found')
  })
})
