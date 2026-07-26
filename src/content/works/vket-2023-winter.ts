import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'vket-2023-winter',
  slug: 'vket-2023-winter',
  title: 'Virtual Market 2023 Winter 出展',
  description: 'TonboWorkshop名義でVirtual Market 2023 Winterへ出展した記録。',
  category: 'vket',
  status: 'confirmed-record',
  role: 'exhibitor',
  period: '2023 Winter',
  firstPublishedAt: null,
  media: [],
  featured: false,
  url: 'https://x.com/LefTonbo/status/1730542256560419126',
  sources: [
    {
      label: 'LefTonboによる出展告知',
      url: 'https://x.com/LefTonbo/status/1730542256560419126',
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
      note: '本人告知の公開状態をサイト公開前に再確認する。',
    },
  ],
} satisfies Work
