import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'ita-gashi-board-game-world',
  slug: 'ita-gashi-board-game-world',
  title: '『いた菓子』ボードゲームワールド',
  description: '委託・共同制作のボードゲームワールド。',
  category: 'vrchat-world',
  status: 'unverified',
  role: 'pending-confirmation',
  period: null,
  firstPublishedAt: null,
  media: [],
  featured: false,
  url: 'https://vrchat.com/home/launch?worldId=wrld_3439fc9a-5067-4109-809e-62f43f75cfbe',
  sources: [
    {
      label: 'VRChat: 『いた菓子』',
      url: 'https://vrchat.com/home/launch?worldId=wrld_3439fc9a-5067-4109-809e-62f43f75cfbe',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
  ],
  verifiedAt: CONTENT_VERIFIED_AT,
  factsPending: [
    {
      field: 'role',
      note: '共同制作での具体的な担当範囲は未確認。',
    },
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
