#!/usr/bin/env node

import { access, readFile, readdir } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST_DIR = resolve(PROJECT_ROOT, 'dist')
const REQUIRED_HTML_FRAGMENTS = [
  '<title>',
  '<link rel="canonical"',
  '<meta property="og:image"',
  '<meta name="twitter:card" content="summary_large_image">',
]
const PRERENDER_MARKERS = ['<!--head-tags-->', '<!--app-html-->', '<!--app-route-->']

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

async function main() {
  const htmlCount = await verifyHtml()
  await verifyMachineReadableFiles()
  console.log(
    `[verify-dist] verified ${htmlCount} HTML files, data/works.json, llms.txt, and 404.html`,
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error)
  process.exitCode = 1
})
