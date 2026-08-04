import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'vket-2020',
  slug: 'vket-2020',
  title: 'Vket 5 出展',
  description:
    '「メテコレプカ - キギステルトフ」で「サジャクサハギン」を展示した、初めてのVket出展。初のアバター頒布でもある記念すべき第一ブースで、このときは旧グループ名「カクレ家ホウモツコ」を使用していた。',
  category: 'vket',
  status: 'confirmed-record',
  role: 'exhibitor',
  period: '2020',
  firstPublishedAt: '2020-12-18',
  vketExhibition: {
    world: {
      name: 'メテコレプカ - キギステルトフ',
      url: 'https://vrchat.com/home/launch?worldId=wrld_70f79986-2e5c-4ba2-8364-3414b4bab501',
    },
  },
  media: [
    {
      kind: 'image',
      url: '/images/works/vket-2020/hero.webp',
      alt: 'Vket 5のメテコレプカ - キギステルトフに設置したサジャクサハギン展示ブース',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://x.com/LefTonbo/status/1340158760346505217',
  sources: [
    {
      label: 'LefTonboによる出展告知',
      url: 'https://x.com/LefTonbo/status/1340158760346505217',
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
