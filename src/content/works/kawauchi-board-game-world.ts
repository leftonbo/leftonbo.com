import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'kawauchi-board-game-world',
  slug: 'kawauchi-board-game-world',
  title: '『かわうち』ボードゲームワールド',
  summary: 'かわいい生き物と資源を集めて家づくりを競う、共同制作のVRChatボードゲームワールド。',
  introduction: [
    '「TDMボドゲ同好会」と共同制作した、ボードゲーム「かわいい子たちとお家を建てるゲーム」を遊べるVRChatワールド。島で出会ったかわいい生き物たちと資源を集め、誰よりも早く立派な家の完成を目指す。',
    '自然に囲まれた島には街や洞窟、遺跡があり、ゲームの外でも探索を楽しめる。2024年8月31日には拡張版「かわうちプラス」の追加に合わせてワールド全体を一新した。',
    'LefTonboは主にワールドギミックとワールドモデリングを担当し、1周年記念では特別キャラクターカードのイラストも制作した。',
  ],
  category: 'vrchat-world',
  status: 'recent-evidence',
  role: 'collaborator',
  period: '2024',
  firstPublishedAt: '2024-01-05',
  media: [
    {
      kind: 'image',
      url: '/images/works/kawauchi-board-game-world/hero.webp',
      alt: '『かわうち』ボードゲームワールドのサムネイル',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/kawauchi-board-game-world/gallery-02.webp',
      alt: 'リメイク前の『かわうち』の島',
      caption: 'リメイク前の島のようす',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/kawauchi-board-game-world/gallery-03.webp',
      alt: 'リメイク後の『かわうち』のボードゲーム会場',
      caption: '「かわうちプラス」の追加に合わせて一新した島とゲーム会場',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://vrchat.com/home/launch?worldId=wrld_66c742e9-ff23-460b-b71f-84549fe4b6f5',
  sources: [
    {
      label: 'VRChat: 『かわうち』',
      url: 'https://vrchat.com/home/launch?worldId=wrld_66c742e9-ff23-460b-b71f-84549fe4b6f5',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'PlanetVRC: 『かわうち』',
      url: 'https://planetvrchat.net/archives/15261',
      kind: 'third-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
  ],
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
