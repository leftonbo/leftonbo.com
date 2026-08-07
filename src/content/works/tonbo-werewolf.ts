import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'tonbo-werewolf',
  slug: 'tonbo-werewolf',
  title: 'トンボ人狼（TonboWerewolf）',
  summary: 'VRChatで人狼ゲームを遊べるよう、Udonで実装したゲームワールド。',
  introduction: [
    'Udonで実装した、人狼ゲームを遊べるVRChatワールド。',
    'VRChatでも「猫猫村」のような遊びを楽しみたいという思いから制作した。',
  ],
  category: 'vrchat-world',
  status: 'published',
  role: 'self-produced',
  period: '2020',
  firstPublishedAt: '2020-09-24',
  media: [
    {
      kind: 'image',
      url: '/images/works/tonbo-werewolf/hero.webp',
      alt: 'トンボ人狼の村を見渡したスクリーンショット',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/tonbo-werewolf/gallery-02.webp',
      alt: 'トンボ人狼の室内とプレイヤー用設備',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://vrchat.com/home/launch?worldId=wrld_07ee4e44-940f-4405-a398-e969114a0164',
  sources: [
    {
      label: 'VRChat: TonboWerewolf',
      url: 'https://vrchat.com/home/launch?worldId=wrld_07ee4e44-940f-4405-a398-e969114a0164',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'TonboNotion01: TonboWerewolf - トンボ人狼',
      url: 'https://tonbonotion01.notion.site/cda0673f8bc2448c954f405524551164',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-07-26',
  factsPending: [
    {
      field: 'last-updated-at',
      note: 'ワールドの最終更新日は未確認。',
    },
  ],
} satisfies Work
