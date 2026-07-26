import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'sajak-sahagin-v3',
  slug: 'sajak-sahagin-v3',
  title: 'サジャクサハギン v3.0',
  description: 'SDK3、PhysBone、lilToon、PC／Questに対応する無料アバター。',
  category: 'avatar-3d',
  status: 'published',
  role: 'model-creator',
  period: '2023',
  firstPublishedAt: null,
  media: [],
  featured: false,
  url: 'https://booth.pm/ja/items/2610294',
  sources: [
    {
      label: 'BOOTH: サジャクサハギン v3.0',
      url: 'https://booth.pm/ja/items/2610294',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
  ],
  verifiedAt: CONTENT_VERIFIED_AT,
  factsPending: [
    {
      field: 'current-status',
      note: '現在の配布状態をサイト公開前に確認する。',
    },
    {
      field: 'first-published-at',
      note: 'v3.0としての初公開日は未確認。',
    },
    {
      field: 'version',
      note: 'v3.0が最新バージョンかは未確認。',
    },
    {
      field: 'media',
      note: '再掲載可能な商品画像とクレジットを確認する。',
    },
  ],
} satisfies Work
