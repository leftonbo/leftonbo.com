import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'biter-spectre',
  slug: 'biter-spectre',
  title: 'がぶがぶスペクター',
  summary: '黒いおばけをモチーフに、カラー変更や舌のギミックを備えたVRChat向け販売アバター。',
  introduction: [
    'Vket 2023 Winterへの出展を機に頒布を始めた、PC／Quest両対応のVRChat向け販売アバター。黒いおばけの姿をモチーフにしている。',
    'カラー変更に対応し、舌を長く伸ばせるギミックを備える。',
  ],
  category: 'avatar-3d',
  status: 'published',
  role: 'self-produced',
  period: '2023',
  firstPublishedAt: '2023-12-02',
  heroMedia: {
    kind: 'image',
    url: '/images/works/biter-spectre/hero.webp',
    alt: 'がぶがぶスペクターのキャラクター画像',
    credit: null,
  },
  media: [],
  featuredOrder: 3,
  links: [
    {
      label: 'ショップで見る',
      url: 'https://booth.pm/ja/items/5221596',
      tags: ['primary'],
    },
  ],
  sources: [
    {
      label: 'BOOTH: がぶがぶスペクター',
      url: 'https://booth.pm/ja/items/5221596',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'TonboNotion01: がぶがぶスペクター',
      url: 'https://tonbonotion01.notion.site/a5724f2763b244cdbaf60648ddad4355',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
    {
      label: 'がぶがぶスペクター紹介動画',
      url: 'https://www.youtube.com/watch?v=L6p00Q4XVSM',
      kind: 'first-party-public',
      role: 'video',
      verifiedAt: '2026-08-07',
    },
  ],
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
