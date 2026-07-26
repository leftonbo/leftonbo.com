import type { Work } from '../types'

export const heroad = {
  id: 'heroad',
  slug: 'heroad',
  title: 'HeRoad',
  description:
    'WOLF RPG Editor製の「サクサク爽快RPG」。WOLF RPGエディターコンテスト第8回で総合14位、熱中度部門8位、遊びやすさ部門3位に入った。',
  category: 'past-game',
  status: 'published',
  role: 'self-produced',
  period: '2016',
  firstPublishedAt: '2016-07-24',
  media: [
    {
      kind: 'image',
      url: '/images/works/heroad/hero.webp',
      alt: 'HeRoadのタイトル画面',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/heroad/gallery-02.webp',
      alt: 'HeRoadのスクリーンショット 2',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/heroad/gallery-03.webp',
      alt: 'HeRoadのスクリーンショット 3',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/heroad/gallery-04.webp',
      alt: 'HeRoadのスクリーンショット 4',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://tonbonotion01.notion.site/game-heroad',
  sources: [
    {
      label: 'TonboNotion01: HeRoad',
      url: 'https://tonbonotion01.notion.site/game-heroad',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-07-26',
  factsPending: [],
} satisfies Work
