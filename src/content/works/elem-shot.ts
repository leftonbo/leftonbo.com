import type { Work } from '../types'

export default {
  id: 'elem-shot',
  slug: 'elem-shot',
  title: 'ElemShot',
  description: '3種類のショットを使い分けて進むシューティングゲーム。',
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2014',
  firstPublishedAt: null,
  gameDetails: {
    genre: 'シューティング',
    developmentTool: 'DXライブラリ',
    introduction: ['3種類のショットを使い分けて進むシューティングゲーム。'],
  },
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
    {
      label: 'カクレ家ホウモツコ: ElemShot',
      url: 'https://www.houmotsuko.net/game/old/elemshot/index',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-07-26',
  factsPending: [
    {
      field: 'first-published-at',
      note: 'Notionと旧サイトでは初公開年のみ確認でき、月日は未確認。',
    },
  ],
} satisfies Work
