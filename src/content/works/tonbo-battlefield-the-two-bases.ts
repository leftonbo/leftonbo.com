import { CONTENT_VERIFIED_AT } from '../types'
import type { Work } from '../types'

export default {
  id: 'tonbo-battlefield-the-two-bases',
  slug: 'tonbo-battlefield-the-two-bases',
  title: 'TonboBattlefield 2: The Two Bases',
  summary: '20種類の武器と複数のゲームモードを備えた、FPS風のVRChat対戦ワールド。',
  introduction: [
    '前作を発展させたFPS風の対戦ワールド。20種類の武器に加え、両手持ち武器を使って戦える。',
    '複数のゲームモード、初心者向けの説明スクリーン、優勝者の表彰式を備える。',
  ],
  category: 'vrchat-world',
  status: 'published',
  role: 'self-produced',
  period: '2021',
  firstPublishedAt: '2021-10-08',
  media: [
    {
      kind: 'image',
      url: '/images/works/tonbo-battlefield-the-two-bases/hero.webp',
      alt: 'TonboBattlefield 2のメインサムネイル',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/tonbo-battlefield-the-two-bases/gallery-02.webp',
      alt: 'TonboBattlefield 2の紹介ポスター',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/tonbo-battlefield-the-two-bases/gallery-03.webp',
      alt: 'TonboBattlefield 2の過去サムネイル',
      credit: null,
    },
    {
      kind: 'image',
      url: '/images/works/tonbo-battlefield-the-two-bases/gallery-04.webp',
      alt: 'TonboBattlefield 2の初期サムネイル',
      credit: null,
    },
  ],
  featured: false,
  url: 'https://vrchat.com/home/launch?worldId=wrld_0a8afad0-0cf0-4b7a-a420-c1fc262c585a',
  sources: [
    {
      label: 'VRChat: TonboBattlefield 2',
      url: 'https://vrchat.com/home/launch?worldId=wrld_0a8afad0-0cf0-4b7a-a420-c1fc262c585a',
      kind: 'first-party-public',
      verifiedAt: CONTENT_VERIFIED_AT,
    },
    {
      label: 'TonboNotion01: TonboBattlefield 2',
      url: 'https://tonbonotion01.notion.site/ea28782c6f7c491785153d657ee74291',
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
