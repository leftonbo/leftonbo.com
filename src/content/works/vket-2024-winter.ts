import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'vket-2024-winter',
  slug: 'vket-2024-winter',
  title: 'Virtual Market 2024 Winter 出展',
  description:
    '展示ワールド「ガチャットピア - ミスティックカプセル」に出展し、「がぶがぶスペクター」を展示。「TonboBattlefield」シリーズと「かわいい子たちとお家を建てるゲーム」の紹介ムービーも展示した。内容は2024 Summerとほぼ同じだが、出展ワールドの雰囲気に合わせてブースを細かく変更した。',
  category: 'vket',
  status: 'confirmed-record',
  role: 'exhibitor',
  period: '2024 Winter',
  firstPublishedAt: '2024-12-07',
  media: [
    {
      kind: 'image',
      url: '/images/works/vket-2024-winter/hero.webp',
      alt: 'Virtual Market 2024 Winterに設置したがぶがぶスペクターとゲーム作品の展示ブース',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://x.com/LefTonbo/status/1865275992589373950',
  sources: [
    {
      label: 'LefTonboによる出展告知',
      url: 'https://x.com/LefTonbo/status/1865275992589373950',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
  ],
  verifiedAt: CONTENT_VERIFIED_AT,
  factsPending: [
    {
      field: 'link-availability',
      note: '本人告知の公開状態をサイト公開前に再確認する。',
    },
  ],
} satisfies Work
