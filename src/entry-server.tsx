import { renderToString } from 'react-dom/server'
import { App } from './app/App'
import { createPageMetadata, type PageMetadata } from './app/metadata'
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

interface RenderedPage {
  readonly html: string
  readonly head: PageMetadata
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
  const head = createPageMetadata(pathname, works)

  if (match.kind === 'work-detail') {
    return {
      html,
      head,
      jsonLd: creativeWorkJsonLd(match.work),
    }
  }

  if (match.kind === 'works') {
    return {
      html,
      head,
      jsonLd: worksCollectionJsonLd(),
    }
  }

  if (match.kind === 'profile') {
    return {
      html,
      head,
      jsonLd: [personJsonLd(), profilePageJsonLd()],
    }
  }

  if (match.kind === 'not-found') {
    return {
      html,
      head,
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
    head,
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
