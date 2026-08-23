import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { createWorkScaffold } from './create-work.mjs'

const temporaryDirectories = []

async function createTemporaryProject() {
  const projectRoot = await mkdtemp(resolve(tmpdir(), 'leftonbo-create-work-'))
  temporaryDirectories.push(projectRoot)
  return projectRoot
}

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  )
})

describe('createWorkScaffold', () => {
  it('未入力項目を残した作品ファイルと画像ディレクトリを作成する', async () => {
    const projectRoot = await createTemporaryProject()
    const result = await createWorkScaffold({ projectRoot, slug: 'new-work' })
    const source = await readFile(result.workPath, 'utf8')

    expect(source).toContain("id: 'new-work'")
    expect(source).toContain("title: ''")
    expect(source).toContain("category: ''")
    expect(source).toContain("verifiedAt: ''")
    expect(source).toContain('satisfies Work')
    expect(await exists(result.imageDirectory)).toBe(true)
  })

  it('不正なslugを拒否する', async () => {
    const projectRoot = await createTemporaryProject()

    await expect(createWorkScaffold({ projectRoot, slug: 'Invalid Slug' })).rejects.toThrow(
      'slugは英小文字・数字・ハイフンで指定してください。',
    )
    expect(await exists(resolve(projectRoot, 'src'))).toBe(false)
  })

  it('既存の作品ファイルを上書きしない', async () => {
    const projectRoot = await createTemporaryProject()
    const workPath = resolve(projectRoot, 'src/content/works/existing-work.ts')
    await mkdir(resolve(projectRoot, 'src/content/works'), { recursive: true })
    await writeFile(workPath, 'keep me', 'utf8')

    await expect(createWorkScaffold({ projectRoot, slug: 'existing-work' })).rejects.toThrow(
      '作品ファイルがすでに存在します',
    )
    expect(await readFile(workPath, 'utf8')).toBe('keep me')
    expect(await exists(resolve(projectRoot, 'public/images/works/existing-work'))).toBe(false)
  })

  it('既存の画像ディレクトリがある場合は作品ファイルを作らない', async () => {
    const projectRoot = await createTemporaryProject()
    const imageDirectory = resolve(projectRoot, 'public/images/works/existing-images')
    await mkdir(imageDirectory, { recursive: true })

    await expect(createWorkScaffold({ projectRoot, slug: 'existing-images' })).rejects.toThrow(
      '画像ディレクトリがすでに存在します',
    )
    expect(await exists(resolve(projectRoot, 'src/content/works/existing-images.ts'))).toBe(false)
  })
})
