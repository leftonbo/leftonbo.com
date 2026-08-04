import { describe, expect, it } from 'vitest'
import { externalLinks, siteProfile } from './content/site'
import { works } from './content/works'
import {
  creativeWorkJsonLd,
  getMachineReadableFiles,
  personJsonLd,
  profilePageJsonLd,
  worksCollectionJsonLd,
} from './machine-readable'

describe('機械可読出力', () => {
  it('必要な公開ファイルを同じ正規コンテンツから生成する', () => {
    const files = getMachineReadableFiles()
    expect(Object.keys(files)).toHaveLength(7)
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
      schemaVersion?: number
      count?: number
      siteUpdatedAt?: string
      works?: Array<{
        id?: string
        media?: unknown[]
        firstPublishedAt?: string | null
        period?: string | null
        vketExhibition?: {
          world: { name: string; url: string | null }
          catalog: { label: string; url: string } | null
          eventPostUrl: string | null
        } | null
      }>
    }

    expect(worksJson.schemaVersion).toBe(5)
    expect(worksJson.count).toBe(works.length)
    expect(worksJson.siteUpdatedAt).toBe(siteProfile.updatedAt)
    expect(worksJson.works?.map((work) => work.id)).toEqual(works.map((work) => work.id))
    expect(
      worksJson.works?.every(
        (work) => 'firstPublishedAt' in work && 'period' in work && Array.isArray(work.media),
      ),
    ).toBe(true)

    const vket2025 = worksJson.works?.find((work) => work.id === 'vket-2025-summer')
    const vket2026 = worksJson.works?.find((work) => work.id === 'vket-2026-summer')
    expect(vket2025?.vketExhibition).toEqual({
      world: {
        name: '森聖街 ヤポプエト - 中願の秋夜',
        url: 'https://vrchat.com/home/launch?worldId=wrld_63f5b036-89d5-4d47-bc31-a6761173e13e',
      },
      catalog: {
        label: 'Vket 2025 Summer 出展者ページ',
        url: 'https://vket.com/2025Summer/exhibitor/310',
      },
      eventPostUrl: 'https://x.com/LefTonbo/status/1943618961502789769',
    })
    expect(vket2026?.vketExhibition?.world).toEqual({
      name: 'VOLTAGER - EX-Volcano',
      url: null,
    })

    const worksMarkdown = files['works.md']
    expect(worksMarkdown).toContain(
      '- 出展ワールド: [森聖街 ヤポプエト - 中願の秋夜](https://vrchat.com/home/launch?worldId=wrld_63f5b036-89d5-4d47-bc31-a6761173e13e)',
    )
    expect(worksMarkdown).toContain('- カタログ: [Vket 2025 Summer 出展者ページ]')
    expect(worksMarkdown).toContain(
      '- 出展ワールド: VOLTAGER - EX-Volcano（Public Link 未公開）',
    )
  })

  it('すべての作品URLをsitemapへ出力する', () => {
    const sitemap = getMachineReadableFiles()['sitemap.xml']

    for (const work of works) {
      expect(sitemap).toContain(`/works/${work.slug}/`)
    }
  })

  it('検証日や未確認の関与・リンクを公開上の事実へ変換しない', () => {
    const files = getMachineReadableFiles()
    expect(profilePageJsonLd().dateModified).toBe(siteProfile.updatedAt)
    expect(worksCollectionJsonLd().dateModified).toBe(siteProfile.updatedAt)
    expect(files['data/works.json']).not.toContain('verifiedAt')

    for (const work of works.filter((item) => item.role === 'pending-confirmation')) {
      expect(creativeWorkJsonLd(work)).not.toHaveProperty('creator')
      expect(creativeWorkJsonLd(work)).not.toHaveProperty('contributor')
    }

    const sameAs = personJsonLd().sameAs
    for (const link of externalLinks.filter((item) => item.status === 'availability-unverified')) {
      expect(sameAs).not.toContain(link.url)
    }
  })
})
