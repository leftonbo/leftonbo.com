import type { Work } from '../content/types'

export type RouteMatch =
  | { readonly kind: 'home' }
  | { readonly kind: 'works' }
  | { readonly kind: 'work-detail'; readonly work: Work }
  | { readonly kind: 'profile' }
  | { readonly kind: 'not-found' }

export function normalizePathname(pathname: string): string {
  const pathWithoutQuery = pathname.split(/[?#]/, 1)[0] ?? '/'

  if (pathWithoutQuery === '') {
    return '/'
  }

  if (pathWithoutQuery === '/404.html') {
    return pathWithoutQuery
  }

  const withLeadingSlash = pathWithoutQuery.startsWith('/')
    ? pathWithoutQuery
    : `/${pathWithoutQuery}`
  const withoutIndexFile = withLeadingSlash.replace(/\/index\.html$/, '/')
  return withoutIndexFile.endsWith('/') ? withoutIndexFile : `${withoutIndexFile}/`
}

export function matchRoute(pathname: string, works: readonly Work[]): RouteMatch {
  const normalizedPath = normalizePathname(pathname)

  if (normalizedPath === '/') {
    return { kind: 'home' }
  }

  if (normalizedPath === '/works/') {
    return { kind: 'works' }
  }

  if (normalizedPath === '/profile/') {
    return { kind: 'profile' }
  }

  const detailMatch = /^\/works\/([^/]+)\/$/.exec(normalizedPath)
  const slug = detailMatch?.[1]

  if (slug) {
    const work = works.find((item) => item.slug === slug)
    if (work) {
      return { kind: 'work-detail', work }
    }
  }

  return { kind: 'not-found' }
}

export function getStaticRoutePaths(works: readonly Work[]): readonly string[] {
  return ['/', '/works/', ...works.map((work) => `/works/${work.slug}/`), '/profile/', '/404.html']
}
