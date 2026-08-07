import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'sajak-sahagin',
  slug: 'sajak-sahagin',
  title: 'サジャクサハギン',
  description:
    'Vket 5への出展を機に頒布を始めた、PC／Quest両対応のVRChat向け無料アバター。サメのような姿をした魚人をモチーフにしている。',
  category: 'avatar-3d',
  status: 'published',
  role: 'self-produced',
  period: '2020',
  firstPublishedAt: '2020-12-18',
  media: [
    {
      kind: 'image',
      url: '/images/works/sajak-sahagin/hero.webp',
      alt: 'サメのような姿をした魚人アバター「サジャクサハギン」',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://booth.pm/ja/items/2610294',
  sources: [
    {
      label: 'BOOTH: サジャクサハギン',
      url: 'https://booth.pm/ja/items/2610294',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
  ],
  verifiedAt: '2026-08-07',
  factsPending: [
    {
      field: 'current-status',
      note: '現在の配布状態をサイト公開前に確認する。',
    },
  ],
} satisfies Work
