import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HeroWispParade } from './HeroWispParade'
import { createRandomWispColor } from './wisp-color'

describe('HeroWispParade', () => {
  it('renders eight circular wisps with one face and six particles each', () => {
    const { container } = render(<HeroWispParade />)
    const stage = container.querySelector('.hero-wisps__stage')

    expect(stage).toHaveAttribute('aria-hidden', 'true')
    expect(stage?.querySelectorAll('.hero-wisp')).toHaveLength(8)
    expect(stage?.querySelectorAll('.hero-wisp__body')).toHaveLength(8)
    expect(stage?.querySelectorAll('.hero-wisp__eye')).toHaveLength(16)
    expect(stage?.querySelectorAll('.hero-wisp__particle')).toHaveLength(48)
    expect(stage?.querySelector('img')).not.toBeInTheDocument()
  })

  it('creates cool colors normally and warm colors only in the warm branch', () => {
    const coolRandom = vi.fn()
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
    const warmRandom = vi.fn()
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(1)

    expect(createRandomWispColor(coolRandom)).toEqual({
      hue: 178,
      saturation: 84,
      lightness: 60,
    })
    expect(createRandomWispColor(warmRandom)).toEqual({
      hue: 48,
      saturation: 96,
      lightness: 78,
    })
  })
})
