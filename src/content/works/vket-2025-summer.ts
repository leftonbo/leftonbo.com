import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'vket-2025-summer',
  slug: 'vket-2025-summer',
  title: 'Virtual Market 2025 Summer 出展',
  summary: 'アバターと3つのゲーム作品を「森聖街 ヤポプエト」で紹介したVket出展。',
  introduction: [
    '展示ワールド「森聖街 ヤポプエト - 中願の秋夜」に出展し、「がぶがぶスペクター」を展示した。',
    '「TonboBattlefield」シリーズ、「かわいい子たちとお家を建てるゲーム」の紹介ムービー、「クソでっけぇプッシャーゲーム」も紹介した。',
  ],
  category: 'vket',
  status: 'confirmed-record',
  role: 'exhibitor',
  period: '2025',
  firstPublishedAt: '2025-07-12',
  vketExhibition: {
    world: {
      name: '森聖街 ヤポプエト - 中願の秋夜',
      url: 'https://vrchat.com/home/launch?worldId=wrld_63f5b036-89d5-4d47-bc31-a6761173e13e',
    },
  },
  heroMedia: {
    kind: 'image',
    url: '/images/works/vket-2025-summer/hero.webp',
    alt: 'Virtual Market 2025 Summerに設置したTonboWorkshopの展示ブース',
    credit: null,
  },
  media: [],
  featuredOrder: null,
  links: [
    {
      label: 'Vket出展者ページを見る',
      url: 'https://vket.com/2025Summer/exhibitor/310',
      tags: ['primary'],
    },
  ],
  sources: [
    {
      label: 'Vket 2025 Summer 出展者ページ',
      url: 'https://vket.com/2025Summer/exhibitor/310',
      kind: 'third-party-public',
      role: 'catalog',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'LefTonboによる出展告知',
      url: 'https://x.com/LefTonbo/status/1943618961502789769',
      kind: 'first-party-public',
      role: 'event-post',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
  ],
  verifiedAt: CONTENT_VERIFIED_AT,
  factsPending: [],
} satisfies Work
