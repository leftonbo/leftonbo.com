import type { Work } from '../types'

export default {
  id: 'battle-viewer',
  slug: 'battle-viewer',
  title: 'ばとるびゅ～わ',
  description: '四角い生命体が戦う様子を眺めるシミュレーションゲーム。',
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2009',
  firstPublishedAt: null,
  gameDetails: {
    genre: 'シミュレーション',
    developmentTool: 'Tonyu System',
    introduction: ['四角い生命体が戦う様子を眺めるシミュレーションゲーム。'],
  },
  media: [
    {
      kind: 'image',
      url: '/images/works/battle-viewer/hero.webp',
      alt: 'ばとるびゅ～わのゲーム画面',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://tonbonotion01.notion.site/1848538c8ca08034ab74e872cd8aac2e',
  sources: [
    {
      label: 'TonboNotion01: ばとるびゅ～わ',
      url: 'https://tonbonotion01.notion.site/1848538c8ca08034ab74e872cd8aac2e',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
    {
      label: 'カクレ家ホウモツコ: ばとるびゅ～わ',
      url: 'https://www.houmotsuko.net/game/old/btlvwr/index',
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
