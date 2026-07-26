import { describe, expect, it } from 'vitest'
import { getStaticRoutePaths } from '../app/routes'
import {
  creativeWorkJsonLd,
  getMachineReadableFiles,
  personJsonLd,
  profilePageJsonLd,
  worksCollectionJsonLd,
} from '../machine-readable'
import { activityAreas, externalLinks, siteProfile } from './site'
import type { Work } from './types'
import { collectContentValidationIssues } from './validate'
import { works } from './works'

const workArticles = import.meta.glob<Work>(['./works/*.ts', '!./works/*.test.ts'], {
  eager: true,
  import: 'default',
})

describe('canonical content', () => {
  it('passes the runtime schema and keeps the renamed identifiers', () => {
    expect(collectContentValidationIssues()).toEqual([])
    expect(works).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'ball-maze-2', slug: 'ball-maze-2', title: 'Ball Maze II' }),
        expect.objectContaining({
          id: 'itagashi-board-game-world',
          slug: 'itagashi-board-game-world',
        }),
        expect.objectContaining({
          id: 'tonbo-battlefield-the-two-bases',
          slug: 'tonbo-battlefield-the-two-bases',
        }),
        expect.objectContaining({ id: 'vket-2020', slug: 'vket-2020', title: 'Vket 5 出展' }),
      ]),
    )
    expect(
      works.some((work) =>
        [
          'ball-maze-ii',
          'ita-gashi-board-game-world',
          'tonbo-battlefield-2-the-two-bases',
          'vket-5-2020',
        ].includes(work.id),
      ),
    ).toBe(false)
  })

  it('automatically aggregates every work article', () => {
    expect(works).toHaveLength(Object.keys(workArticles).length)
    expect(new Set(works.map((work) => work.id))).toEqual(
      new Set(Object.values(workArticles).map((work) => work.id)),
    )
  })

  it('accepts a new valid work without an allowlist or count update', () => {
    const sourceWork = works[0]
    if (!sourceWork) throw new Error('検証元の制作記事がありません。')

    const addedWork: Work = {
      ...sourceWork,
      id: 'new-valid-work',
      slug: 'new-valid-work',
      title: '新しい制作',
    }

    expect(
      collectContentValidationIssues({
        profile: siteProfile,
        links: externalLinks,
        activityAreas,
        works: [...works, addedWork],
      }),
    ).toEqual([])
  })

  it('keeps required and duplicate work ID validation', () => {
    const sourceWork = works[0]
    if (!sourceWork) throw new Error('検証元の制作記事がありません。')

    const issues = collectContentValidationIssues({
      profile: siteProfile,
      links: externalLinks,
      activityAreas,
      works: [
        ...works,
        { ...sourceWork, id: '', slug: 'empty-id-work', title: 'IDなし' },
        { ...sourceWork, id: 'ball-maze-2', slug: 'duplicate-id-work', title: 'ID重複' },
      ],
    })

    expect(issues).toEqual(
      expect.arrayContaining([
        { path: `works[${works.length}].id`, message: '必須の文字列が空です。' },
        { path: 'works.id', message: '重複しています: ball-maze-2' },
      ]),
    )
  })

  it('requires complete game details only for game works', () => {
    const gameWork = works.find((work) => work.category === 'game')
    const nonGameWork = works.find((work) => work.category !== 'game')
    if (!gameWork?.gameDetails || !nonGameWork) throw new Error('検証元の制作記事がありません。')

    const issues = collectContentValidationIssues({
      profile: siteProfile,
      links: externalLinks,
      activityAreas,
      works: [
        ...works,
        {
          ...gameWork,
          id: 'game-without-details',
          slug: 'game-without-details',
          gameDetails: undefined,
        },
        {
          ...gameWork,
          id: 'game-with-empty-genre',
          slug: 'game-with-empty-genre',
          gameDetails: { ...gameWork.gameDetails, genre: ' ' },
        },
        {
          ...gameWork,
          id: 'game-with-empty-introduction',
          slug: 'game-with-empty-introduction',
          gameDetails: { ...gameWork.gameDetails, introduction: [''] },
        },
        {
          ...nonGameWork,
          id: 'non-game-with-details',
          slug: 'non-game-with-details',
          gameDetails: gameWork.gameDetails,
        },
      ],
    })

    expect(issues).toEqual(
      expect.arrayContaining([
        {
          path: `works[${works.length}].gameDetails`,
          message: 'ゲーム作品にはgameDetailsが必要です。',
        },
        {
          path: `works[${works.length + 1}].gameDetails.genre`,
          message: '必須の文字列が空です。',
        },
        {
          path: `works[${works.length + 2}].gameDetails.introduction[0]`,
          message: '必須の文字列が空です。',
        },
        {
          path: `works[${works.length + 3}].gameDetails`,
          message: 'ゲーム作品以外にはgameDetailsを指定できません。',
        },
      ]),
    )
  })

  it('sorts all works by confirmed date, period year and slug', () => {
    const ids = works.map((work) => work.id)
    const indexOf = (id: string) => ids.indexOf(id)

    expect(indexOf('vket-2026-summer')).toBeLessThan(indexOf('gabugabu-specter'))
    expect(indexOf('gabugabu-specter')).toBeLessThan(indexOf('tonbo-house-03'))
    expect(indexOf('tonbo-house-03')).toBeLessThan(indexOf('sajak-sahagin-v3'))
    expect(indexOf('vket-2020')).toBeLessThan(indexOf('light-trail'))
    expect(indexOf('dorofune')).toBeLessThan(indexOf('elem-shot'))
    expect(indexOf('super-block-break')).toBeLessThan(indexOf('itagashi-board-game-world'))
    expect(indexOf('itagashi-board-game-world')).toBeLessThan(indexOf('kuso-dekke-pusher-game'))
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
    expect(works.find((work) => work.id === 'light-trail')?.firstPublishedAt).toBe('2018-04-29')
    const salvagedPublicationDates = {
      infiroad: '2015-12-09',
      'rocket-lunch-iyaa': '2015-02-24',
      'elem-shot': '2013-09-30',
      dorofune: '2013-11-22',
      'pipe-4-run': '2014-06-17',
      'block-break': '2013-03-25',
      'battle-viewer': '2008-05-21',
      'go-and-battle': '2008-02-21',
      'ball-maze-2': '2006-05-07',
      'ball-maze': '2006-03-17',
      'super-block-break': '2004-07-18',
    } as const

    for (const [id, firstPublishedAt] of Object.entries(salvagedPublicationDates)) {
      const work = works.find((candidate) => candidate.id === id)

      expect(work).toEqual(
        expect.objectContaining({ period: firstPublishedAt.slice(0, 4), firstPublishedAt }),
      )
      expect(work?.factsPending).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'first-published-at' })]),
      )
    }
    expect(works.find((work) => work.id === 'dorofune')?.gameDetails?.introduction).toEqual(
      expect.arrayContaining([expect.stringContaining('2014年11月20日にネット上で再公開')]),
    )
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

  it('publishes the approved Vket dates, descriptions and booth images', () => {
    const approvedVketWorks = {
      'vket-2020': {
        firstPublishedAt: '2020-12-18',
        descriptionFragment: 'カクレ家ホウモツコ',
      },
      'vket-2022-summer': {
        firstPublishedAt: '2022-08-13',
        descriptionFragment: "Poppin' Jump - Lemon Squash",
      },
      'vket-2023-winter': {
        firstPublishedAt: '2023-12-02',
        descriptionFragment: '雛形',
      },
      'vket-2024-summer': {
        firstPublishedAt: '2024-07-20',
        descriptionFragment: '紹介ムービー',
      },
      'vket-2024-winter': {
        firstPublishedAt: '2024-12-07',
        descriptionFragment: '出展ワールドの雰囲気',
      },
      'vket-2025-summer': {
        firstPublishedAt: '2025-07-12',
        descriptionFragment: 'クソでっけぇプッシャーゲーム',
      },
      'vket-2026-summer': {
        firstPublishedAt: '2026-07-11',
        descriptionFragment: 'Antimatter Dimensions',
      },
    } as const

    expect(works.filter((work) => work.category === 'vket')).toHaveLength(7)

    for (const [id, approved] of Object.entries(approvedVketWorks)) {
      const work = works.find((candidate) => candidate.id === id)

      expect(work).toEqual(
        expect.objectContaining({
          firstPublishedAt: approved.firstPublishedAt,
          media: [
            expect.objectContaining({
              url: `/images/works/${id}/hero.webp`,
            }),
          ],
        }),
      )
      expect(work?.description).toContain(approved.descriptionFragment)
      expect(work?.factsPending).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'first-published-at' })]),
      )
      expect(work?.factsPending).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'media' })]),
      )
    }
  })

  it('splits the former old-game collection and integrates Vket records into works', () => {
    expect(works.some((work) => work.id === 'older-games')).toBe(false)
    expect(works).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'rocket-lunch-iyaa' }),
        expect.objectContaining({ id: 'super-block-break' }),
        expect.objectContaining({ id: 'vket-2026-summer' }),
      ]),
    )
  })

  it('integrates the approved old game sources without adding unrelated works', () => {
    const gameWorks = works.filter((work) => work.category === 'game')
    const serialized = JSON.stringify({ works, externalLinks })
    expect(gameWorks).toHaveLength(14)
    expect(
      gameWorks.every(
        (work) =>
          work.gameDetails !== undefined &&
          work.sources.some(
            (source) =>
              source.kind === 'first-party-public' && source.url.startsWith('https://www.houmotsuko.net/game/'),
          ),
      ),
    ).toBe(true)
    expect(
      gameWorks.filter((work) => work.gameDetails?.developmentTool === null).map((work) => work.id),
    ).toEqual(['pipe-4-run'])
    expect(
      activityAreas
        .find((area) => area.id === 'games')
        ?.sources.some((source) => source.url === 'https://www.houmotsuko.net/game/index'),
    ).toBe(true)
    expect(gameWorks.every((work) => work.url.startsWith('https://tonbonotion01.notion.site/'))).toBe(true)
    expect(serialized).not.toContain('TorchBreath')
    expect(serialized).not.toContain('eel-rpg-game')
    expect(serialized).not.toContain('Drawing Catch')
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
    expect(routes).toContain('/works/ball-maze-2/')
    expect(routes).toContain('/works/itagashi-board-game-world/')
    expect(routes).toContain('/works/tonbo-battlefield-the-two-bases/')
    expect(routes).toContain('/works/vket-2020/')
    expect(routes).not.toContain('/works/ball-maze-ii/')
    expect(routes).not.toContain('/works/ita-gashi-board-game-world/')
    expect(routes).not.toContain('/works/tonbo-battlefield-2-the-two-bases/')
    expect(routes).not.toContain('/works/vket-5-2020/')
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
      schemaVersion?: number
      count?: number
      siteUpdatedAt?: string
      works?: Array<{
        id?: string
        category?: string
        firstPublishedAt?: string | null
        period?: string | null
        gameDetails?: { genre?: string; developmentTool?: string | null; introduction?: string[] } | null
        media?: unknown[]
      }>
    }
    const profileJson = JSON.parse(files['data/profile.json'] ?? '{}') as { schemaVersion?: number }
    expect(profileJson.schemaVersion).toBe(3)
    expect(worksJson.schemaVersion).toBe(4)
    expect(worksJson.count).toBe(works.length)
    expect(worksJson.siteUpdatedAt).toBe(siteProfile.updatedAt)
    expect(
      worksJson.works?.every(
        (work) => 'firstPublishedAt' in work && 'period' in work && Array.isArray(work.media),
      ),
    ).toBe(true)
    expect(
      worksJson.works
        ?.filter((work) => work.category === 'game')
        .every((work) => work.gameDetails?.genre && work.gameDetails.introduction?.length),
    ).toBe(true)
    expect(
      worksJson.works?.find((work) => work.id === 'pipe-4-run')?.gameDetails?.developmentTool,
    ).toBeNull()
    expect(files['works.md']).toContain('- ジャンル: RPG')
    expect(files['works.md']).toContain('- 制作ツール: RPGツクールMV')
    expect(files['works.md']).toContain('#### ゲーム紹介')
    expect(creativeWorkJsonLd(works.find((work) => work.id === 'light-trail')!).genre).toBe('RPG')
    expect(`${files['data/works.json']}\n${files['works.md']}`).not.toMatch(/最終更新|更新履歴/)
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
