import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'tonbo-battlefield-classic-remake',
  slug: 'tonbo-battlefield-classic-remake',
  title: 'TonboBattlefield Classic（トンバト クラシック）',
  description:
    'Udon製のバトルアクションワールド。剣・銃・拳を使い、複数のゲームモードで対戦できる。',
  category: 'vrchat-world',
  status: 'published',
  role: 'self-produced',
  period: '2021',
  firstPublishedAt: '2021-01-21',
  media: [
    {
      kind: 'image',
      url: '/images/works/tonbo-battlefield-classic-remake/hero.webp',
      alt: 'TonboBattlefield Classicのサムネイル',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/tonbo-battlefield-classic-remake/gallery-02.webp',
      alt: 'TonboBattlefield 01がSpotlightワールドに掲載された画面',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://vrchat.com/home/launch?worldId=wrld_b20a27d2-cd22-4aa0-a25b-666dc97451ec',
  sources: [
    {
      label: 'VRChat: TonboBattlefield Classic',
      url: 'https://vrchat.com/home/launch?worldId=wrld_b20a27d2-cd22-4aa0-a25b-666dc97451ec',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'TonboNotion01: TonboBattlefield Classic',
      url: 'https://tonbonotion01.notion.site/8291330e759e4e8db7b647a3d128e2d1',
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
