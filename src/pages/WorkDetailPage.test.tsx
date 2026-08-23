import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { works } from '../content/works'
import { WorkDetailPage } from './WorkDetailPage'

function getWork(id: string) {
  const work = works.find((item) => item.id === id)
  if (!work) throw new Error(`制作記事が見つかりません: ${id}`)
  return work
}

describe('WorkDetailPage', () => {
  it('uses the dedicated hero image without repeating it in the gallery', () => {
    const work = getWork('light-trail')
    render(<WorkDetailPage work={work} works={works} />)

    const heroImage = document.querySelector('.work-detail__visual img')
    expect(heroImage).toHaveAttribute('src', work.heroMedia?.url)
    expect(
      document.querySelectorAll(`.work-gallery img[src="${work.heroMedia?.url}"]`),
    ).toHaveLength(0)
    expect(screen.getAllByText(work.media[0]?.alt ?? '')).not.toHaveLength(0)
  })

  it('shows the default work mark when a work has no images', () => {
    render(<WorkDetailPage work={getWork('ball-maze')} works={works} />)

    expect(document.querySelector('.work-detail__visual--fallback .work-mark')).toBeInTheDocument()
    expect(document.querySelector('.work-detail__visual img')).not.toBeInTheDocument()
  })

  it('shows game-only facts and a common introduction for every work', () => {
    const { rerender } = render(<WorkDetailPage work={getWork('light-trail')} works={works} />)

    expect(screen.getByText('ジャンル')).toBeInTheDocument()
    expect(screen.getByText('RPG', { selector: 'dd' })).toBeInTheDocument()
    expect(screen.getByText('制作ツール')).toBeInTheDocument()
    expect(screen.getByText('RPGツクールMV')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '作品紹介' })).toBeInTheDocument()
    expect(screen.getByText(/ゲームクリエイターズキャンプの企画制作作品/)).toBeInTheDocument()

    rerender(<WorkDetailPage work={getWork('tonbo-werewolf')} works={works} />)

    expect(screen.queryByText('ジャンル')).not.toBeInTheDocument()
    expect(screen.queryByText('制作ツール')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '作品紹介' })).toBeInTheDocument()
    expect(screen.getByText(/「猫猫村」のような遊び/)).toBeInTheDocument()
  })

  it('labels the primary action for each destination instead of using a generic label', () => {
    const { rerender } = render(<WorkDetailPage work={getWork('tonbo-werewolf')} works={works} />)

    expect(screen.getByRole('link', { name: 'VRChatでワールドを開く' })).toHaveAttribute(
      'href',
      'https://vrchat.com/home/launch?worldId=wrld_07ee4e44-940f-4405-a398-e969114a0164',
    )

    rerender(<WorkDetailPage work={getWork('biter-spectre')} works={works} />)
    expect(screen.getByRole('link', { name: 'ショップで見る' })).toHaveAttribute(
      'href',
      'https://booth.pm/ja/items/5221596',
    )

    rerender(<WorkDetailPage work={getWork('infiroad')} works={works} />)
    expect(screen.getByRole('link', { name: '作品をダウンロード' })).toHaveAttribute(
      'href',
      'https://drive.google.com/file/d/1PiEavuddwcomdSPQ8TrLLdRsPj60afHS/view?usp=drive_link',
    )

    rerender(<WorkDetailPage work={getWork('vket-2025-summer')} works={works} />)
    expect(screen.getByRole('link', { name: 'Vket出展者ページを見る' })).toBeInTheDocument()
  })

  it('ゲームのWindows版注記と用途別の追加リンクを表示する', () => {
    const { rerender } = render(<WorkDetailPage work={getWork('infiroad')} works={works} />)

    expect(screen.getByText('Windows版のみ')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'ブラウザ版をプレイ' })).toHaveAttribute(
      'href',
      'https://unityroom.com/games/infiroad',
    )
    expect(screen.queryByText('関連リンク')).not.toBeInTheDocument()

    rerender(<WorkDetailPage work={getWork('heroad')} works={works} />)

    expect(screen.getByText('関連リンク')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'WOLF RPGエディターコンテスト 第8回 結果' }),
    ).toHaveAttribute('href', 'https://silversecond.com/WolfRPGEditor/Contest/result08.shtml')
    expect(screen.queryByRole('link', { name: 'ブラウザ版をプレイ' })).not.toBeInTheDocument()
  })

  it('公開終了したリンクをクリックできない状態で表示する', () => {
    const work = getWork('infiroad')
    const disabledWork = {
      ...work,
      links: work.links.map((link) =>
        link.tags.includes('primary') ? { ...link, disabled: true } : link,
      ),
    }

    render(<WorkDetailPage work={disabledWork} works={works} />)

    expect(screen.queryByRole('link', { name: '作品をダウンロード' })).not.toBeInTheDocument()
    expect(screen.getByText('作品をダウンロード')).toHaveAttribute('aria-disabled', 'true')
  })

  it('omits an unconfirmed development tool and operational history labels', () => {
    render(<WorkDetailPage work={getWork('pipe-4-run')} works={works} />)

    expect(screen.getByText('対戦パズル')).toBeInTheDocument()
    expect(screen.queryByText('制作ツール')).not.toBeInTheDocument()
    expect(document.body.textContent).not.toMatch(/最終更新|更新履歴/)
  })

  it('shows the Vket world, catalog, and event post from structured content', () => {
    render(<WorkDetailPage work={getWork('vket-2025-summer')} works={works} />)

    expect(screen.getByRole('link', { name: /森聖街 ヤポプエト - 中願の秋夜/ })).toHaveAttribute(
      'href',
      'https://vrchat.com/home/launch?worldId=wrld_63f5b036-89d5-4d47-bc31-a6761173e13e',
    )
    expect(screen.getByRole('link', { name: /Vket 2025 Summer 出展者ページ/ })).toHaveAttribute(
      'href',
      'https://vket.com/2025Summer/exhibitor/310',
    )
    expect(screen.getByRole('heading', { name: '開催時のX投稿' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /開催時の投稿をXで見る/ })).toHaveAttribute(
      'href',
      'https://x.com/LefTonbo/status/1943618961502789769',
    )
  })

  it('shows a linked introduction video when the work provides one', () => {
    render(<WorkDetailPage work={getWork('biter-spectre')} works={works} />)

    expect(screen.getByRole('heading', { name: '紹介動画' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'YouTubeで紹介動画を見る' })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=L6p00Q4XVSM',
    )
  })

  it('shows an unlinked pending world for Vket 2026 Summer', () => {
    render(<WorkDetailPage work={getWork('vket-2026-summer')} works={works} />)

    const worldRow = screen.getByText('出展ワールド').closest('div')
    if (!worldRow) throw new Error('出展ワールド行がありません。')

    expect(
      within(worldRow).getByText('VOLTAGER - EX-Volcano', { exact: false }),
    ).toBeInTheDocument()
    expect(within(worldRow).getByText('Public Link 未公開')).toBeInTheDocument()
    expect(within(worldRow).queryByRole('link')).not.toBeInTheDocument()
  })

  it('shows only the world for Vket 2022 Summer', () => {
    render(<WorkDetailPage work={getWork('vket-2022-summer')} works={works} />)

    expect(screen.getByRole('link', { name: /Poppin' Jump - Lemon Squash/ })).toBeInTheDocument()
    expect(screen.queryByText('カタログ')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '開催時のX投稿' })).not.toBeInTheDocument()
  })
})
