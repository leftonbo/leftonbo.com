import { CONTENT_VERIFIED_AT } from './types'
import type { ActivityArea, ExternalLink, SiteProfile } from './types'

export const siteProfile = {
  name: 'LefTonbo',
  reading: 'レフとんぼ',
  handle: 'leftonbo',
  tagline: '放浪するゲームクリエイター',
  summary: 'ゲーム制作を中心にこれまでの活動をまとめています',
  introduction: [
    '2004年ごろにゲーム制作に振れる。現在はUnityを中心に、ゲームやVRChatワールドなど、さまざまな場所でゲーム制作に関わっている。',
  ],
  craft:
    'ゲーム制作では操作の手触りと、動かしたときの爽快感を大切にしている。細かなところまで気を配るほうだけど、実装に集中しているときはあまり気にしていないかも。',
  history: [
    {
      period: '2004年ごろ',
      title: 'ゲーム制作を始める',
      description:
        'Tonyu Systemを使ってゲーム制作を開始。最初にリリースした作品は「スーパーブロック崩し」。',
    },
    {
      period: '2015年ごろ',
      title: 'Unityでの制作へ',
      description: 'Unityに触れ、本格的にUnityでのゲーム制作を始める。',
    },
    {
      period: '2019年',
      title: 'VRChatに触れる',
      description: 'VRヘッドセットの入手をきっかけに、VRChatに触れるようになる。',
    },
    {
      period: '2020年',
      title: 'VRChatワールド制作を始める',
      description: 'Udonの登場をきっかけに、VRChat向けのワールド制作を始める。',
    },
    {
      period: '現在',
      title: '場所を越えてゲーム制作に関わる',
      description: 'さまざまな場所で、ゲーム制作に関わる活動を続けている。',
    },
  ],
  tools: [
    { label: 'ゲームエンジン', items: ['Unity'] },
    { label: 'コーディング、エディタ', items: ['VS Code'] },
    { label: 'AIツール', items: ['Codex'] },
    { label: 'イラスト', items: ['Clip Studio Paint'] },
    { label: '3Dモデリング', items: ['Blender'] },
  ],
  updatedAt: '2026-08-23',
  sources: [
    {
      label: 'GitHub',
      url: 'https://github.com/leftonbo',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'VRChatプロフィール',
      url: 'https://vrchat.com/home/user/usr_e9ccde4f-c5a4-47f6-8cfb-1105679750ce',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'BOOTH / TonboWorkshop',
      url: 'https://tonboshop.booth.pm/',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
  ],
  verifiedAt: CONTENT_VERIFIED_AT,
  factsPending: [],
} satisfies SiteProfile

export const externalLinks = [
  {
    id: 'tonbo-notion',
    label: 'TonboNotion01',
    url: 'https://tonbonotion01.notion.site/',
    category: 'hub',
    status: 'recent-evidence',
    verifiedAt: CONTENT_VERIFIED_AT,
  },
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/leftonbo',
    category: 'code',
    status: 'recent-evidence',
    verifiedAt: CONTENT_VERIFIED_AT,
  },
  {
    id: 'x',
    label: 'X',
    url: 'https://x.com/LefTonbo',
    category: 'social',
    status: 'recent-evidence',
    verifiedAt: CONTENT_VERIFIED_AT,
  },
  {
    id: 'booth',
    label: 'BOOTH / TonboWorkshop',
    url: 'https://tonboshop.booth.pm/',
    category: 'shop',
    status: 'recent-evidence',
    verifiedAt: CONTENT_VERIFIED_AT,
  },
  {
    id: 'vrchat',
    label: 'VRChat',
    url: 'https://vrchat.com/home/user/usr_e9ccde4f-c5a4-47f6-8cfb-1105679750ce',
    category: 'vrchat',
    status: 'recent-evidence',
    verifiedAt: CONTENT_VERIFIED_AT,
  },
  {
    id: 'bluesky',
    label: 'Bluesky',
    url: 'https://bsky.app/profile/leftonbo.bsky.social',
    category: 'social',
    status: 'availability-unverified',
    verifiedAt: CONTENT_VERIFIED_AT,
  },
  {
    id: 'pixiv',
    label: 'pixiv',
    url: 'https://www.pixiv.net/users/3178558',
    category: 'portfolio',
    status: 'availability-unverified',
    verifiedAt: CONTENT_VERIFIED_AT,
  },
  {
    id: 'marshmallow',
    label: 'マシュマロ',
    url: 'https://marshmallow-qa.com/mb21o2dqniat4xf',
    category: 'contact',
    status: 'availability-unverified',
    verifiedAt: CONTENT_VERIFIED_AT,
  },
  {
    id: 'ofuse',
    label: 'OFUSE',
    url: 'https://ofuse.me/leftonbo',
    category: 'support',
    status: 'availability-unverified',
    verifiedAt: CONTENT_VERIFIED_AT,
  },
  {
    id: 'discord',
    label: 'TonboWorkshopコミュニティ',
    url: 'https://discord.gg/2NawD4G',
    category: 'community',
    status: 'availability-unverified',
    verifiedAt: CONTENT_VERIFIED_AT,
  },
] satisfies readonly ExternalLink[]

export const activityAreas = [
  {
    id: 'vrchat-worlds',
    label: 'VRChatワールド制作',
    description: '自作・委託・共同制作ワールド',
    url: 'https://vrchat.com/home/user/usr_e9ccde4f-c5a4-47f6-8cfb-1105679750ce',
    sources: [
      {
        label: 'VRChatプロフィール',
        url: 'https://vrchat.com/home/user/usr_e9ccde4f-c5a4-47f6-8cfb-1105679750ce',
        kind: 'first-party-public',
        verifiedAt: CONTENT_VERIFIED_AT,
      },
    ],
    verifiedAt: CONTENT_VERIFIED_AT,
    factsPending: [],
  },
  {
    id: 'avatar-3d',
    label: 'アバター・3Dモデル制作',
    description: 'VRChat向けアバター・3Dモデルの制作',
    url: 'https://tonboshop.booth.pm/',
    sources: [
      {
        label: 'BOOTH / TonboWorkshop',
        url: 'https://tonboshop.booth.pm/',
        kind: 'first-party-public',
        verifiedAt: CONTENT_VERIFIED_AT,
      },
    ],
    verifiedAt: CONTENT_VERIFIED_AT,
    factsPending: [],
  },
  {
    id: 'games',
    label: 'ゲーム制作',
    description: 'ブラウザゲーム、PCゲームの制作',
    url: 'https://tonbonotion01.notion.site/',
    sources: [
      {
        label: 'TonboNotion01',
        url: 'https://tonbonotion01.notion.site/',
        kind: 'first-party-public',
        verifiedAt: CONTENT_VERIFIED_AT,
      },
      {
        label: 'カクレ家ホウモツコ: ゲーム一覧',
        url: 'https://www.houmotsuko.net/game/index',
        kind: 'first-party-public',
        verifiedAt: '2026-07-26',
      },
    ],
    verifiedAt: CONTENT_VERIFIED_AT,
    factsPending: [],
  },
  {
    id: 'web',
    label: 'Web制作',
    description: 'Webサイトとブラウザ向けコンテンツの制作',
    url: 'https://github.com/leftonbo',
    sources: [
      {
        label: 'GitHub',
        url: 'https://github.com/leftonbo',
        kind: 'first-party-public',
        verifiedAt: CONTENT_VERIFIED_AT,
      },
    ],
    verifiedAt: CONTENT_VERIFIED_AT,
    factsPending: [],
  },
  {
    id: 'original-characters',
    label: 'オリジナルキャラクター創作',
    description: '現行の創作資料はNotionの公開ページで案内しています',
    url: 'https://tonbonotion01.notion.site/tonbo-creations',
    sources: [
      {
        label: 'トンボのオリキャラ創作置き場',
        url: 'https://tonbonotion01.notion.site/tonbo-creations',
        kind: 'first-party-public',
        verifiedAt: CONTENT_VERIFIED_AT,
      },
    ],
    verifiedAt: CONTENT_VERIFIED_AT,
    factsPending: [],
  },
] satisfies readonly ActivityArea[]
