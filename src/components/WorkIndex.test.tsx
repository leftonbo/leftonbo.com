import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { works } from '../content/works'
import { WorkIndex } from './WorkIndex'

const avatar3dCount = works.filter((work) => work.category === 'avatar-3d').length
const gameCount = works.filter((work) => work.category === 'game').length
const vrchatWorldCount = works.filter((work) => work.category === 'vrchat-world').length

describe('WorkIndex', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/works/')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders every work in the no-filter baseline', () => {
    render(<WorkIndex works={works} />)
    expect(screen.getAllByRole('article')).toHaveLength(works.length)
    expect(screen.getByText(String(works.length), { selector: '.work-index__count strong' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '代表作' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'アーカイブ' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: '並び順' })).toHaveValue('featured')
  })

  it('renders only the short summary in each work card', () => {
    const work = works.find((item) => item.id === 'itagashi-board-game-world')
    if (!work) throw new Error('検証元の制作記事がありません。')

    render(<WorkIndex works={[work]} />)

    expect(screen.getByText(work.summary)).toBeInTheDocument()
    expect(screen.queryByText(work.introduction[0] ?? '')).not.toBeInTheDocument()
  })

  it('filters by category and writes the state to the URL', async () => {
    const user = userEvent.setup()
    render(<WorkIndex works={works} />)

    const avatar3dButtonName = new RegExp(`アバター／3D\\s*${avatar3dCount}`)
    await user.click(screen.getByRole('button', { name: avatar3dButtonName }))

    expect(screen.getAllByRole('article')).toHaveLength(avatar3dCount)
    expect(screen.getByRole('button', { name: avatar3dButtonName })).toHaveAttribute('aria-pressed', 'true')
    expect(window.location.search).toBe('?category=avatar-3d')
    expect(screen.getByRole('heading', { name: 'サジャクサハギン' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '代表作' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'アーカイブ' })).not.toBeInTheDocument()
    expect(screen.getByRole('list', { name: '制作一覧' })).toBeInTheDocument()
  })

  it('supports keyboard activation and visible state semantics', async () => {
    const user = userEvent.setup()
    render(<WorkIndex works={works} />)

    await user.tab()
    expect(screen.getByRole('button', { name: new RegExp(`すべて\\s*${works.length}`) })).toHaveFocus()
    await user.tab()
    const worldButton = screen.getByRole('button', {
      name: new RegExp(`VRChatワールド\\s*${vrchatWorldCount}`),
    })
    expect(worldButton).toHaveFocus()
    await user.keyboard('{Enter}')

    expect(worldButton).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getAllByRole('article')).toHaveLength(vrchatWorldCount)
  })

  it('restores filter state from direct URLs and popstate', async () => {
    window.history.replaceState({}, '', '/works/?category=game#work-index')
    render(<WorkIndex works={works} />)

    await waitFor(() => {
      expect(screen.getAllByRole('article')).toHaveLength(gameCount)
    })

    window.history.pushState({}, '', '/works/?category=avatar-3d#work-index')
    window.dispatchEvent(new PopStateEvent('popstate'))

    await waitFor(() => {
      const results = document.querySelector<HTMLElement>('.work-results')
      if (!results) throw new Error('制作一覧がありません。')
      expect(within(results).getAllByRole('article')).toHaveLength(avatar3dCount)
    })
  })

  it('changes the order and persists the selected sort in the URL', async () => {
    const user = userEvent.setup()
    render(<WorkIndex works={works} />)

    await user.selectOptions(screen.getByRole('combobox', { name: '並び順' }), 'oldest')

    expect(window.location.search).toBe('?sort=oldest')
    expect(screen.getByRole('combobox', { name: '並び順' })).toHaveValue('oldest')
    const standardList = screen.getByRole('list', { name: '制作一覧' })
    const standardTitles = within(standardList)
      .getAllByRole('heading')
      .map((heading) => heading.textContent)
    expect(standardTitles.at(0)).toBe('スーパーブロック崩し')
    expect(screen.queryByRole('heading', { name: '代表作' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'アーカイブ' })).not.toBeInTheDocument()
  })

  it('restores category and sort state together from a direct URL', async () => {
    window.history.replaceState({}, '', '/works/?category=game&sort=oldest#work-index')
    render(<WorkIndex works={works} />)

    await waitFor(() => {
      expect(screen.getByRole('combobox', { name: '並び順' })).toHaveValue('oldest')
      expect(screen.getAllByRole('article')).toHaveLength(gameCount)
      expect(screen.getByRole('list', { name: '制作一覧' })).toBeInTheDocument()
    })
  })

  it('normalizes the former game category as an unknown value without hiding works', async () => {
    window.history.replaceState({}, '', '/works/?category=past-game#work-index')
    render(<WorkIndex works={works} />)

    await waitFor(() => {
      expect(window.location.search).toBe('')
    })
    expect(screen.getAllByRole('article')).toHaveLength(works.length)
    expect(screen.getByRole('button', { name: new RegExp(`すべて\\s*${works.length}`) })).toHaveAttribute('aria-pressed', 'true')
  })

  it('does not add duplicate history entries for the active category', async () => {
    const user = userEvent.setup()
    const pushState = vi.spyOn(window.history, 'pushState')
    render(<WorkIndex works={works} />)
    const worldButton = screen.getByRole('button', {
      name: new RegExp(`VRChatワールド\\s*${vrchatWorldCount}`),
    })

    await user.click(worldButton)
    await user.click(worldButton)

    expect(pushState).toHaveBeenCalledTimes(1)
  })
})
