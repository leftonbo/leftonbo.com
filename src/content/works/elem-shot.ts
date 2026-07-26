import type { Work } from '../types'

export const elemShot = {
  id: 'elem-shot',
  slug: 'elem-shot',
  title: 'ElemShot',
  description: '3種類のショットを使い分けて進むシューティングゲーム。',
  category: 'past-game',
  status: 'archived',
  role: 'self-produced',
  period: '2014',
  firstPublishedAt: null,
  media: [
    {
      kind: 'image',
      url: '/images/works/elem-shot/hero.webp',
      alt: 'ElemShotのゲーム画面',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/elem-shot/gallery-02.webp',
      alt: 'ElemShotのスクリーンショット 2',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/elem-shot/gallery-03.webp',
      alt: 'ElemShotのスクリーンショット 3',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://tonbonotion01.notion.site/1848538c8ca08080a8e8ec3a4ea3d487',
  sources: [
    {
      label: 'TonboNotion01: ElemShot',
      url: 'https://tonbonotion01.notion.site/1848538c8ca08080a8e8ec3a4ea3d487',
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
