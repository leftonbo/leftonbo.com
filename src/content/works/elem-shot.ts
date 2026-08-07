import type { Work } from '../types'

export default {
  id: 'elem-shot',
  slug: 'elem-shot',
  title: 'ElemShot',
  summary: '3種類のショットを使い分けて進むシューティングゲーム。',
  introduction: ['3種類のショットを使い分けて進むシューティングゲーム。'],
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2013',
  firstPublishedAt: '2013-09-30',
  gameDetails: {
    genre: 'シューティング',
    developmentTool: 'DXライブラリ',
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
  url: 'https://drive.google.com/file/d/15Weks96HSMpK13ic01lo1OfrFfGD7I8X/view?usp=drive_link',
  primaryActionNote: 'Windows版のみ',
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
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
