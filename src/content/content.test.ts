import { describe, expect, it } from 'vitest'
import { homeContent } from './home'
import { activityAreas, externalLinks, siteProfile } from './site'
import type { CanonicalContent, HomeContent, Work } from './types'
import { collectContentValidationIssues } from './validate'
import { works } from './works'

const workArticles = import.meta.glob<Work>(['./works/*.ts', '!./works/*.test.ts'], {
  eager: true,
  import: 'default',
})
const localWorkImages = import.meta.glob('../../public/images/works/**/*.webp')
const localContentImages = import.meta.glob('../../public/images/**/*.webp')

const canonicalContent: CanonicalContent = {
  profile: siteProfile,
  links: externalLinks,
  activityAreas,
  works,
  home: homeContent,
}

function contentWithWorks(nextWorks: readonly Work[]): CanonicalContent {
  return { ...canonicalContent, works: nextWorks }
}

describe('コンテンツの整合性', () => {
  it('公開コンテンツ全体がランタイムスキーマを満たす', () => {
    expect(collectContentValidationIssues()).toEqual([])
  })

  it('ホーム設定の参照切れとカテゴリ不一致を検出する', () => {
    const sourceActivity = homeContent.activities.find((activity) => activity.kind === 'works')
    const sourceLink = homeContent.primaryLinks[0]
    if (!sourceActivity || !sourceLink) throw new Error('検証元のホーム設定がありません。')

    const invalidHome = {
      ...homeContent,
      activities: [
        { ...sourceActivity, areaId: 'missing-area', workSlugs: ['missing-work'] },
        { ...sourceActivity, areaId: 'duplicate-area', category: 'game' },
        { ...sourceActivity, areaId: 'duplicate-area' },
      ],
      primaryLinks: [{ ...sourceLink, linkId: 'missing-link' }],
    } as HomeContent
    const issues = collectContentValidationIssues({ ...canonicalContent, home: invalidHome })

    expect(issues).toEqual(
      expect.arrayContaining([
        {
          path: 'home.activities[0].areaId',
          message: '参照先の活動領域が見つかりません: missing-area',
        },
        {
          path: 'home.activities[0].workSlugs[0]',
          message: '参照先の作品が見つかりません: missing-work',
        },
        { path: 'home.activities.areaId', message: '重複しています: duplicate-area' },
        {
          path: 'home.activities[1].workSlugs[0]',
          message: '作品カテゴリが一致しません: vrchat-world',
        },
        {
          path: 'home.primaryLinks[0].linkId',
          message: '参照先の公式リンクが見つかりません: missing-link',
        },
      ]),
    )
  })

  it('すべての作品記事を自動集約し、代表作の順序を重複なく定義する', () => {
    expect(new Set(works.map((work) => work.id))).toEqual(
      new Set(Object.values(workArticles).map((work) => work.id)),
    )
    const featuredOrders = works
      .map((work) => work.featuredOrder)
      .filter((order): order is number => order !== null)
    expect(featuredOrders).toHaveLength(4)
    expect(new Set(featuredOrders).size).toBe(featuredOrders.length)
    expect([...featuredOrders].sort((left, right) => left - right)).toEqual([1, 2, 3, 4])
  })

  it('カテゴリに応じて必要または不要になる従属データを検証する', () => {
    const gameWork = works.find((work) => work.category === 'game' && work.gameDetails)
    const nonGameWork = works.find((work) => work.category !== 'game')
    if (!gameWork?.gameDetails || !nonGameWork) throw new Error('検証元の制作記事がありません。')

    const issues = collectContentValidationIssues(
      contentWithWorks([
        {
          ...gameWork,
          id: 'game-without-details',
          slug: 'game-without-details',
          gameDetails: undefined,
        },
        {
          ...nonGameWork,
          id: 'non-game-with-details',
          slug: 'non-game-with-details',
          gameDetails: gameWork.gameDetails,
        },
      ]),
    )

    expect(issues).toEqual(
      expect.arrayContaining([
        { path: 'works[0].gameDetails', message: 'ゲーム作品にはgameDetailsが必要です。' },
        {
          path: 'works[1].gameDetails',
          message: 'ゲーム作品以外にはgameDetailsを指定できません。',
        },
      ]),
    )
  })

  it('作品の短い要約と段落形式の紹介文を検証する', () => {
    const sourceWork = works[0]
    if (!sourceWork) throw new Error('検証元の制作記事がありません。')

    const issues = collectContentValidationIssues(
      contentWithWorks([
        {
          ...sourceWork,
          id: 'work-with-long-summary',
          slug: 'work-with-long-summary',
          summary: 'あ'.repeat(81),
          introduction: [],
        },
        {
          ...sourceWork,
          id: 'work-with-multiline-summary',
          slug: 'work-with-multiline-summary',
          summary: '一覧用の要約\n詳細',
          introduction: [' '],
        },
      ]),
    )

    expect(issues).toEqual(
      expect.arrayContaining([
        { path: 'works[0].summary', message: '80文字を超えています: 81文字' },
        { path: 'works[0].introduction', message: '紹介文が1段落以上必要です。' },
        { path: 'works[1].summary', message: '改行を含められません。' },
        { path: 'works[1].introduction[0]', message: '必須の文字列が空です。' },
      ]),
    )
  })

  it('公開終了作品だけは公開先リンクを省略できる', () => {
    const archivedWork = works.find((work) => work.status === 'archived')
    const publishedWork = works.find((work) => work.status === 'published')
    if (!archivedWork || !publishedWork) throw new Error('検証元の制作記事がありません。')

    const issues = collectContentValidationIssues(
      contentWithWorks([
        { ...archivedWork, id: 'archived-without-links', slug: 'archived-without-links', links: [] },
        { ...publishedWork, id: 'published-without-links', slug: 'published-without-links', links: [] },
      ]),
    )

    expect(issues).not.toContainEqual({
      path: 'works[0].links',
      message: 'primaryタグを持つリンクは必ず1件にしてください。',
    })
    expect(issues).toContainEqual({
      path: 'works[1].links',
      message: 'primaryタグを持つリンクは必ず1件にしてください。',
    })
  })

  it('Vket固有データと出典用途の不整合を検出する', () => {
    const vketWork = works.find((work) => work.id === 'vket-2025-summer')
    const nonVketWork = works.find((work) => work.category !== 'vket')
    const eventPostIndex = vketWork?.sources.findIndex((source) => source.role === 'event-post')
    if (!vketWork?.vketExhibition || !nonVketWork || eventPostIndex === undefined || eventPostIndex < 0) {
      throw new Error('検証元のVket記事がありません。')
    }

    const invalidEventSources = vketWork.sources.map((source, index) =>
      index === eventPostIndex ? { ...source, url: 'https://example.com/post/1' } : source,
    )
    const duplicateRoleSources = vketWork.sources.map((source) => ({
      ...source,
      role: 'event-post' as const,
    }))
    const invalidRoleSources = vketWork.sources.map((source, index) =>
      index === 0 ? { ...source, role: 'unknown' as 'catalog' } : source,
    )

    const issues = collectContentValidationIssues(
      contentWithWorks([
        {
          ...vketWork,
          id: 'invalid-vket-period-and-world',
          slug: 'invalid-vket-period-and-world',
          period: '2025 Summer',
          vketExhibition: { world: { ...vketWork.vketExhibition.world, url: 'not-a-url' } },
        },
        {
          ...vketWork,
          id: 'vket-without-exhibition',
          slug: 'vket-without-exhibition',
          vketExhibition: undefined,
        },
        {
          ...nonVketWork,
          id: 'non-vket-with-exhibition',
          slug: 'non-vket-with-exhibition',
          vketExhibition: vketWork.vketExhibition,
        },
        {
          ...vketWork,
          id: 'vket-with-invalid-event-post',
          slug: 'vket-with-invalid-event-post',
          sources: invalidEventSources,
        },
        {
          ...vketWork,
          id: 'vket-with-duplicate-source-role',
          slug: 'vket-with-duplicate-source-role',
          sources: duplicateRoleSources,
        },
        {
          ...vketWork,
          id: 'vket-with-invalid-source-role',
          slug: 'vket-with-invalid-source-role',
          sources: invalidRoleSources,
        },
      ]),
    )

    expect(issues).toEqual(
      expect.arrayContaining([
        { path: 'works[0].period', message: 'YYYY形式の年ではありません。' },
        {
          path: 'works[0].vketExhibition.world.url',
          message: '不正なURLです: not-a-url',
        },
        {
          path: 'works[1].vketExhibition',
          message: 'Vket作品にはvketExhibitionが必要です。',
        },
        {
          path: 'works[2].vketExhibition',
          message: 'Vket作品以外にはvketExhibitionを指定できません。',
        },
        { path: `works[3].sources[${eventPostIndex}].url`, message: 'Xの投稿URLではありません。' },
        { path: 'works[4].sources.role', message: '重複しています: event-post' },
        { path: 'works[5].sources[0].role', message: '許可されていない値です: unknown' },
      ]),
    )
  })

  it('参照キーになる作品IDとslugの重複を検出する', () => {
    const sourceWork = works[0]
    if (!sourceWork) throw new Error('検証元の制作記事がありません。')

    const issues = collectContentValidationIssues(
      contentWithWorks([sourceWork, { ...sourceWork, title: `${sourceWork.title} duplicate` }]),
    )

    expect(issues).toEqual(
      expect.arrayContaining([
        { path: 'works.id', message: `重複しています: ${sourceWork.id}` },
        { path: 'works.slug', message: `重複しています: ${sourceWork.slug}` },
      ]),
    )
  })

  it('サイト内画像の参照先ファイルが存在する', () => {
    const localMedia = works.flatMap((work) =>
      [work.heroMedia, ...work.media].filter(
        (media): media is NonNullable<Work['heroMedia']> => media !== null && media.url.startsWith('/'),
      ),
    )
    expect(localMedia.length).toBeGreaterThan(0)

    for (const media of localMedia) {
      expect(localWorkImages, media.url).toHaveProperty(`../../public${media.url}`)
    }

    for (const activity of homeContent.activities) {
      if (activity.kind === 'external') {
        expect(localContentImages, activity.image).toHaveProperty(`../../public${activity.image}`)
      }
    }
  })

  it('画像の説明文を指定する場合は空文字を許可しない', () => {
    const sourceWork = works.find((work) => work.media.length > 0)
    const sourceMedia = sourceWork?.media[0]
    if (!sourceWork || !sourceMedia) throw new Error('画像付きの制作記事がありません。')

    const issues = collectContentValidationIssues(
      contentWithWorks([{
        ...sourceWork,
        media: [{ ...sourceMedia, caption: ' ' }, ...sourceWork.media.slice(1)],
      }]),
    )

    expect(issues).toContainEqual({
      path: 'works[0].media[0].caption',
      message: '必須の文字列が空です。',
    })
  })

  it('ヒーロー画像とギャラリー画像の重複を検出する', () => {
    const sourceWork = works.find((work) => work.heroMedia !== null)
    if (!sourceWork?.heroMedia) throw new Error('ヒーロー画像付きの制作記事がありません。')

    const issues = collectContentValidationIssues(
      contentWithWorks([{ ...sourceWork, media: [sourceWork.heroMedia, ...sourceWork.media] }]),
    )

    expect(issues).toContainEqual({
      path: 'works[0].media',
      message: 'heroMediaと同じ画像を含められません。',
    })
  })
})
