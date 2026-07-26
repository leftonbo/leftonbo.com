import type { Work } from '../types'

export default {
  id: 'go-and-battle',
  slug: 'go-and-battle',
  title: 'Go and Battle!',
  description: 'すごろくにRPG風の戦闘を組み合わせたゲーム。ボスやライバルを倒しながらゴールを目指す。',
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2009',
  firstPublishedAt: null,
  gameDetails: {
    genre: 'すごろくRPG',
    developmentTool: 'Tonyu System',
    introduction: ['すごろくにRPG風の戦闘を組み合わせ、ボスやライバルを倒しながらゴールを目指す。'],
  },
  media: [
    {
      kind: 'image',
      url: '/images/works/go-and-battle/hero.webp',
      alt: 'Go and Battle!のゲーム画面',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/go-and-battle/gallery-02.webp',
      alt: 'Go and Battle!のスクリーンショット 2',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/go-and-battle/gallery-03.webp',
      alt: 'Go and Battle!のスクリーンショット 3',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/go-and-battle/gallery-04.webp',
      alt: 'Go and Battle!のスクリーンショット 4',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://tonbonotion01.notion.site/1848538c8ca0803c99a9cb82648afdb7',
  sources: [
    {
      label: 'TonboNotion01: Go and Battle!',
      url: 'https://tonbonotion01.notion.site/1848538c8ca0803c99a9cb82648afdb7',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
    {
      label: 'カクレ家ホウモツコ: Go and Battle!',
      url: 'https://www.houmotsuko.net/game/old/goaba/index',
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
