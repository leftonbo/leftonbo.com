import type { Work } from '../types'

export default {
  id: 'pipe-4-run',
  slug: 'pipe-4-run',
  title: 'Pipe 4 Run',
  summary: 'パイプをつないで水をゴールへ導き、スコアを競う最大8人対応の対戦パズル。',
  introduction: [
    'STARTから流れる水がENDへ届くようにパイプを配置する。ENDへ到達したプレイヤーのうち、最もスコアが高い人が勝利する。推奨人数は4人までで、最大8人で対戦できる。',
  ],
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2014',
  firstPublishedAt: '2014-06-17',
  gameDetails: {
    genre: '対戦パズル',
    developmentTool: null,
  },
  heroMedia: {
    kind: 'image',
    url: '/images/works/pipe-4-run/hero.webp',
    alt: 'Pipe 4 Runのゲーム画面',
    credit: null,
  },
  media: [],
  featuredOrder: null,
  links: [
    {
      label: '作品をダウンロード',
      url: 'https://drive.google.com/file/d/1bDgsBggb3YN2yd8X5n5rMcOtlDFsNfr4/view?usp=drive_link',
      note: 'Windows版のみ',
      tags: ['primary'],
    },
  ],
  sources: [
    {
      label: 'TonboNotion01: Pipe 4 Run',
      url: 'https://tonbonotion01.notion.site/1848538c8ca080da9b59e3ecb5b49ee4',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
    {
      label: 'カクレ家ホウモツコ: Pipe 4 Run',
      url: 'https://www.houmotsuko.net/game/old/p4r/index',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
