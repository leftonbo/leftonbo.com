import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'vket-2024-winter',
  slug: 'vket-2024-winter',
  title: 'Virtual Market 2024 Winter 出展',
  summary:
    '「がぶがぶスペクター」と制作ワールドを、ガチャットピアに合わせたブースで紹介したVket出展。',
  introduction: [
    '展示ワールド「ガチャットピア - ミスティックカプセル」に出展し、「がぶがぶスペクター」を展示。「TonboBattlefield」シリーズと「かわいい子たちとお家を建てるゲーム」の紹介ムービーも展示した。',
    '紹介内容は2024 Summerとほぼ同じだが、出展ワールドの雰囲気に合わせてブースを細かく変更した。',
  ],
  category: 'vket',
  status: 'confirmed-record',
  role: 'exhibitor',
  period: '2024',
  firstPublishedAt: '2024-12-07',
  vketExhibition: {
    world: {
      name: 'ガチャットピア - ミスティックカプセル',
      url: 'https://vrchat.com/home/launch?worldId=wrld_77aae327-c106-407e-b7d2-6d4fd8c32617',
    },
  },
  heroMedia: {
    kind: 'image',
    url: '/images/works/vket-2024-winter/hero.webp',
    alt: 'Virtual Market 2024 Winterに設置したがぶがぶスペクターとゲーム作品の展示ブース',
    credit: null,
  },
  media: [],
  featuredOrder: null,
  links: [
    {
      label: '出展時のX投稿を見る',
      url: 'https://x.com/LefTonbo/status/1865275992589373950',
      tags: ['primary'],
    },
  ],
  sources: [
    {
      label: 'LefTonboによる出展告知',
      url: 'https://x.com/LefTonbo/status/1865275992589373950',
      kind: 'first-party-public',
      role: 'event-post',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
  ],
  verifiedAt: CONTENT_VERIFIED_AT,
  factsPending: [],
} satisfies Work
