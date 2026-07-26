import { renderToString } from 'react-dom/server'
import { App } from './app/App'
import { getStaticRoutePaths, matchRoute, normalizePathname } from './app/routes'
import { assertValidContent } from './content/validate'
import { activityAreas, siteProfile } from './content/site'
import { works } from './content/works'
import {
  canonicalUrl,
  creativeWorkJsonLd,
  getMachineReadableFiles,
  personJsonLd,
  profilePageJsonLd,
  worksCollectionJsonLd,
} from './machine-readable'

interface PageHead {
  readonly title: string
  readonly description: string
  readonly canonical: string
  readonly ogType: 'website' | 'article'
}

interface RenderedPage {
  readonly html: string
  readonly head: PageHead
  readonly jsonLd: object | readonly object[]
}

assertValidContent()

export function getStaticRoutes(): readonly string[] {
  return getStaticRoutePaths(works)
}

export function renderPage(route: string): RenderedPage {
  const pathname = normalizePathname(route)
  const match = matchRoute(pathname, works)
  const html = renderToString(<App pathname={pathname} />)

  if (match.kind === 'work-detail') {
    return {
      html,
      head: {
        title: `${match.work.title} | ${siteProfile.name}`,
        description: match.work.description,
        canonical: canonicalUrl(`/works/${match.work.slug}/`),
        ogType: 'article',
      },
      jsonLd: creativeWorkJsonLd(match.work),
    }
  }

  if (match.kind === 'works') {
    return {
      html,
      head: {
        title: `制作 | ${siteProfile.name}`,
        description: 'VRChatワールド、アバター／3D、ゲーム制作を紹介します。',
        canonical: canonicalUrl('/works/'),
        ogType: 'website',
      },
      jsonLd: worksCollectionJsonLd(),
    }
  }

  if (match.kind === 'profile') {
    return {
      html,
      head: {
        title: `プロフィール | ${siteProfile.name}`,
        description: `${siteProfile.name}（${siteProfile.reading}）の名義と活動領域。`,
        canonical: canonicalUrl('/profile/'),
        ogType: 'website',
      },
      jsonLd: [personJsonLd(), profilePageJsonLd()],
    }
  }

  if (match.kind === 'links') {
    return {
      html,
      head: {
        title: `公式リンク | ${siteProfile.name}`,
        description: `${siteProfile.name}のプロフィール、作品、配布・販売、ソースコード、コミュニティ、メッセージ窓口。`,
        canonical: canonicalUrl('/links/'),
        ogType: 'website',
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        url: canonicalUrl('/links/'),
        name: `${siteProfile.name}の公式リンク`,
        dateModified: siteProfile.updatedAt,
        inLanguage: 'ja',
        about: { '@id': 'https://leftonbo.com/#person' },
      },
    }
  }

  if (match.kind === 'not-found') {
    return {
      html,
      head: {
        title: `ページが見つかりません | ${siteProfile.name}`,
        description: '指定されたページは見つかりませんでした。ホームまたは制作一覧から移動できます。',
        canonical: canonicalUrl('/404.html'),
        ogType: 'website',
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        url: canonicalUrl('/404.html'),
        name: 'ページが見つかりません',
        inLanguage: 'ja',
      },
    }
  }

  return {
    html,
    head: {
      title: `${siteProfile.name}（${siteProfile.reading}）公式ポータル`,
      description: `${siteProfile.name}のVRChatワールド、アバター／3D、ゲーム、Web、オリジナルキャラクター創作への入口です。`,
      canonical: canonicalUrl('/'),
      ogType: 'website',
    },
    jsonLd: [
      personJsonLd(),
      profilePageJsonLd(),
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: canonicalUrl('/'),
        name: siteProfile.name,
        alternateName: siteProfile.reading,
        inLanguage: 'ja',
        dateModified: siteProfile.updatedAt,
        about: { '@id': 'https://leftonbo.com/#person' },
        hasPart: activityAreas.map((area) => ({ '@type': 'Thing', name: area.label })),
      },
    ],
  }
}

export { getMachineReadableFiles }
