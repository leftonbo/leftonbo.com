import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'vket-2025-summer',
  slug: 'vket-2025-summer',
  title: 'Virtual Market 2025 Summer 出展',
  description: 'TonboWorkshop名義でVirtual Market 2025 Summerへ出展した記録。',
  category: 'vket',
  status: 'confirmed-record',
  role: 'exhibitor',
  period: '2025 Summer',
  firstPublishedAt: null,
  media: [],
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
      field: 'first-published-at',
      note: '出展情報の初公開日は未確認。',
    },
    {
      field: 'media',
      note: '再掲載可能な出展画像は未確認。',
    },
    {
      field: 'link-availability',
      note: 'カタログと本人告知の公開状態をサイト公開前に再確認する。',
    },
  ],
} satisfies Work
