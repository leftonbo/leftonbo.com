import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'vket-2023-winter',
  slug: 'vket-2023-winter',
  title: 'Virtual Market 2023 Winter 出展',
  summary: '初の販売アバター「がぶがぶスペクター」と制作ワールドを紹介したVket出展。',
  introduction: [
    '展示ワールド「龍の背中 - ウンバルスカイ」に出展し、初の有料販売アバター「がぶがぶスペクター」を展示。「TonboBattlefield」シリーズと、当時開発中だった「かわいい子たちとお家を建てるゲーム」（かわうち）を紹介した。',
    'このとき作ったブース展示モデルは後の雛形となり、その後しばらくブース制作のベースに使用した。',
  ],
  category: 'vket',
  status: 'confirmed-record',
  role: 'exhibitor',
  period: '2023',
  firstPublishedAt: '2023-12-02',
  vketExhibition: {
    world: {
      name: '龍の背中 - ウンバルスカイ',
      url: 'https://vrchat.com/home/launch?worldId=wrld_ec2d7769-a025-4dd9-9710-e7e555b5e2c5',
    },
  },
  media: [
    {
      kind: 'image',
      url: '/images/works/vket-2023-winter/hero.webp',
      alt: 'Virtual Market 2023 Winterに設置したがぶがぶスペクターの展示ブース',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://x.com/LefTonbo/status/1730542256560419126',
  sources: [
    {
      label: 'LefTonboによる出展告知',
      url: 'https://x.com/LefTonbo/status/1730542256560419126',
      kind: 'first-party-public',
      role: 'event-post',
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
