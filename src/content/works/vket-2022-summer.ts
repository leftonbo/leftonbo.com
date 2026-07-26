import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'vket-2022-summer',
  slug: 'vket-2022-summer',
  title: 'Virtual Market 2022 Summer 出展',
  description:
    '「Poppin\' Jump - Lemon Squash」の大型ブース枠で、制作ワールド「トンボ人狼」、「TonboBattlefield: Classic Remake」、「TonboBattlefield 2: The Two Bases」を紹介。大型枠を十分に活かしきれなかった展示でもあった。',
  category: 'vket',
  status: 'confirmed-record',
  role: 'exhibitor',
  period: '2022 Summer',
  firstPublishedAt: '2022-08-13',
  media: [
    {
      kind: 'image',
      url: '/images/works/vket-2022-summer/hero.webp',
      alt: "Vket 2022 SummerのPoppin' Jump - Lemon Squashに設置したゲームワールド紹介ブース",
      credit: null,
    },
  ],
  featured: false,
  url: 'https://summer2022.vket.com/',
  sources: [
    {
      label: 'Virtual Market 2022 Summer 公式サイト',
      url: 'https://summer2022.vket.com/',
      kind: 'third-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
  ],
  verifiedAt: CONTENT_VERIFIED_AT,
  factsPending: [],
} satisfies Work
