import type { ExternalLinkCategory, WorkCategory, WorkRole } from '../content/types'

export const categoryLabels: Record<WorkCategory, string> = {
  'vrchat-world': 'VRChatワールド',
  'avatar-3d': 'アバター／3D',
  game: 'ゲーム制作',
  vket: 'Vket出展',
}

export const categoryShortLabels: Record<WorkCategory, string> = {
  'vrchat-world': 'World',
  'avatar-3d': 'Avatar / 3D',
  game: 'Game',
  vket: 'Vket',
}

export const roleLabels: Record<WorkRole, string> = {
  'self-produced': '自作',
  'model-creator': 'モデル制作',
  collaborator: '委託・共同制作',
  'programming-support': 'Programming Support',
  'pending-confirmation': '担当範囲を確認中',
  exhibitor: '出展',
}

export const linkCategoryLabels: Record<ExternalLinkCategory, string> = {
  hub: '情報ハブ',
  code: 'ソースコード',
  social: 'SNS',
  shop: '配布・販売',
  vrchat: 'VRChat',
  portfolio: '作品・創作',
  contact: 'メッセージ',
  support: '支援・メッセージ',
  community: 'コミュニティ',
}

export const workCategoryOrder: readonly WorkCategory[] = [
  'vrchat-world',
  'avatar-3d',
  'game',
  'vket',
]

export const editorialEntranceWorkIds = [
  'tonbo-battlefield-the-two-bases',
  'massive-medal-pusher',
  'gabugabu-specter',
  'infiroad',
] as const
