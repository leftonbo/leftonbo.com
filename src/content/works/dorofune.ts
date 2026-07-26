import type { Work } from '../types'

export default {
  id: 'dorofune',
  slug: 'dorofune',
  title: 'どろふね',
  description:
    '海を目指す「人」を乗せた泥船が、沈んでは新しい船へ思いをつないでいくゲーム。残った「悔しさ」が次の泥船を加速させる。',
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2014',
  firstPublishedAt: null,
  gameDetails: {
    genre: '避けゲー',
    developmentTool: 'DXライブラリ',
    introduction: [
      '海を目指す「人」を乗せた泥船は自動で進むが、やがて沈んでしまう。そこで残った「悔しさ」が、新しい泥船を加速させる。',
    ],
  },
  media: [
    {
      kind: 'image',
      url: '/images/works/dorofune/hero.webp',
      alt: 'どろふねのゲーム画面',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://tonbonotion01.notion.site/1848538c8ca080e3bc62cb6847f5ef6e',
  sources: [
    {
      label: 'TonboNotion01: どろふね',
      url: 'https://tonbonotion01.notion.site/1848538c8ca080e3bc62cb6847f5ef6e',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
    {
      label: 'カクレ家ホウモツコ: どろふね',
      url: 'https://www.houmotsuko.net/game/old/dorofune/index',
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
