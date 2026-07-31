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
