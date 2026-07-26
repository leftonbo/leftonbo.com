import type { ExternalLinkCategory, WorkCategory, WorkRole } from '../content/types'

export const categoryLabels: Record<WorkCategory, string> = {
  'vrchat-world': 'VRChatワールド',
  'avatar-3d': 'アバター／3D',
  'past-game': '過去のゲーム制作',
}

export const categoryShortLabels: Record<WorkCategory, string> = {
  'vrchat-world': 'World',
  'avatar-3d': 'Avatar / 3D',
  'past-game': 'Game',
}

export const roleLabels: Record<WorkRole, string> = {
  'self-produced': '自作',
  'model-creator': 'モデル制作',
  collaborator: '委託・共同制作',
  'programming-support': 'Programming Support',
  'pending-confirmation': '担当範囲を確認中',
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

export const workCategoryOrder: readonly WorkCategory[] = ['vrchat-world', 'avatar-3d', 'past-game']

export const editorialEntranceWorkIds = [
  'tonbo-werewolf',
  'tonbo-battlefield-shadow-valley',
  'sajak-sahagin-v3',
  'light-trail',
] as const
