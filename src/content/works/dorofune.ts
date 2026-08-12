import type { Work } from '../types'

export default {
  id: 'dorofune',
  slug: 'dorofune',
  title: 'どろふね',
  summary: '沈むたびに残る「悔しさ」で次の船を加速させ、海を目指す避けゲーム。',
  introduction: [
    '海を目指す「人」を乗せた泥船は自動で進むが、やがて沈んでしまう。そこで残った「悔しさ」が、新しい泥船を加速させる。',
    '2013年に大学サークルの展示作品として公開した。',
  ],
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2013',
  firstPublishedAt: '2013-11-22',
  gameDetails: {
    genre: '避けゲー',
    developmentTool: 'DXライブラリ',
  },
  heroMedia: {
    kind: 'image',
    url: '/images/works/dorofune/hero.webp',
    alt: 'どろふねのゲーム画面',
    credit: null,
  },
  media: [],
  featuredOrder: null,
  links: [
    {
      label: '作品をダウンロード',
      url: 'https://drive.google.com/file/d/1mfbte0ZXoCkWVO3VSnzS_5qu-GilCbrA/view?usp=drive_link',
      note: 'Windows版のみ',
      tags: ['primary'],
    },
  ],
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
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
