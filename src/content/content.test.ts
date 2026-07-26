import { describe, expect, it } from 'vitest'
import { getStaticRoutePaths } from '../app/routes'
import {
  creativeWorkJsonLd,
  getMachineReadableFiles,
  personJsonLd,
  profilePageJsonLd,
  worksCollectionJsonLd,
} from '../machine-readable'
import { externalLinks, siteProfile } from './site'
import { collectContentValidationIssues, EXPECTED_WORK_COUNT_BY_CATEGORY } from './validate'
import { works } from './works'

describe('canonical content', () => {
  it('passes the runtime schema and publication allowlist', () => {
    expect(collectContentValidationIssues()).toEqual([])
    expect(works).toHaveLength(30)
  })

  it('contains exactly the approved category counts', () => {
    for (const [category, expectedCount] of Object.entries(EXPECTED_WORK_COUNT_BY_CATEGORY)) {
      expect(works.filter((work) => work.category === category)).toHaveLength(expectedCount)
    }
  })

  it('describes the portfolio without asserting current activity', () => {
    expect(siteProfile.summary).toContain('ポートフォリオ')
    expect(siteProfile.summary).not.toMatch(/活動中|取り組んでいます/)
  })

  it('publishes Notion-backed dates and WebP media without inventing missing facts', () => {
    for (const work of works) {
      expect(work).toHaveProperty('period')
      expect(work).toHaveProperty('firstPublishedAt')
      expect(Array.isArray(work.media)).toBe(true)
      for (const media of work.media) {
        expect(media.url).toMatch(/^\/images\/works\/.+\.webp$/)
      }
    }

    expect(works.find((work) => work.id === 'tonbo-battlefield-shadow-valley')?.period).toBe('2022')
    expect(works.find((work) => work.id === 'tonbo-werewolf')?.firstPublishedAt).toBe('2020-09-24')
    expect(works.find((work) => work.id === 'light-trail')?.firstPublishedAt).toBe('2018-05-29')
    expect(works.find((work) => work.id === 'gabugabu-specter')?.firstPublishedAt).toBe('2023-12-02')
    expect(works.find((work) => work.id === 'kawauchi-board-game-world')?.period).toBe('2024')
    expect(works.find((work) => work.id === 'sajak-sahagin-v3')?.period).toBe('2023')
    expect(works.find((work) => work.id === 'light-trail')?.period).toBe('2018')
    expect(works.find((work) => work.id === 'tonbo-werewolf')?.media).toHaveLength(2)
    expect(works.find((work) => work.id === 'light-trail')?.media).toHaveLength(5)
    expect(works.find((work) => work.id === 'ball-maze')?.media).toHaveLength(0)
    expect(works.find((work) => work.id === 'ball-maze')?.factsPending).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'media' })]),
    )
  })

  it('splits the former old-game collection and integrates Vket records into works', () => {
    expect(works.some((work) => work.id === 'older-games')).toBe(false)
    expect(works.filter((work) => work.category === 'past-game')).toHaveLength(14)
    expect(works.filter((work) => work.category === 'vket')).toHaveLength(6)
    expect(works).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'rocket-lunch-iyaa' }),
        expect.objectContaining({ id: 'super-block-break' }),
        expect.objectContaining({ id: 'vket-2026-summer' }),
      ]),
    )
  })

  it('keeps old sites and non-approved works out of public data', () => {
    const serialized = JSON.stringify({ works, externalLinks })
    expect(serialized).not.toContain('houmotsuko.net')
    expect(serialized).not.toContain('TorchBreath')
    expect(serialized).not.toContain('eel-rpg-game')
  })

  it('uses valid HTTPS URLs for every external destination', () => {
    const urls = [
      ...externalLinks.map((link) => link.url),
      ...works.flatMap((work) => [work.url, ...work.sources.map((source) => source.url)]),
    ]

    for (const url of urls) {
      expect(new URL(url).protocol).toBe('https:')
    }
  })

  it('generates a static route for every approved work', () => {
    const routes = getStaticRoutePaths(works)
    expect(routes).toHaveLength(works.length + 5)
    expect(routes).toContain('/404.html')
    for (const work of works) {
      expect(routes).toContain(`/works/${work.slug}/`)
    }
  })

  it('generates machine-readable profile, works, sitemap and llms files from the same data', () => {
    const files = getMachineReadableFiles()
    expect(Object.keys(files)).toEqual(
      expect.arrayContaining([
        'data/profile.json',
        'data/works.json',
        'profile.md',
        'works.md',
        'sitemap.xml',
        'robots.txt',
        'llms.txt',
      ]),
    )
    const worksJson = JSON.parse(files['data/works.json'] ?? '{}') as {
      count?: number
      siteUpdatedAt?: string
      works?: Array<{ firstPublishedAt?: string | null; period?: string | null; media?: unknown[] }>
    }
    expect(worksJson.count).toBe(works.length)
    expect(worksJson.siteUpdatedAt).toBe(siteProfile.updatedAt)
    expect(
      worksJson.works?.every(
        (work) => 'firstPublishedAt' in work && 'period' in work && Array.isArray(work.media),
      ),
    ).toBe(true)
    expect(files['sitemap.xml']).toContain('/works/tonbo-werewolf/')
    expect(files['sitemap.xml']).toContain('/works/super-block-break/')
    expect(files['sitemap.xml']).toContain('/works/vket-2026-summer/')
    expect(files['llms.txt']).toContain('/data/profile.json')
    expect(files['profile.md']).toContain('[GitHub]')
    expect(`${files['profile.md']}\n${files['works.md']}\n${files['llms.txt']}`).not.toMatch(
      /本人確認|確認日|稼働状態|断定/,
    )
    expect(worksJson).not.toHaveProperty('verifiedAt')
    expect(worksJson.works?.every((work) => !('status' in work))).toBe(true)
  })

  it('publishes page update dates without data verification dates', () => {
    const files = getMachineReadableFiles()
    expect(profilePageJsonLd().dateModified).toBe(siteProfile.updatedAt)
    expect(worksCollectionJsonLd().dateModified).toBe(siteProfile.updatedAt)
    expect(files['sitemap.xml']).toContain(`<lastmod>${siteProfile.updatedAt}</lastmod>`)
    expect(files['profile.md']).toContain(`サイト更新日: ${siteProfile.updatedAt}`)
    expect(files['profile.md']).not.toContain('データ最終確認日')
  })

  it('does not turn verification dates, pending roles or unverified links into stronger claims', () => {
    const firstWork = works[0]
    expect(firstWork).toBeDefined()
    if (!firstWork) throw new Error('The canonical work list must not be empty.')
    expect(creativeWorkJsonLd(firstWork)).not.toHaveProperty('dateModified')
    for (const work of works.filter((item) => item.role === 'pending-confirmation')) {
      expect(creativeWorkJsonLd(work)).not.toHaveProperty('creator')
      expect(creativeWorkJsonLd(work)).not.toHaveProperty('contributor')
    }
    expect(personJsonLd().sameAs).not.toContain('https://bsky.app/profile/leftonbo.bsky.social')
    expect(personJsonLd().sameAs).not.toContain('https://www.pixiv.net/users/3178558')
  })
})
