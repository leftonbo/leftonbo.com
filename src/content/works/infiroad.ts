import type { Work } from '../types'

export default {
  id: 'infiroad',
  slug: 'infiroad',
  title: 'Infiroad',
  summary: '勇者と仲間を強化しながら無限回廊を進む、Unity製のクリッカーゲーム。',
  introduction: [
    '魔物に支配された世界を取り戻すため、勇者が分身を召喚する魔道書と一本の白剣を手に無限回廊を進む。',
    '勇者を召喚して戦い、最大20種類の仲間を雇って自動的に出現させられる。仲間ごとの能力に加え、レリックとミスリルによる強化要素を備える。',
  ],
  category: 'game',
  status: 'stopped-with-public-record',
  role: 'self-produced',
  period: '2015',
  firstPublishedAt: '2015-12-09',
  gameDetails: {
    genre: 'クリッカー',
    developmentTool: 'Unity 5.x',
  },
  media: [
    {
      kind: 'image',
      url: '/images/works/infiroad/hero.webp',
      alt: 'Infiroadのゲーム画面',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/infiroad/gallery-02.webp',
      alt: 'Infiroadのスクリーンショット 2',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/infiroad/gallery-03.webp',
      alt: 'Infiroadのスクリーンショット 3',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/infiroad/gallery-04.webp',
      alt: 'Infiroadのスクリーンショット 4',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://drive.google.com/file/d/1PiEavuddwcomdSPQ8TrLLdRsPj60afHS/view?usp=drive_link',
  primaryActionNote: 'Windows版のみ',
  additionalLinks: [
    {
      label: 'ブラウザ版をプレイ',
      url: 'https://unityroom.com/games/infiroad',
      placement: 'action',
    },
  ],
  sources: [
    {
      label: 'TonboNotion01: Infiroad',
      url: 'https://tonbonotion01.notion.site/game-infiroad',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
    {
      label: 'カクレ家ホウモツコ: Infiroad',
      url: 'https://www.houmotsuko.net/game/infiroad/index',
      kind: 'first-party-public',
      verifiedAt: '2026-07-26',
    },
  ],
  verifiedAt: '2026-08-07',
  factsPending: [],
} satisfies Work
