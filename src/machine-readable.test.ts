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
        summary?: string
        introduction?: string[]
        heroMedia?: unknown | null
        media?: unknown[]
        featuredOrder?: number | null
        links?: Array<{
          label: string
          url: string
          note: string | null
          tags: string[]
          disabled: boolean
        }>
        firstPublishedAt?: string | null
        period?: string | null
        vketExhibition?: {
          world: { name: string; url: string | null }
          catalog: { label: string; url: string } | null
          eventPostUrl: string | null
        } | null
      }>
    }

    const profileJson = JSON.parse(files['data/profile.json'] ?? '{}') as {
      schemaVersion?: number
      profile?: {
        tagline?: string
        history?: unknown[]
        tools?: unknown[]
        acceptsRequests?: boolean
      }
    }

    expect(profileJson.schemaVersion).toBe(5)
    expect(profileJson.profile).toMatchObject({
      tagline: '放浪するゲームクリエイター',
      acceptsRequests: false,
    })
    expect(profileJson.profile?.history).toHaveLength(5)
    expect(profileJson.profile?.tools).toHaveLength(5)

    expect(worksJson.schemaVersion).toBe(8)
    expect(worksJson.count).toBe(works.length)
    expect(worksJson.siteUpdatedAt).toBe(siteProfile.updatedAt)
    expect(worksJson.works?.map((work) => work.id)).toEqual(works.map((work) => work.id))
    expect(
      worksJson.works?.every(
        (work) =>
          typeof work.summary === 'string' &&
          Array.isArray(work.introduction) &&
          'firstPublishedAt' in work &&
          'period' in work &&
          'heroMedia' in work &&
          Array.isArray(work.media) &&
          'featuredOrder' in work &&
          Array.isArray(work.links),
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

    const infiroad = worksJson.works?.find((work) => work.id === 'infiroad')
    expect(infiroad).toMatchObject({
      summary: '勇者と仲間を強化しながら無限回廊を進む、Unity製のクリッカーゲーム。',
      introduction: expect.arrayContaining([
        expect.stringContaining('魔物に支配された世界を取り戻すため'),
      ]),
      featuredOrder: 4,
      links: [
        {
          label: '作品をダウンロード',
          url: 'https://drive.google.com/file/d/1PiEavuddwcomdSPQ8TrLLdRsPj60afHS/view?usp=drive_link',
          note: 'Windows版のみ',
          tags: ['primary'],
          disabled: false,
        },
        {
          label: 'ブラウザ版をプレイ',
          url: 'https://unityroom.com/games/infiroad',
          note: null,
          tags: ['action'],
          disabled: false,
        },
      ],
    })

    const worksMarkdown = files['works.md']
    expect(worksMarkdown).toContain(
      '- 出展ワールド: [森聖街 ヤポプエト - 中願の秋夜](https://vrchat.com/home/launch?worldId=wrld_63f5b036-89d5-4d47-bc31-a6761173e13e)',
    )
    expect(worksMarkdown).toContain('- カタログ: [Vket 2025 Summer 出展者ページ]')
    expect(worksMarkdown).toContain(
      '- 出展ワールド: VOLTAGER - EX-Volcano（Public Link 未公開）',
    )
    expect(worksMarkdown).toContain(
      '- 公開先: [作品をダウンロード](https://drive.google.com/file/d/1PiEavuddwcomdSPQ8TrLLdRsPj60afHS/view?usp=drive_link)（Windows版のみ）',
    )
    expect(worksMarkdown).toContain(
      '- 別の公開先: [ブラウザ版をプレイ](https://unityroom.com/games/infiroad)',
    )
    expect(worksMarkdown).toContain(
      '- 関連リンク: [WOLF RPGエディターコンテスト 第8回 結果](https://silversecond.com/WolfRPGEditor/Contest/result08.shtml)',
    )
    expect(worksMarkdown).toContain('#### 作品紹介')
    expect(worksMarkdown).not.toContain('https://tonbonotion01.notion.site/game-infiroad')
    expect(files['profile.md']).toContain('## 活動の歩み')
    expect(files['profile.md']).toContain('スーパーブロック崩し')
    expect(files['profile.md']).toContain('現在は受け付けていません')
  })

  it('すべての作品URLをsitemapへ出力する', () => {
    const sitemap = getMachineReadableFiles()['sitemap.xml']

    for (const work of works) {
      expect(sitemap).toContain(`/works/${work.slug}/`)
    }
    expect(sitemap).toContain('/works/sajak-sahagin/')
    expect(sitemap).not.toContain('/works/sajak-sahagin-v3/')
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

    const infiroad = works.find((work) => work.id === 'infiroad')
    const heroad = works.find((work) => work.id === 'heroad')
    if (!infiroad || !heroad) throw new Error('検証元のゲーム記事がありません。')
    expect(creativeWorkJsonLd(infiroad).sameAs).toEqual(infiroad.links.map((link) => link.url))
    expect(creativeWorkJsonLd(heroad).sameAs).toEqual(heroad.links.map((link) => link.url))

    const disabledPrimaryWork = {
      ...infiroad,
      links: infiroad.links.map((link) =>
        link.tags.includes('primary') ? { ...link, disabled: true } : link,
      ),
    }
    expect(creativeWorkJsonLd(disabledPrimaryWork).sameAs).not.toContain(
      infiroad.links.find((link) => link.tags.includes('primary'))?.url,
    )

    const sameAs = personJsonLd().sameAs
    for (const link of externalLinks.filter((item) => item.status === 'availability-unverified')) {
      expect(sameAs).not.toContain(link.url)
    }
  })
})
