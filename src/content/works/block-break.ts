import type { Work } from '../types'

export default {
  id: 'block-break',
  slug: 'block-break',
  title: 'Block Break',
  summary: '過去に制作したブロック崩しを、公開できる形に整えたゲーム。',
  introduction: ['過去に制作していたブロック崩しを、公開できる形に整えた作品。'],
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2013',
  firstPublishedAt: '2013-03-25',
  gameDetails: {
    genre: 'ブロック崩し',
    developmentTool: 'Tonyu System',
  },
  heroMedia: {
    kind: 'image',
    url: '/images/works/block-break/hero.webp',
    alt: 'Block Breakのゲーム画面',
    credit: null,
  },
  media: [
    {
      kind: 'image',
      url: '/images/works/block-break/gallery-02.webp',
      alt: 'Block Breakのスクリーンショット 2',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/block-break/gallery-03.webp',
      alt: 'Block Breakのスクリーンショット 3',
      credit: null,
    },
  ],
  featuredOrder: null,
  links: [
    {
      label: '作品をダウンロード',
      url: 'https://drive.google.com/file/d/109gVB6J0JrsXI1Fi3Ka6VMP5v5JXacDn/view?usp=drive_link',
      note: 'Windows版のみ',
      tags: ['primary'],
    },
  ],
  sources: [
    {
      label: 'TonboNotion01: Block Break',
      url: 'https://tonbonotion01.notion.site/1848538c8ca0805f9319fa2878f5a9b3',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
    {
      label: 'カクレ家ホウモツコ: Block Break',
      url: 'https://www.houmotsuko.net/game/old/brobre/index',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
