import type { HomeContent } from './types'

export const homeContent = {
  introduction: [
    'ゲームづくりを中心に、活動をまとめています。',
    'VRChatワールド、3Dモデル、Webなど。',
  ],
  activities: [
    {
      kind: 'works',
      areaId: 'vrchat-worlds',
      label: 'VRChatワールド',
      category: 'vrchat-world',
      workSlugs: [
        'tonbo-battlefield-the-two-bases',
        'massive-medal-pusher',
        'kawauchi-board-game-world',
      ],
    },
    {
      kind: 'works',
      areaId: 'games',
      label: 'ゲーム',
      category: 'game',
      workSlugs: ['infiroad', 'heroad', 'light-trail'],
    },
    {
      kind: 'works',
      areaId: 'avatar-3d',
      label: '3Dモデル',
      category: 'avatar-3d',
      workSlugs: ['biter-spectre', 'sajak-sahagin'],
    },
    {
      kind: 'external',
      areaId: 'web',
      label: 'Web',
      destinationLabel: 'GitHubへ',
      image: '/images/activity/web-github.webp',
    },
    {
      kind: 'external',
      areaId: 'original-characters',
      label: 'オリジナルキャラクター',
      destinationLabel: 'Notionへ',
      image: '/images/activity/original-characters-notion.webp',
    },
  ],
  primaryLinks: [
    { linkId: 'tonbo-notion', label: 'Notion' },
    { linkId: 'vrchat', label: 'VRChat' },
    { linkId: 'booth', label: 'BOOTH' },
    { linkId: 'github', label: 'GitHub' },
  ],
} satisfies HomeContent
