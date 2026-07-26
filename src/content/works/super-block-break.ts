import type { Work } from '../types'

export default {
  id: 'super-block-break',
  slug: 'super-block-break',
  title: 'スーパーブロック崩し',
  description: '公開情報で確認できる、最も古い制作ゲーム。',
  category: 'past-game',
  status: 'archived',
  role: 'self-produced',
  period: '2004',
  firstPublishedAt: null,
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
  ],
  verifiedAt: '2026-07-26',
  factsPending: [
    {
      field: 'first-published-at',
      note: 'Notionでは公開年のみ確認でき、月日は未確認。',
    },
  ],
} satisfies Work
