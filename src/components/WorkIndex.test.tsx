import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { works } from '../content/works'
import { WorkIndex } from './WorkIndex'

describe('WorkIndex', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/works/')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders every work in the no-filter baseline', () => {
    render(<WorkIndex works={works} />)
    expect(screen.getAllByRole('article')).toHaveLength(15)
    expect(screen.getByText('15', { selector: '.work-index__count strong' })).toBeInTheDocument()
  })

  it('filters by category and writes the state to the URL', async () => {
    const user = userEvent.setup()
    render(<WorkIndex works={works} />)

    await user.click(screen.getByRole('button', { name: /アバター／3D\s*2/ }))

    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByRole('button', { name: /アバター／3D\s*2/ })).toHaveAttribute('aria-pressed', 'true')
    expect(window.location.search).toBe('?category=avatar-3d')
    expect(screen.getByRole('heading', { name: 'サジャクサハギン v3.0' })).toBeInTheDocument()
  })

  it('supports keyboard activation and visible state semantics', async () => {
    const user = userEvent.setup()
    render(<WorkIndex works={works} />)

    await user.tab()
    expect(screen.getByRole('button', { name: /すべて\s*15/ })).toHaveFocus()
    await user.tab()
    const worldButton = screen.getByRole('button', { name: /VRChatワールド\s*8/ })
    expect(worldButton).toHaveFocus()
    await user.keyboard('{Enter}')

    expect(worldButton).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getAllByRole('article')).toHaveLength(8)
  })

  it('restores filter state from direct URLs and popstate', async () => {
    window.history.replaceState({}, '', '/works/?category=past-game#work-index')
    render(<WorkIndex works={works} />)

    await waitFor(() => {
      expect(screen.getAllByRole('article')).toHaveLength(5)
    })

    window.history.pushState({}, '', '/works/?category=avatar-3d#work-index')
    window.dispatchEvent(new PopStateEvent('popstate'))

    await waitFor(() => {
      const results = screen.getByRole('list', { name: '' })
      expect(within(results).getAllByRole('article')).toHaveLength(2)
    })
  })

  it('normalizes an unknown category without hiding works', async () => {
    window.history.replaceState({}, '', '/works/?category=unknown#work-index')
    render(<WorkIndex works={works} />)

    await waitFor(() => {
      expect(window.location.search).toBe('')
    })
    expect(screen.getAllByRole('article')).toHaveLength(15)
    expect(screen.getByRole('button', { name: /すべて\s*15/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('does not add duplicate history entries for the active category', async () => {
    const user = userEvent.setup()
    const pushState = vi.spyOn(window.history, 'pushState')
    render(<WorkIndex works={works} />)
    const worldButton = screen.getByRole('button', { name: /VRChatワールド\s*8/ })

    await user.click(worldButton)
    await user.click(worldButton)

    expect(pushState).toHaveBeenCalledTimes(1)
  })
})
