import type { Work } from '../types'

export default {
  id: 'light-trail',
  slug: 'light-trail',
  title: 'Light Trail',
  summary: '停滞要素を抑え、テンポよく遊べる「ライトな救世RPG」。',
  introduction: [
    'ゲームクリエイターズキャンプの企画制作作品。闇に包まれた世界で、光の勇者ルスタが各地に残る光を取り戻す旅に出る。',
    '仲間や特別な能力を使い、苦行や詰み、リソース管理による停滞を抑えて進む。世界のフレーバーや収集アイテムも用意した。',
  ],
  category: 'game',
  status: 'published',
  role: 'self-produced',
  period: '2018',
  firstPublishedAt: '2018-04-29',
  gameDetails: {
    genre: 'RPG',
    developmentTool: 'RPGツクールMV',
  },
  heroMedia: {
    kind: 'image',
    url: '/images/works/light-trail/hero.webp',
    alt: 'Light Trailのゲーム画面',
    credit: null,
  },
  media: [
    {
      kind: 'image',
      url: '/images/works/light-trail/gallery-02.webp',
      alt: 'Light Trailのスクリーンショット 2',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/light-trail/gallery-03.webp',
      alt: 'Light Trailのスクリーンショット 3',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/light-trail/gallery-04.webp',
      alt: 'Light Trailのスクリーンショット 4',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/light-trail/gallery-05.webp',
      alt: 'Light Trailのスクリーンショット 5',
      credit: null,
    },
  ],
  featuredOrder: null,
  links: [
    {
      label: '作品をダウンロード',
      url: 'https://drive.google.com/file/d/1HMw8Zo1vm36MpH8ocF6sZPFk4g7fcdkk/view?usp=drive_link',
      note: 'Windows版のみ',
      tags: ['primary'],
    },
  ],
  sources: [
    {
      label: 'TonboNotion01: Light Trail',
      url: 'https://tonbonotion01.notion.site/game-lighttrail',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
    {
      label: 'カクレ家ホウモツコ: Light Trail',
      url: 'https://www.houmotsuko.net/game/lighttrail/index',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
