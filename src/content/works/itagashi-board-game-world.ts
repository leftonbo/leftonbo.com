import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'itagashi-board-game-world',
  slug: 'itagashi-board-game-world',
  title: '『いた菓子』ボードゲームワールド',
  summary: 'お題に合うお菓子カードを出し合うボードゲームを遊べる、共同制作のVRChatワールド。',
  introduction: [
    '「TDMボドゲ同好会」と共同制作した、ボードゲーム「いただき！お菓子パーティー」を遊べるVRChatワールド。お題に沿ってカードを出し、食べると危険なお菓子も紛れ込むなかで、集めたお菓子の数を競う。',
    '手札の読み合いをみんなで楽しめるパーティーゲームと、広いコテージやパーティー会場を模したくつろげる空間を組み合わせた。',
    'LefTonboは主にワールドギミックとワールドモデリングを担当した。',
  ],
  category: 'vrchat-world',
  status: 'recent-evidence',
  role: 'collaborator',
  period: '2025',
  firstPublishedAt: '2025-12-26',
  media: [
    {
      kind: 'image',
      url: '/images/works/itagashi-board-game-world/hero.webp',
      alt: '『いた菓子』ボードゲームワールドのサムネイル',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/itagashi-board-game-world/gallery-02.webp',
      alt: 'コテージ内に設けた『いた菓子』のボードゲーム会場',
      caption: '広いコテージ内に設けたボードゲーム会場',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/itagashi-board-game-world/gallery-03.webp',
      alt: 'スクリーンやお菓子を備えたパーティー会場',
      caption: 'パーティー会場を模した室内のようす',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/itagashi-board-game-world/gallery-04.webp',
      alt: 'ワールド内のお菓子を食べるキャラクター',
      caption: 'ワールド内のお菓子を食べることもできる',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://vrchat.com/home/launch?worldId=wrld_3439fc9a-5067-4109-809e-62f43f75cfbe',
  sources: [
    {
      label: 'VRChat: 『いた菓子』',
      url: 'https://vrchat.com/home/launch?worldId=wrld_3439fc9a-5067-4109-809e-62f43f75cfbe',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'LefTonboによる公開告知',
      url: 'https://x.com/LefTonbo/status/2004520350537945447',
      kind: 'first-party-public',
      role: 'event-post',
      verifiedAt: '2026-08-07',
    },
  ],
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
