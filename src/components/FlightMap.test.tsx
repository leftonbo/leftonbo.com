import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FlightMap } from './FlightMap'
import type { FlightStop } from './FlightMap'

const stops: readonly FlightStop[] = [
  {
    id: 'worlds',
    label: 'VRChatワールド',
    description: '空間として公開している制作です。',
    href: '/works/?category=vrchat-world',
    meta: '8作品',
    preview: {
      url: '/images/world.webp',
      alt: 'VRChatワールドの代表作品',
      title: 'World preview',
    },
  },
  {
    id: 'games',
    label: 'ゲーム',
    description: '遊べる作品です。',
    href: '/works/?category=game',
    meta: '14作品',
    preview: {
      url: '/images/game.webp',
      alt: 'ゲームの代表作品',
      title: 'Game preview',
    },
  },
]

describe('FlightMap', () => {
  it('updates the destination preview when a link is pointed at', () => {
    render(<FlightMap stops={stops} />)

    expect(screen.getByRole('img', { name: 'VRChatワールドの代表作品' })).toBeInTheDocument()

    fireEvent.pointerEnter(screen.getByRole('link', { name: /ゲーム/ }))

    expect(screen.getByRole('img', { name: 'ゲームの代表作品' })).toBeInTheDocument()
    expect(screen.getByText('Game preview')).toBeInTheDocument()
  })
})
