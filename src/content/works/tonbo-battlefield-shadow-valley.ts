import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export const tonboBattlefieldShadowValley = {
  id: 'tonbo-battlefield-shadow-valley',
  slug: 'tonbo-battlefield-shadow-valley',
  title: 'TonboBattlefield: Shadow Valley',
  description:
    'TonboBattlefieldシリーズ第3作となるハロウィン仕様の対戦ワールド。一新したマップ、新しい武器、隠し要素を収録する。',
  category: 'vrchat-world',
  status: 'published',
  role: 'self-produced',
  period: '2022',
  firstPublishedAt: '2022-10-15',
  media: [
    {
      kind: 'image',
      url: '/images/works/tonbo-battlefield-shadow-valley/hero.webp',
      alt: 'TonboBattlefield: Shadow Valleyのサムネイル',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://vrchat.com/home/launch?worldId=wrld_c063925a-f1b6-4901-ad91-26b3bdfd1270',
  sources: [
    {
      label: 'VRChat: TonboBattlefield: Shadow Valley',
      url: 'https://vrchat.com/home/launch?worldId=wrld_c063925a-f1b6-4901-ad91-26b3bdfd1270',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'TonboNotion01: TonboBattlefield: Shadow Valley',
      url: 'https://tonbonotion01.notion.site/3ceef8c313114f578c037dc4f24fece8',
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
