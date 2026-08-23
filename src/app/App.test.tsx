import axe from 'axe-core'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App routes', () => {
  it('renders the top page with the primary journey', () => {
    const { container } = render(<App pathname="/" />)
    expect(screen.getByRole('heading', { level: 1, name: /LefTonbo/ })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'LefTonboのプロフィールアイコン' })).toHaveAttribute(
      'src',
      '/images/profile.webp',
    )
    expect(screen.getByRole('img', { name: 'LefTonboのプロフィールアイコン' })).toHaveAttribute(
      'width',
      '512',
    )
    expect(screen.getByRole('img', { name: 'LefTonboのプロフィールアイコン' })).toHaveAttribute(
      'height',
      '512',
    )
    expect(screen.getAllByRole('link', { name: '制作を見る' })[0]).toHaveAttribute('href', '/works/')
    expect(screen.getByText('放浪するゲームクリエイター')).toBeInTheDocument()
    expect(screen.getByText('ゲームづくりを中心に、活動をまとめています。')).toBeInTheDocument()
    expect(screen.getByText('VRChatワールド、3Dモデル、Webなど。')).toBeInTheDocument()
    expect(screen.getByText('MAIN WORKS')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '代表作' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '掲載作品をすべて見る' })).toHaveClass(
      'section-heading-row__action',
    )
    expect(screen.getByText('WHAT I MAKE')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'つくっているもの' })).toBeInTheDocument()
    expect(screen.queryByText('Official portal & portfolio')).not.toBeInTheDocument()
    expect(screen.queryByText('公開できる制作と活動を、一か所からたどれるポータルです。')).not.toBeInTheDocument()
    expect(screen.queryByText(/LefTonboを知るための4作品/)).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '出展の記録' })).not.toBeInTheDocument()

    for (const card of container.querySelectorAll('.work-card')) {
      expect(within(card as HTMLElement).getAllByRole('link')).toHaveLength(1)
    }
  })

  it('pauses and resumes the decorative wisp parade', async () => {
    const user = userEvent.setup()
    const { container } = render(<App pathname="/" />)
    const control = screen.getByRole('button', { name: '火の玉のアニメーションを停止' })

    expect(control).toHaveAttribute('aria-pressed', 'false')
    expect(container.querySelector('.hero-wisps__stage')).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelectorAll('.hero-wisp')).toHaveLength(8)

    await user.click(control)
    expect(screen.getByRole('button', { name: '火の玉のアニメーションを再生' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(container.querySelector('.hero-wisps')).toHaveClass('hero-wisps--paused')

    await user.click(screen.getByRole('button', { name: '火の玉のアニメーションを再生' }))
    expect(screen.getByRole('button', { name: '火の玉のアニメーションを停止' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(container.querySelector('.hero-wisps')).not.toHaveClass('hero-wisps--paused')
  })

  it('integrates the person introduction and official destinations into the profile', () => {
    render(<App pathname="/profile/" />)

    expect(screen.getByRole('heading', { name: 'つくっている人' })).toBeInTheDocument()
    expect(screen.getByText('放浪するゲームクリエイター')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '制作で大切にしていること' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '活動の歩み' })).toBeInTheDocument()
    expect(screen.getByText('ゲーム制作を始める')).toBeInTheDocument()
    expect(screen.getAllByText('Tonyu System', { exact: false })).toHaveLength(2)
    expect(screen.getByRole('heading', { name: '制作環境と活動方針' })).toBeInTheDocument()
    expect(screen.getByText('現在は受け付けていません')).toBeInTheDocument()
    expect(screen.getByText(/個人サークル/)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '名義について' })).not.toBeInTheDocument()
    expect(screen.queryByText(/個人名義のLefTonbo/)).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '制作しているもの' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '公式の行き先' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '作品・制作' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /GitHub/ })).toBeInTheDocument()
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
    expect(screen.getByRole('heading', { level: 2, name: '作品紹介' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: '作品画像' })).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(5)
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
