import type { Work } from '../types'

export default {
  id: 'ball-maze',
  slug: 'ball-maze',
  title: 'Ball Maze',
  summary: '全14ステージを収録した、ビー玉転がし風の迷路ゲーム。',
  introduction: ['Tonyu Systemで制作した、ビー玉転がし風の迷路ゲーム。全14ステージを収録する。'],
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2006',
  firstPublishedAt: '2006-03-17',
  gameDetails: {
    genre: '擬似3D迷路',
    developmentTool: 'Tonyu System',
  },
  heroMedia: null,
  media: [],
  featuredOrder: null,
  links: [
    {
      label: '作品をダウンロード',
      url: 'https://drive.google.com/file/d/1UCmCTtbGTsaCXiZY5gMHlke7wi7AfIdv/view?usp=drive_link',
      note: 'Windows版のみ',
      tags: ['primary'],
    },
  ],
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
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
