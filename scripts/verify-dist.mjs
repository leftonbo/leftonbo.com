#!/usr/bin/env node

import { access, readFile, readdir } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST_DIR = resolve(PROJECT_ROOT, 'dist')
const DIST_ASSETS_DIR = resolve(DIST_DIR, 'assets')
const REQUIRED_HTML_FRAGMENTS = [
  '<title>',
  '<link rel="canonical"',
  '<meta property="og:image"',
  '<meta name="twitter:card" content="summary_large_image">',
]
const PRERENDER_MARKERS = ['<!--head-tags-->', '<!--app-html-->', '<!--app-route-->']
const REQUIRED_HEADER_RULES = [
  `/*.txt
  Content-Type: text/plain; charset=utf-8
  X-Content-Type-Options: nosniff`,
  `/*.md
  Content-Type: text/markdown; charset=utf-8
  X-Content-Type-Options: nosniff`,
  `/*.xml
  Content-Type: application/xml; charset=utf-8
  X-Content-Type-Options: nosniff`,
  `/*.json
  Content-Type: application/json; charset=utf-8
  X-Content-Type-Options: nosniff`,
  `/assets/*.woff2
  Cache-Control: public, max-age=31536000, immutable`,
]

function fail(message) {
  throw new Error(`[verify-dist] ${message}`)
}

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve(directory, entry.name)
      if (entry.isDirectory()) return collectHtmlFiles(entryPath)
      return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : []
    }),
  )
  return nestedFiles.flat()
}

async function verifyHtml() {
  const htmlFiles = await collectHtmlFiles(DIST_DIR)

  if (htmlFiles.length === 0) {
    fail('dist does not contain any HTML files')
  }

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, 'utf8')
    const label = relative(PROJECT_ROOT, htmlFile)

    for (const marker of PRERENDER_MARKERS) {
      if (html.includes(marker)) fail(`${label} still contains ${marker}`)
    }

    for (const fragment of REQUIRED_HTML_FRAGMENTS) {
      if (!html.includes(fragment)) fail(`${label} is missing ${fragment}`)
    }
  }

  return htmlFiles.length
}

async function verifyMachineReadableFiles() {
  const worksJsonPath = resolve(DIST_DIR, 'data/works.json')
  const llmsPath = resolve(DIST_DIR, 'llms.txt')
  const notFoundPath = resolve(DIST_DIR, '404.html')

  let worksPayload
  try {
    worksPayload = JSON.parse(await readFile(worksJsonPath, 'utf8'))
  } catch (error) {
    fail(
      `data/works.json is not valid JSON: ${error instanceof Error ? error.message : String(error)}`,
    )
  }

  if (!Array.isArray(worksPayload.works)) {
    fail('data/works.json does not contain a works array')
  }

  const llmsText = await readFile(llmsPath, 'utf8')
  if (!llmsText.startsWith('# LefTonbo')) {
    fail('llms.txt must start with # LefTonbo')
  }

  await access(notFoundPath)
}

async function verifyHeaders() {
  const headersPath = resolve(DIST_DIR, '_headers')
  const headers = await readFile(headersPath, 'utf8')

  for (const rule of REQUIRED_HEADER_RULES) {
    if (!headers.includes(rule)) {
      fail(`dist/_headers is missing rule:\n${rule}`)
    }
  }
}

async function verifyFontCss() {
  const assetEntries = await readdir(DIST_ASSETS_DIR, { withFileTypes: true })
  const cssFiles = assetEntries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.css'))
    .map((entry) => resolve(DIST_ASSETS_DIR, entry.name))
  const css = (await Promise.all(cssFiles.map((file) => readFile(file, 'utf8')))).join('\n')
  const notoFontFaces = css.match(
    /@font-face\{[^}]*font-family:(?:["']Noto Sans JP Variable["']|Noto Sans JP Variable);[^}]*\}/g,
  )

  if (!notoFontFaces?.length) {
    fail('generated CSS does not contain Noto Sans JP Variable font faces')
  }

  if (notoFontFaces.some((fontFace) => !fontFace.includes('font-display:swap'))) {
    fail('generated Noto Sans JP CSS must use font-display: swap')
  }

  if (css.includes('font-display:optional')) {
    fail('generated CSS must not contain font-display: optional')
  }
}

async function main() {
  const htmlCount = await verifyHtml()
  await verifyMachineReadableFiles()
  await verifyHeaders()
  await verifyFontCss()
  console.log(
    `[verify-dist] verified ${htmlCount} HTML files, machine-readable files, headers, font CSS, and 404.html`,
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error)
  process.exitCode = 1
})
