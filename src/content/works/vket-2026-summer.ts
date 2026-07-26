import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'vket-2026-summer',
  slug: 'vket-2026-summer',
  title: 'Virtual Market 2026 Summer 出展',
  description:
    '展示ワールド「VOLTAGER - EX-Volcano」に出展し、「TonboBattlefield」シリーズ、「いただき！お菓子パーティ」（いた菓子）、「がぶがぶスペクター」、「クソでっけぇプッシャーゲーム」を紹介。Antimatter Dimensions風の短編インクリメンタルゲームを遊べる構成とし、進行に合わせて各作品を紹介した。ブースの雰囲気は過去のVketから大きく変えている。',
  category: 'vket',
  status: 'confirmed-record',
  role: 'exhibitor',
  period: '2026 Summer',
  firstPublishedAt: '2026-07-11',
  media: [
    {
      kind: 'image',
      url: '/images/works/vket-2026-summer/hero.webp',
      alt: 'Virtual Market 2026 Summerに設置した短編インクリメンタルゲームで遊べるTonboWorkshopブース',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://vket.com/2026Summer/exhibitor/1779',
  sources: [
    {
      label: 'Vket 2026 Summer 出展者ページ',
      url: 'https://vket.com/2026Summer/exhibitor/1779',
      kind: 'third-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'LefTonboによる出展告知',
      url: 'https://x.com/LefTonbo/status/2075816666462859538',
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
