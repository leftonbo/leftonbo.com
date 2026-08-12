import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'vket-2024-summer',
  slug: 'vket-2024-summer',
  title: 'Virtual Market 2024 Summer 出展',
  summary: '「がぶがぶスペクター」と制作ワールドを、魔女の森に合わせたブースで紹介したVket出展。',
  introduction: [
    '展示ワールド「魔女の森ノクトール - MIRAGE」に出展し、「がぶがぶスペクター」を展示。「TonboBattlefield」シリーズと「かわいい子たちとお家を建てるゲーム」を紹介した。',
    '「かわいい子たちとお家を建てるゲーム」の紹介ムービーを追加したほか、出展ワールドの雰囲気に合わせてブースを細かく変更した。',
  ],
  category: 'vket',
  status: 'confirmed-record',
  role: 'exhibitor',
  period: '2024',
  firstPublishedAt: '2024-07-20',
  vketExhibition: {
    world: {
      name: '魔女の森ノクトール - MIRAGE',
      url: 'https://vrchat.com/home/launch?worldId=wrld_d1d11132-e119-4f1a-8179-e65007849c44',
    },
  },
  heroMedia: {
    kind: 'image',
    url: '/images/works/vket-2024-summer/hero.webp',
    alt: 'Virtual Market 2024 Summerに設置したがぶがぶスペクターとゲーム作品の展示ブース',
    credit: null,
  },
  media: [],
  featuredOrder: null,
  links: [
    {
      label: '出展時のX投稿を見る',
      url: 'https://x.com/LefTonbo/status/1814658684930437351',
      tags: ['primary'],
    },
  ],
  sources: [
    {
      label: 'LefTonboによる出展告知',
      url: 'https://x.com/LefTonbo/status/1814658684930437351',
      kind: 'first-party-public',
      role: 'event-post',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
  ],
  verifiedAt: CONTENT_VERIFIED_AT,
  factsPending: [],
} satisfies Work
