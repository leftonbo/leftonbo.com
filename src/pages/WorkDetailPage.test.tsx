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
  it('uses the first work image in the hero and exposes image descriptions as captions', () => {
    const work = getWork('light-trail')
    render(<WorkDetailPage work={work} works={works} />)

    const heroImage = document.querySelector('.work-detail__visual img')
    expect(heroImage).toHaveAttribute('src', work.media[0]?.url)
    expect(screen.getAllByText(work.media[0]?.alt ?? '')).not.toHaveLength(0)
  })

  it('shows the default work mark when a work has no images', () => {
    render(<WorkDetailPage work={getWork('ball-maze')} works={works} />)

    expect(document.querySelector('.work-detail__visual--fallback .work-mark')).toBeInTheDocument()
    expect(document.querySelector('.work-detail__visual img')).not.toBeInTheDocument()
  })

  it('shows structured game facts and introduction only for game works', () => {
    const { rerender } = render(<WorkDetailPage work={getWork('light-trail')} works={works} />)

    expect(screen.getByText('ジャンル')).toBeInTheDocument()
    expect(screen.getByText('RPG', { selector: 'dd' })).toBeInTheDocument()
    expect(screen.getByText('制作ツール')).toBeInTheDocument()
    expect(screen.getByText('RPGツクールMV')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'ゲーム紹介' })).toBeInTheDocument()
    expect(screen.getByText(/ゲームクリエイターズキャンプの企画制作作品/)).toBeInTheDocument()

    rerender(<WorkDetailPage work={getWork('tonbo-werewolf')} works={works} />)

    expect(screen.queryByText('ジャンル')).not.toBeInTheDocument()
    expect(screen.queryByText('制作ツール')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'ゲーム紹介' })).not.toBeInTheDocument()
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

  it('shows an unlinked pending world for Vket 2026 Summer', () => {
    render(<WorkDetailPage work={getWork('vket-2026-summer')} works={works} />)

    const worldRow = screen.getByText('出展ワールド').closest('div')
    if (!worldRow) throw new Error('出展ワールド行がありません。')

    expect(within(worldRow).getByText('VOLTAGER - EX-Volcano', { exact: false })).toBeInTheDocument()
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
