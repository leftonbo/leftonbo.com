import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'massive-medal-pusher',
  slug: 'massive-medal-pusher',
  title: 'クソでっけぇプッシャーゲーム',
  summary: '巨大なプッシャー台を強化しながら大量のメダル獲得を目指す、共同制作のVRChatワールド。',
  introduction: [
    'りくち氏が制作した、巨大なプッシャー台で遊べるVRChatワールド。メダルを落としてクレジットを獲得し、ルーレットやパークでプッシャー台を強化する。ジャックポットを当てれば大量のメダルを獲得できる。',
    'LefTonboは共同制作として参加し、主にゲームプログラミングを担当した。',
  ],
  category: 'vrchat-world',
  status: 'recent-public-record',
  role: 'collaborator',
  period: '2025',
  firstPublishedAt: '2025-04-13',
  heroMedia: {
    kind: 'image',
    url: '/images/works/massive-medal-pusher/hero.webp',
    alt: '大量のメダルが流れる巨大なプッシャー台',
    credit: null,
  },
  media: [],
  featuredOrder: 2,
  links: [
    {
      label: 'VRChatでワールドを開く',
      url: 'https://vrchat.com/home/launch?worldId=wrld_1af53798-92a3-4c3f-99ae-a7c42ec6084d',
      tags: ['primary'],
    },
  ],
  sources: [
    {
      label: 'VRChat: クソでっけぇプッシャーゲーム',
      url: 'https://vrchat.com/home/launch?worldId=wrld_1af53798-92a3-4c3f-99ae-a7c42ec6084d',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'Massive Medal Pusher BOOTHクレジット',
      url: 'https://booth.pm/ja/items/7452403',
      kind: 'third-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'TonboNotion01: 「クソでっけえプッシャーゲーム」とは',
      url: 'https://tonbonotion01.notion.site/32a8538c8ca0804b9e83ec6cd39f58dc',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
