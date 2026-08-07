import { describe, expect, it } from 'vitest'
import { editorialEntranceWorkIds } from '../app/presentation'
import { activityAreas, externalLinks, siteProfile } from './site'
import type { CanonicalContent, Work } from './types'
import { collectContentValidationIssues } from './validate'
import { works } from './works'

const workArticles = import.meta.glob<Work>(['./works/*.ts', '!./works/*.test.ts'], {
  eager: true,
  import: 'default',
})
const localWorkImages = import.meta.glob('../../public/images/works/**/*.webp')

const canonicalContent: CanonicalContent = {
  profile: siteProfile,
  links: externalLinks,
  activityAreas,
  works,
}

const gameDownloadUrls = {
  miners: 'https://drive.google.com/file/d/1PPia2NuihGE66XRwI1Z7bBvRVD0F4Kd3/view?usp=drive_link',
  'battle-viewer': 'https://drive.google.com/file/d/1VvXSW2YZoQPVYTzmnVffLo54C5709u74/view?usp=drive_link',
  'block-break': 'https://drive.google.com/file/d/109gVB6J0JrsXI1Fi3Ka6VMP5v5JXacDn/view?usp=drive_link',
  'pipe-4-run': 'https://drive.google.com/file/d/1bDgsBggb3YN2yd8X5n5rMcOtlDFsNfr4/view?usp=drive_link',
  dorofune: 'https://drive.google.com/file/d/1mfbte0ZXoCkWVO3VSnzS_5qu-GilCbrA/view?usp=drive_link',
  'rocket-lunch-iyaa': 'https://drive.google.com/file/d/1_OhGHOwfc6Nxl7iwkAIvYohUV8QzfsfY/view?usp=drive_link',
  'elem-shot': 'https://drive.google.com/file/d/15Weks96HSMpK13ic01lo1OfrFfGD7I8X/view?usp=drive_link',
  'super-block-break': 'https://drive.google.com/file/d/1qn27Lf1UWREOL9IQkhPc6TzYLbMvsMiA/view?usp=drive_link',
  'go-and-battle': 'https://drive.google.com/file/d/1LgigLl-QRvQql4gCS_76Y1Am8gVgbxiP/view?usp=drive_link',
  heroad: 'https://drive.google.com/file/d/1U5kni4YQB8edsI_WqttULBOgKspCTxTO/view?usp=drive_link',
  'light-trail': 'https://drive.google.com/file/d/1HMw8Zo1vm36MpH8ocF6sZPFk4g7fcdkk/view?usp=drive_link',
  'ball-maze-2': 'https://drive.google.com/file/d/1m9bcRETXUyf8dddbYJT3nhHUAiWQKewp/view?usp=drive_link',
  'ball-maze': 'https://drive.google.com/file/d/1UCmCTtbGTsaCXiZY5gMHlke7wi7AfIdv/view?usp=drive_link',
  infiroad: 'https://drive.google.com/file/d/1PiEavuddwcomdSPQ8TrLLdRsPj60afHS/view?usp=drive_link',
} as const

function contentWithWorks(nextWorks: readonly Work[]): CanonicalContent {
  return { ...canonicalContent, works: nextWorks }
}

describe('コンテンツの整合性', () => {
  it('公開コンテンツ全体がランタイムスキーマを満たす', () => {
    expect(collectContentValidationIssues()).toEqual([])
  })

  it('すべての作品記事を自動集約し、代表作IDが実在する作品を参照する', () => {
    expect(new Set(works.map((work) => work.id))).toEqual(
      new Set(Object.values(workArticles).map((work) => work.id)),
    )
    expect(new Set(editorialEntranceWorkIds).size).toBe(editorialEntranceWorkIds.length)

    for (const id of editorialEntranceWorkIds) {
      expect(works.some((work) => work.id === id || work.slug === id)).toBe(true)
    }
  })

  it('販売・配布中のアバター情報を確定済みの事実として保持する', () => {
    const sajakSahagin = works.find((work) => work.id === 'sajak-sahagin')
    const biterSpectre = works.find((work) => work.id === 'biter-spectre')
    if (!sajakSahagin || !biterSpectre) throw new Error('検証元のアバター記事がありません。')

    expect(sajakSahagin.firstPublishedAt).toBe('2020-12-19')
    expect(sajakSahagin.description).toContain('現在もフリー配布中')
    expect(sajakSahagin.factsPending).not.toContainEqual(
      expect.objectContaining({ field: 'current-status' }),
    )

    expect(biterSpectre.description).toContain('現在も販売中')
    expect(biterSpectre.factsPending).not.toContainEqual(
      expect.objectContaining({ field: 'current-status' }),
    )
    expect(biterSpectre.factsPending).toContainEqual(
      expect.objectContaining({ field: 'version' }),
    )
  })

  it('ゲーム作品のWindows版ダウンロード先と確認元を分けて保持する', () => {
    expect(works.filter((work) => work.category === 'game')).toHaveLength(
      Object.keys(gameDownloadUrls).length,
    )

    for (const [id, url] of Object.entries(gameDownloadUrls)) {
      const work = works.find((item) => item.id === id)
      if (!work) throw new Error(`ゲーム記事が見つかりません: ${id}`)

      expect(work.category).toBe('game')
      expect(work.url).toBe(url)
      expect(work.primaryActionNote).toBe('Windows版のみ')
      expect(work.sources.some((source) => source.url.includes('notion.site'))).toBe(true)
    }
  })

  it('作品の追加リンクと主アクション注記を検証する', () => {
    const sourceWork = works.find((work) => work.id === 'infiroad')
    if (!sourceWork) throw new Error('検証元のゲーム記事がありません。')

    const issues = collectContentValidationIssues(
      contentWithWorks([
        {
          ...sourceWork,
          primaryActionNote: ' ',
          additionalLinks: [
            {
              label: ' ',
              url: 'not-a-url',
              placement: 'unknown' as 'action',
            },
          ],
        },
      ]),
    )

    expect(issues).toEqual(
      expect.arrayContaining([
        { path: 'works[0].primaryActionNote', message: '必須の文字列が空です。' },
        { path: 'works[0].additionalLinks[0].label', message: '必須の文字列が空です。' },
        {
          path: 'works[0].additionalLinks[0].url',
          message: '不正なURLです: not-a-url',
        },
        {
          path: 'works[0].additionalLinks[0].placement',
          message: '許可されていない値です: unknown',
        },
      ]),
    )
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
    const localMedia = works.flatMap((work) => work.media.filter((media) => media.url.startsWith('/')))
    expect(localMedia.length).toBeGreaterThan(0)

    for (const media of localMedia) {
      expect(localWorkImages, media.url).toHaveProperty(`../../public${media.url}`)
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
})
