import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/noto-sans-jp/wght.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { App } from './app/App'
import { createPageMetadata, type PageMetadata } from './app/metadata'
import { matchRoute, normalizePathname } from './app/routes'
import { works } from './content/works'
import './styles/tokens.css'
import './styles/global.css'
import './styles/components.css'
import './styles/pages.css'

const root = document.querySelector('#root')

if (!(root instanceof HTMLElement)) {
  throw new Error('React root element was not found.')
}

const currentPath = normalizePathname(window.location.pathname)
const prerenderedPath = root.dataset.prerenderedRoute
  ? normalizePathname(root.dataset.prerenderedRoute)
  : undefined
const canHydrate = root.firstElementChild !== null && prerenderedPath === currentPath
const routeMatch = matchRoute(currentPath, works)

syncPageMetadata(createPageMetadata(currentPath, works))

if (routeMatch.kind === 'not-found') {
  syncNotFoundJsonLd()
}

const app = (
  <StrictMode>
    <App pathname={window.location.pathname} />
  </StrictMode>
)

if (canHydrate) {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  createRoot(root).render(app)
}

function syncPageMetadata(metadata: PageMetadata) {
  document.title = metadata.title
  upsertMeta('name', 'description', metadata.description)
  upsertMeta('property', 'og:title', metadata.title)
  upsertMeta('property', 'og:description', metadata.description)
  upsertMeta('property', 'og:url', metadata.canonical)
  upsertMeta('property', 'og:type', metadata.ogType)
  upsertMeta('property', 'og:site_name', 'LefTonbo')
  upsertMeta('property', 'og:locale', 'ja_JP')
  upsertMeta('property', 'og:image', metadata.socialImage.url)
  upsertMeta('property', 'og:image:alt', metadata.socialImage.alt)
  upsertMeta('property', 'og:image:type', metadata.socialImage.mimeType)
  upsertOptionalMeta('property', 'og:image:width', metadata.socialImage.width)
  upsertOptionalMeta('property', 'og:image:height', metadata.socialImage.height)
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', metadata.title)
  upsertMeta('name', 'twitter:description', metadata.description)
  upsertMeta('name', 'twitter:image', metadata.socialImage.url)
  upsertMeta('name', 'twitter:image:alt', metadata.socialImage.alt)
  upsertOptionalMeta('property', 'article:published_time', metadata.publishedTime)

  if (metadata.noindex) {
    upsertMeta('name', 'robots', 'noindex, follow')
  } else {
    removeMeta('name', 'robots')
  }

  const existingCanonical = document.head.querySelector('link[rel="canonical"]')
  const canonicalElement =
    existingCanonical instanceof HTMLLinkElement ? existingCanonical : document.createElement('link')
  if (!(existingCanonical instanceof HTMLLinkElement)) {
    canonicalElement.rel = 'canonical'
    document.head.append(canonicalElement)
  }
  canonicalElement.href = metadata.canonical
}

function syncNotFoundJsonLd() {
  for (const script of document.head.querySelectorAll('script[type="application/ld+json"]')) {
    script.remove()
  }

  const jsonLd = document.createElement('script')
  jsonLd.type = 'application/ld+json'
  jsonLd.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://leftonbo.com/404.html',
    name: 'ページが見つかりません',
    inLanguage: 'ja',
  })
  document.head.append(jsonLd)
}

function upsertOptionalMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string | number | undefined,
) {
  if (content === undefined) {
    removeMeta(attribute, key)
    return
  }

  upsertMeta(attribute, key, String(content))
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const existingMeta = document.head.querySelector(`meta[${attribute}="${key}"]`)
  const element = existingMeta instanceof HTMLMetaElement ? existingMeta : document.createElement('meta')
  if (!(existingMeta instanceof HTMLMetaElement)) {
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.content = content
}

function removeMeta(attribute: 'name' | 'property', key: string) {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove()
}
