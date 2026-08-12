import type { Work } from '../types'

export default {
  id: 'heroad',
  slug: 'heroad',
  title: 'HeRoad',
  summary: '7種類の仲間を使い分け、テンポよくボスを攻略する「サクサク爽快RPG」。',
  introduction: [
    'Infiroadのスピンオフとして制作したRPG。魔王討伐の使命を受けた勇者を、全7種類の仲間が支える。',
    '仲間が持つ個性豊かなスキルを使い分け、ボスを攻略しながらテンポよく進む。',
    'WOLF RPGエディターコンテスト第8回で総合14位、熱中度部門8位、遊びやすさ部門3位に入った。',
  ],
  category: 'game',
  status: 'published',
  role: 'self-produced',
  period: '2016',
  firstPublishedAt: '2016-07-24',
  gameDetails: {
    genre: 'RPG',
    developmentTool: 'WOLF RPGエディター',
  },
  heroMedia: {
    kind: 'image',
    url: '/images/works/heroad/hero.webp',
    alt: 'HeRoadのタイトル画面',
    credit: null,
  },
  media: [
    {
      kind: 'image',
      url: '/images/works/heroad/gallery-02.webp',
      alt: 'HeRoadのスクリーンショット 2',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/heroad/gallery-03.webp',
      alt: 'HeRoadのスクリーンショット 3',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/heroad/gallery-04.webp',
      alt: 'HeRoadのスクリーンショット 4',
      credit: null,
    },
  ],
  featuredOrder: null,
  links: [
    {
      label: '作品をダウンロード',
      url: 'https://drive.google.com/file/d/1U5kni4YQB8edsI_WqttULBOgKspCTxTO/view?usp=drive_link',
      note: 'Windows版のみ',
      tags: ['primary'],
    },
    {
      label: 'WOLF RPGエディターコンテスト 第8回 結果',
      url: 'https://silversecond.com/WolfRPGEditor/Contest/result08.shtml',
      tags: ['related'],
    },
  ],
  sources: [
    {
      label: 'TonboNotion01: HeRoad',
      url: 'https://tonbonotion01.notion.site/game-heroad',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
    {
      label: 'カクレ家ホウモツコ: HeRoad',
      url: 'https://www.houmotsuko.net/game/heroad/index',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
