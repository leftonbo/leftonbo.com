import type { Work } from '../types'

export default {
  id: 'go-and-battle',
  slug: 'go-and-battle',
  title: 'Go and Battle!',
  summary: 'すごろくとRPG風の戦闘を組み合わせ、ボスやライバルを倒してゴールを目指すゲーム。',
  introduction: ['すごろくにRPG風の戦闘を組み合わせ、ボスやライバルを倒しながらゴールを目指す。'],
  category: 'game',
  status: 'archived',
  role: 'self-produced',
  period: '2008',
  firstPublishedAt: '2008-02-21',
  gameDetails: {
    genre: 'すごろくRPG',
    developmentTool: 'Tonyu System',
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
  url: 'https://drive.google.com/file/d/1LgigLl-QRvQql4gCS_76Y1Am8gVgbxiP/view?usp=drive_link',
  primaryActionNote: 'Windows版のみ',
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
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
