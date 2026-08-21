import { siteProfile } from '../content/site'
import type { Work } from '../content/types'
import { matchRoute } from './routes'

const SITE_ORIGIN = 'https://leftonbo.com'

export interface SocialImage {
  readonly url: string
  readonly alt: string
  readonly mimeType: `image/${string}`
  readonly width?: number
  readonly height?: number
}

export interface PageMetadata {
  readonly title: string
  readonly description: string
  readonly canonical: string
  readonly ogType: 'website' | 'article'
  readonly socialImage: SocialImage
  readonly publishedTime?: string
  readonly noindex?: boolean
}

export const defaultSocialImage: SocialImage = {
  url: `${SITE_ORIGIN}/images/og/default.png`,
  alt: 'LefTonbo（レフとんぼ）— 放浪するゲームクリエイター',
  mimeType: 'image/png',
  width: 1200,
  height: 630,
}

export function createPageMetadata(pathname: string, works: readonly Work[]): PageMetadata {
  const match = matchRoute(pathname, works)

  if (match.kind === 'work-detail') {
    return {
      title: `${match.work.title}｜${siteProfile.name}`,
      description: match.work.summary,
      canonical: canonicalUrl(`/works/${match.work.slug}/`),
      ogType: 'article',
      socialImage: match.work.heroMedia
        ? {
            url: canonicalUrl(match.work.heroMedia.url),
            alt: match.work.heroMedia.alt,
            mimeType: 'image/webp',
          }
        : defaultSocialImage,
      ...(match.work.firstPublishedAt ? { publishedTime: match.work.firstPublishedAt } : {}),
    }
  }

  if (match.kind === 'works') {
    return {
      title: `制作一覧｜${siteProfile.name}`,
      description: `${siteProfile.name}が制作・参加したVRChatワールド、ゲーム、3Dモデル、Vket出展の一覧です。`,
      canonical: canonicalUrl('/works/'),
      ogType: 'website',
      socialImage: defaultSocialImage,
    }
  }

  if (match.kind === 'profile') {
    return {
      title: `プロフィール｜${siteProfile.name}（${siteProfile.reading}）`,
      description: `放浪するゲームクリエイター${siteProfile.name}のプロフィール、活動歴、制作環境、公式リンク。`,
      canonical: canonicalUrl('/profile/'),
      ogType: 'website',
      socialImage: defaultSocialImage,
    }
  }

  if (match.kind === 'not-found') {
    return {
      title: `ページが見つかりません｜${siteProfile.name}`,
      description: '指定されたページは見つかりませんでした。ホームまたは制作一覧から移動できます。',
      canonical: canonicalUrl('/404.html'),
      ogType: 'website',
      socialImage: defaultSocialImage,
      noindex: true,
    }
  }

  return {
    title: `${siteProfile.name}（${siteProfile.reading}）｜${siteProfile.tagline}`,
    description: `ゲームづくりを中心に、VRChatワールド、3Dモデル、Webなど、${siteProfile.name}の活動をまとめています。`,
    canonical: canonicalUrl('/'),
    ogType: 'website',
    socialImage: defaultSocialImage,
  }
}

function canonicalUrl(pathname: string): string {
  return new URL(pathname, SITE_ORIGIN).href
}
