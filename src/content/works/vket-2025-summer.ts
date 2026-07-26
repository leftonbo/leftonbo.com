import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'vket-2025-summer',
  slug: 'vket-2025-summer',
  title: 'Virtual Market 2025 Summer 出展',
  description:
    '「がぶがぶスペクター」を展示し、「TonboBattlefield」シリーズ、「かわいい子たちとお家を建てるゲーム」の紹介ムービー、「クソでっけぇプッシャーゲーム」を紹介した。',
  category: 'vket',
  status: 'confirmed-record',
  role: 'exhibitor',
  period: '2025 Summer',
  firstPublishedAt: '2025-07-12',
  media: [
    {
      kind: 'image',
      url: '/images/works/vket-2025-summer/hero.webp',
      alt: 'Virtual Market 2025 Summerに設置したTonboWorkshopの展示ブース',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://vket.com/2025Summer/exhibitor/310',
  sources: [
    {
      label: 'Vket 2025 Summer 出展者ページ',
      url: 'https://vket.com/2025Summer/exhibitor/310',
      kind: 'third-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'LefTonboによる出展告知',
      url: 'https://x.com/LefTonbo/status/1943618961502789769',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
  ],
  verifiedAt: CONTENT_VERIFIED_AT,
  factsPending: [
    {
      field: 'link-availability',
      note: 'カタログと本人告知の公開状態をサイト公開前に再確認する。',
    },
  ],
} satisfies Work
