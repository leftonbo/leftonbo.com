import type { ExternalLinkCategory, Work, WorkCategory, WorkRole } from '../content/types'

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
  'self-produced': '自主制作',
  'model-creator': 'モデル制作',
  collaborator: '委託・共同制作',
  'programming-support': 'Programming Support',
  'pending-confirmation': '担当範囲を確認中',
  exhibitor: 'イベント出展',
}

export function getWorkActionLabel(work: Work): string {
  if (work.primaryActionLabel) return work.primaryActionLabel

  switch (work.category) {
    case 'vrchat-world':
      return 'VRChatでワールドを開く'
    case 'avatar-3d':
      return 'ショップで見る'
    case 'game':
      return work.status === 'archived' ? '作品記録を見る' : '配布・プレイ先を見る'
    case 'vket':
      if (work.url.startsWith('https://x.com/')) return '出展時のX投稿を見る'
      if (work.url.includes('/exhibitor/')) return 'Vket出展者ページを見る'
      return 'Vket公式サイトを見る'
  }
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
  'biter-spectre',
  'infiroad',
] as const
