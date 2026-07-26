import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/noto-sans-jp/wght.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { App } from './app/App'
import { matchRoute, normalizePathname } from './app/routes'
import { siteProfile } from './content/site'
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

if (routeMatch.kind === 'not-found') {
  syncNotFoundHead()
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

function syncNotFoundHead() {
  const title = `ページが見つかりません | ${siteProfile.name}`
  const description = '指定されたページは見つかりませんでした。ホームまたは制作一覧から移動できます。'
  const canonical = 'https://leftonbo.com/404.html'

  document.title = title
  upsertMeta('name', 'description', description)
  upsertMeta('name', 'robots', 'noindex, follow')
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', canonical)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)

  const existingCanonical = document.head.querySelector('link[rel="canonical"]')
  const canonicalElement =
    existingCanonical instanceof HTMLLinkElement ? existingCanonical : document.createElement('link')
  if (!(existingCanonical instanceof HTMLLinkElement)) {
    canonicalElement.rel = 'canonical'
    document.head.append(canonicalElement)
  }
  canonicalElement.href = canonical

  for (const script of document.head.querySelectorAll('script[type="application/ld+json"]')) {
    script.remove()
  }
  const jsonLd = document.createElement('script')
  jsonLd.type = 'application/ld+json'
  jsonLd.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: canonical,
    name: 'ページが見つかりません',
    inLanguage: 'ja',
  })
  document.head.append(jsonLd)
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
