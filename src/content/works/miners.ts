import type { Work } from '../types'

export default {
  id: 'miners',
  slug: 'miners',
  title: 'Miners',
  summary: '最大8人で協力し、2000m先の世界の果てを目指す採掘アクションゲーム。',
  introduction: [
    'ほかのプレイヤーと協力し、鉱石を掘って強くなりながら2000m先にある世界の果てを目指す。',
    '復活、爆弾、ダイヤモンドの3種類のアイテムを使い、深度とともに上がる危険度へ挑む。オンラインでは最大8人で協力できる。',
    '2014年に大学サークルの展示作品として公開され、その後ネット上でオンライン対応して公開した。',
  ],
  category: 'game',
  status: 'published',
  role: 'self-produced',
  period: '2014',
  firstPublishedAt: '2014-11-22',
  gameDetails: {
    genre: '採掘アクション',
    developmentTool: 'DXライブラリ',
  },
  heroMedia: {
    kind: 'image',
    url: '/images/works/miners/hero.webp',
    alt: 'Minersのゲーム画面',
    credit: null,
  },
  media: [
    {
      kind: 'image',
      url: '/images/works/miners/gallery-02.webp',
      alt: 'Minersのスクリーンショット 2',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/miners/gallery-03.webp',
      alt: 'Minersのスクリーンショット 3',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/miners/gallery-04.webp',
      alt: 'Minersのスクリーンショット 4',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/miners/gallery-05.webp',
      alt: 'Minersのスクリーンショット 5',
      credit: null,
    },
  ],
  featuredOrder: null,
  links: [
    {
      label: '作品をダウンロード',
      url: 'https://drive.google.com/file/d/1PPia2NuihGE66XRwI1Z7bBvRVD0F4Kd3/view?usp=drive_link',
      note: 'Windows版のみ',
      tags: ['primary'],
    },
  ],
  sources: [
    {
      label: 'TonboNotion01: Miners',
      url: 'https://tonbonotion01.notion.site/game-miners',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
    {
      label: 'カクレ家ホウモツコ: Miners',
      url: 'https://www.houmotsuko.net/game/miners/index',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
