import type { Work } from '../types'

export default {
  id: 'battle-viewer',
  slug: 'battle-viewer',
  title: 'ばとるびゅ～わ',
  summary: '四角い生命体が戦う様子を眺めるシミュレーションゲーム。',
  introduction: ['四角い生命体が戦う様子を眺めるシミュレーションゲーム。'],
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2008',
  firstPublishedAt: '2008-05-21',
  gameDetails: {
    genre: 'シミュレーション',
    developmentTool: 'Tonyu System',
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
  url: 'https://drive.google.com/file/d/1VvXSW2YZoQPVYTzmnVffLo54C5709u74/view?usp=drive_link',
  primaryActionNote: 'Windows版のみ',
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
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
