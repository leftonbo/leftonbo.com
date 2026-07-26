import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'kuso-dekke-pusher-game',
  slug: 'kuso-dekke-pusher-game',
  title: 'クソでっけぇプッシャーゲーム',
  description:
    'りくち制作のVRChatゲームワールド。メダルを落としてクレジットを獲得し、ルーレットやパークでプッシャー台を強化していく。LefTonboはProgramming Supportとして参加。',
  category: 'vrchat-world',
  status: 'recent-public-record',
  role: 'programming-support',
  period: null,
  firstPublishedAt: null,
  media: [],
  featured: false,
  url: 'https://vrchat.com/home/launch?worldId=wrld_1af53798-92a3-4c3f-99ae-a7c42ec6084d',
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
  verifiedAt: '2026-07-26',
  factsPending: [
    {
      field: 'current-status',
      note: '現在の公開状態をサイト公開前に確認する。',
    },
    {
      field: 'first-published-at',
      note: '初公開日は未確認。',
    },
    {
      field: 'last-updated-at',
      note: '最終更新日は未確認。',
    },
    {
      field: 'media',
      note: '再掲載可能な原本画像を確認する。',
    },
  ],
} satisfies Work
