import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'vket-2022-summer',
  slug: 'vket-2022-summer',
  title: 'Virtual Market 2022 Summer 出展',
  summary: '大型ブースで「トンボ人狼」など3つのVRChatワールドを紹介したVket出展。',
  introduction: [
    "「Poppin' Jump - Lemon Squash」の大型ブース枠で、制作ワールド「トンボ人狼」、「TonboBattlefield Classic」、「TonboBattlefield 2: The Two Bases」を紹介した。",
    '大型枠を十分に活かしきれなかった展示でもあった。',
  ],
  category: 'vket',
  status: 'confirmed-record',
  role: 'exhibitor',
  period: '2022',
  firstPublishedAt: '2022-08-13',
  vketExhibition: {
    world: {
      name: "Poppin' Jump - Lemon Squash",
      url: 'https://vrchat.com/home/launch?worldId=wrld_84a006d7-171b-4925-9b46-0fd142927a24',
    },
  },
  heroMedia: {
    kind: 'image',
    url: '/images/works/vket-2022-summer/hero.webp',
    alt: "Vket 2022 SummerのPoppin' Jump - Lemon Squashに設置したゲームワールド紹介ブース",
    credit: null,
  },
  media: [],
  featuredOrder: null,
  links: [
    {
      label: 'Vket公式サイトを見る',
      url: 'https://summer2022.vket.com/',
      tags: ['primary'],
    },
  ],
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
