import type { Work } from '../types'

export default {
  id: 'block-break',
  slug: 'block-break',
  title: 'Block Break',
  description: '過去に制作していたブロック崩しを、公開できる形に整えた作品。',
  category: 'past-game',
  status: 'archived',
  role: 'self-produced',
  period: '2013',
  firstPublishedAt: null,
  media: [
    {
      kind: 'image',
      url: '/images/works/block-break/hero.webp',
      alt: 'Block Breakのゲーム画面',
      credit: null,
    },
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
  featured: false,
  url: 'https://tonbonotion01.notion.site/1848538c8ca0805f9319fa2878f5a9b3',
  sources: [
    {
      label: 'TonboNotion01: Block Break',
      url: 'https://tonbonotion01.notion.site/1848538c8ca0805f9319fa2878f5a9b3',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-07-26',
  factsPending: [
    {
      field: 'first-published-at',
      note: 'Notionでは公開年のみ確認でき、月日は未確認。',
    },
  ],
} satisfies Work
