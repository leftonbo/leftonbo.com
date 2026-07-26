import type { Work } from '../types'

export default {
  id: 'pipe-4-run',
  slug: 'pipe-4-run',
  title: 'Pipe 4 Run',
  description:
    'STARTから流れる水がENDへ届くようにパイプを配置する対戦パズル。到達したプレイヤーのうち、最もスコアが高い人が勝利する。最大8人まで対応。',
  category: 'past-game',
  status: 'archived',
  role: 'self-produced',
  period: '2014',
  firstPublishedAt: null,
  media: [
    {
      kind: 'image',
      url: '/images/works/pipe-4-run/hero.webp',
      alt: 'Pipe 4 Runのゲーム画面',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://tonbonotion01.notion.site/1848538c8ca080da9b59e3ecb5b49ee4',
  sources: [
    {
      label: 'TonboNotion01: Pipe 4 Run',
      url: 'https://tonbonotion01.notion.site/1848538c8ca080da9b59e3ecb5b49ee4',
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
