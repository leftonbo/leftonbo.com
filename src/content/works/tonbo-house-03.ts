import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'tonbo-house-03',
  slug: 'tonbo-house-03',
  title: 'TonboHouse03',
  description:
    '3番目のホームワールド。ささやかな食事と、数値がインフレしていくUdonChipsゲームを楽しめる。',
  category: 'vrchat-world',
  status: 'published',
  role: 'self-produced',
  period: '2023',
  firstPublishedAt: '2023-01-21',
  media: [
    {
      kind: 'image',
      url: '/images/works/tonbo-house-03/hero.webp',
      alt: 'TonboHouse03の室内',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://vrchat.com/home/world/wrld_74ae3805-93b3-4945-a495-a20eb2984eb6',
  sources: [
    {
      label: 'VRChat: TonboHouse03',
      url: 'https://vrchat.com/home/world/wrld_74ae3805-93b3-4945-a495-a20eb2984eb6',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'TonboNotion01: TonboHouse03',
      url: 'https://tonbonotion01.notion.site/f8bc39f3d8f64449a5d5be0a252d3c51',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-07-26',
  factsPending: [
    {
      field: 'last-updated-at',
      note: 'ワールドの最終更新日は未確認。',
    },
  ],
} satisfies Work
