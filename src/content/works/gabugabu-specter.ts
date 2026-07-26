import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'gabugabu-specter',
  slug: 'gabugabu-specter',
  title: 'がぶがぶスペクター',
  description: 'SDK3、PhysBone、lilToon、PC／Questに対応する販売アバター。',
  category: 'avatar-3d',
  status: 'published',
  role: 'pending-confirmation',
  period: '2023',
  firstPublishedAt: '2023-12-02',
  media: [
    {
      kind: 'image',
      url: '/images/works/gabugabu-specter/hero.webp',
      alt: 'がぶがぶスペクターのキャラクター画像',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://booth.pm/ja/items/5221596',
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
  ],
  verifiedAt: '2026-07-26',
  factsPending: [
    {
      field: 'role',
      note: '公開資料で本人の具体的な制作担当表記を確認する。',
    },
    {
      field: 'current-status',
      note: '現在の販売状態をサイト公開前に確認する。',
    },
    {
      field: 'version',
      note: '最新バージョンは未確認。',
    },
  ],
} satisfies Work
