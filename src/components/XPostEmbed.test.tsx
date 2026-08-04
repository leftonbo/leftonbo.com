import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { XPostEmbed } from './XPostEmbed'

const postUrl = 'https://x.com/LefTonbo/status/1943618961502789769'

function removeXWidgetsScript() {
  document.getElementById('x-widgets-script')?.remove()
}

describe('XPostEmbed', () => {
  beforeEach(() => {
    removeXWidgetsScript()
    delete window.twttr
  })

  afterEach(() => {
    removeXWidgetsScript()
    delete window.twttr
  })

  it('keeps a fallback link and adds the official script only once', () => {
    render(
      <>
        <XPostEmbed url={postUrl} />
        <XPostEmbed url={postUrl} />
      </>,
    )

    expect(screen.getAllByRole('link', { name: /開催時の投稿をXで見る/ })).toHaveLength(2)
    expect(document.querySelectorAll('#x-widgets-script')).toHaveLength(1)
    expect(document.getElementById('x-widgets-script')).toHaveAttribute(
      'src',
      'https://platform.x.com/widgets.js',
    )
  })

  it('reuses an existing script and loads the widget into its own container', () => {
    const script = document.createElement('script')
    script.id = 'x-widgets-script'
    document.body.append(script)
    const load = vi.fn()

    render(<XPostEmbed url={postUrl} />)
    window.twttr = { widgets: { load } }
    script.dispatchEvent(new Event('load'))

    expect(document.querySelectorAll('#x-widgets-script')).toHaveLength(1)
    expect(load).toHaveBeenCalledTimes(1)
    expect(load.mock.calls[0]?.[0]).toHaveClass('x-post-embed')
  })
})
