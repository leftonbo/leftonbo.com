import axe from 'axe-core'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App routes', () => {
  it('renders the top page with the primary journey', () => {
    render(<App pathname="/" />)
    expect(screen.getByRole('heading', { level: 1, name: /LefTonbo/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '制作を見る' })).toHaveAttribute('href', '/works/')
    expect(screen.getByRole('heading', { name: '制作の航路' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '代表作' })).toBeInTheDocument()
  })

  it('renders a detail page with an official destination and concise details', () => {
    render(<App pathname="/works/light-trail/" />)
    expect(screen.getByRole('heading', { level: 1, name: 'Light Trail' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '作品をダウンロード' })).toHaveAttribute(
      'href',
      'https://drive.google.com/file/d/1HMw8Zo1vm36MpH8ocF6sZPFk4g7fcdkk/view?usp=drive_link',
    )
    expect(screen.getByText('Windows版のみ')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: '作品情報' })).toBeInTheDocument()
    expect(screen.getByText('2018年4月29日')).toHaveAttribute('datetime', '2018-04-29')
    expect(screen.getByRole('heading', { level: 2, name: 'ゲーム紹介' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: '作品画像' })).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(6)
    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'src',
      '/images/works/light-trail/hero.webp',
    )
    expect(screen.queryByText('出典と公式導線')).not.toBeInTheDocument()
  })

  it('renders a useful recovery page for invalid routes', () => {
    render(<App pathname="/works/not-real/" />)
    expect(screen.getByRole('heading', { level: 1, name: 'この航路は見つかりませんでした。' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'ホームへ戻る' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: '制作を見る' })).toHaveAttribute('href', '/works/')
  })

  it('has no automated axe violations on the top page', async () => {
    const { container } = render(<App pathname="/" />)
    const result = await axe.run(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    })
    expect(result.violations).toEqual([])
  })

  it('has no automated axe violations on a work detail page', async () => {
    const { container } = render(<App pathname="/works/kawauchi-board-game-world/" />)
    const result = await axe.run(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    })
    expect(result.violations).toEqual([])
  })
})
