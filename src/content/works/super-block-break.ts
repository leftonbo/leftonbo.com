import type { Work } from '../types'

export default {
  id: 'super-block-break',
  slug: 'super-block-break',
  title: 'スーパーブロック崩し',
  description: '公開情報で確認できる、最も古い制作ゲーム。',
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2004',
  firstPublishedAt: '2004-07-18',
  gameDetails: {
    genre: 'ブロック崩し',
    developmentTool: 'Tonyu System',
    introduction: ['Tonyu Systemを使って制作した、公開情報で確認できる範囲では最も古いゲーム。'],
  },
  media: [
    {
      kind: 'image',
      url: '/images/works/super-block-break/hero.webp',
      alt: 'スーパーブロック崩しのゲーム画面',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://tonbonotion01.notion.site/1848538c8ca080099e9cc01a5be97a0e',
  sources: [
    {
      label: 'TonboNotion01: スーパーブロック崩し',
      url: 'https://tonbonotion01.notion.site/1848538c8ca080099e9cc01a5be97a0e',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
    {
      label: 'カクレ家ホウモツコ: スーパーブロック崩し',
      url: 'https://www.houmotsuko.net/game/old/spblock/index',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-07-26',
  factsPending: [],
} satisfies Work
