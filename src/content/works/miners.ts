import type { Work } from '../types'

export const miners = {
  id: 'miners',
  slug: 'miners',
  title: 'Miners',
  description: 'DX Library製の協力採掘アクションゲーム。ほかのプレイヤーと協力し、2000m先にある世界の果てを目指す。',
  category: 'past-game',
  status: 'published',
  role: 'self-produced',
  period: '2015',
  firstPublishedAt: '2015-03-13',
  media: [
    {
      kind: 'image',
      url: '/images/works/miners/hero.webp',
      alt: 'Minersのゲーム画面',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/miners/gallery-02.webp',
      alt: 'Minersのスクリーンショット 2',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/miners/gallery-03.webp',
      alt: 'Minersのスクリーンショット 3',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/miners/gallery-04.webp',
      alt: 'Minersのスクリーンショット 4',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/miners/gallery-05.webp',
      alt: 'Minersのスクリーンショット 5',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://tonbonotion01.notion.site/game-miners',
  sources: [
    {
      label: 'TonboNotion01: Miners',
      url: 'https://tonbonotion01.notion.site/game-miners',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-07-26',
  factsPending: [],
} satisfies Work
