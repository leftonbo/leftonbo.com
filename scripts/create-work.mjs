#!/usr/bin/env node

import { access, mkdir, rmdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

async function pathExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

export function createWorkTemplate(slug) {
  return `import type { Work } from '../types'

export default {
  id: '${slug}',
  slug: '${slug}',
  title: '',
  summary: '',
  introduction: [],
  category: '',
  status: '',
  role: '',
  period: null,
  firstPublishedAt: null,
  heroMedia: null,
  media: [],
  featuredOrder: null,
  links: [],
  sources: [],
  verifiedAt: '',
  factsPending: [],
} satisfies Work
`
}

export async function createWorkScaffold({ projectRoot = PROJECT_ROOT, slug }) {
  if (typeof slug !== 'string' || !slugPattern.test(slug)) {
    throw new Error('slugは英小文字・数字・ハイフンで指定してください。')
  }

  const workPath = resolve(projectRoot, 'src/content/works', `${slug}.ts`)
  const imageDirectory = resolve(projectRoot, 'public/images/works', slug)
  if (await pathExists(workPath)) {
    throw new Error(`作品ファイルがすでに存在します: ${workPath}`)
  }
  if (await pathExists(imageDirectory)) {
    throw new Error(`画像ディレクトリがすでに存在します: ${imageDirectory}`)
  }

  await mkdir(dirname(workPath), { recursive: true })
  await mkdir(dirname(imageDirectory), { recursive: true })
  await mkdir(imageDirectory)
  try {
    await writeFile(workPath, createWorkTemplate(slug), { encoding: 'utf8', flag: 'wx' })
  } catch (error) {
    await rmdir(imageDirectory)
    throw error
  }

  return { workPath, imageDirectory }
}

async function main() {
  const [slug, ...extraArguments] = process.argv.slice(2)
  if (slug === undefined || extraArguments.length > 0) {
    throw new Error('使い方: npm run content:new -- <slug>')
  }

  const result = await createWorkScaffold({ slug })
  console.log(`作品ファイルを作成しました: ${result.workPath}`)
  console.log(`画像ディレクトリを作成しました: ${result.imageDirectory}`)
  console.log('必須項目を編集してから npm run check を実行してください。')
}

const entryPath = process.argv[1]
if (entryPath !== undefined && import.meta.url === pathToFileURL(entryPath).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
