import type { Work } from '../types'

export default {
  id: 'ball-maze',
  slug: 'ball-maze',
  title: 'Ball Maze',
  description: 'ビー玉転がし風の迷路ゲーム。',
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2006',
  firstPublishedAt: null,
  gameDetails: {
    genre: '擬似3D迷路',
    developmentTool: 'Tonyu System',
    introduction: ['Tonyu Systemで制作した、ビー玉転がし風の迷路ゲーム。全14ステージを収録する。'],
  },
  media: [],
  featured: false,
  url: 'https://tonbonotion01.notion.site/1848538c8ca0808b9b3ae07c45887c57',
  sources: [
    {
      label: 'TonboNotion01: Ball Maze',
      url: 'https://tonbonotion01.notion.site/1848538c8ca0808b9b3ae07c45887c57',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
    {
      label: 'カクレ家ホウモツコ: Ball Maze',
      url: 'https://www.houmotsuko.net/game/old/bmaze/index',
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
    {
      field: 'media',
      note: '公開ページに再掲載できる画像は見つかっていない。',
    },
  ],
} satisfies Work
