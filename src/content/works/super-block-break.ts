import type { Work } from '../types'

export default {
  id: 'super-block-break',
  slug: 'super-block-break',
  title: 'スーパーブロック崩し',
  summary: 'Tonyu Systemで制作した、公開情報上もっとも古い制作ゲーム。',
  introduction: ['Tonyu Systemを使って制作した、公開情報で確認できる範囲では最も古いゲーム。'],
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2004',
  firstPublishedAt: '2004-07-18',
  gameDetails: {
    genre: 'ブロック崩し',
    developmentTool: 'Tonyu System',
  },
  heroMedia: {
    kind: 'image',
    url: '/images/works/super-block-break/hero.webp',
    alt: 'スーパーブロック崩しのゲーム画面',
    credit: null,
  },
  media: [],
  featuredOrder: null,
  links: [
    {
      label: '作品をダウンロード',
      url: 'https://drive.google.com/file/d/1qn27Lf1UWREOL9IQkhPc6TzYLbMvsMiA/view?usp=drive_link',
      note: 'Windows版のみ',
      tags: ['primary'],
    },
  ],
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
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
