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
  })

  it('renders a detail page with an official destination and concise details', () => {
    render(<App pathname="/works/light-trail/" />)
    expect(screen.getByRole('heading', { level: 1, name: 'Light Trail' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /公式の公開先へ/ })).toHaveAttribute(
      'href',
      'https://tonbonotion01.notion.site/game-lighttrail',
    )
    expect(screen.getByRole('heading', { level: 2, name: '作品情報' })).toBeInTheDocument()
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
