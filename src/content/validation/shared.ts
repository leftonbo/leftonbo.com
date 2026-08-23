import {
  pendingFactFields,
  sourceKinds,
  sourceRoles,
  type ContentSource,
  type ContentValidationIssue,
  type PendingFact,
} from '../types'

const sourceKindSet = new Set<string>(sourceKinds)
const sourceRoleSet = new Set<string>(sourceRoles)
const pendingFactFieldSet = new Set<string>(pendingFactFields)
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/
const sitePathPattern = /^\/[a-zA-Z0-9._/-]+$/

export function addRequiredTextIssue(
  issues: ContentValidationIssue[],
  path: string,
  value: unknown,
): void {
  if (typeof value !== 'string' || value.trim().length === 0) {
    issues.push({ path, message: '必須の文字列が空です。' })
  }
}

export function addEnumIssue(
  issues: ContentValidationIssue[],
  path: string,
  value: unknown,
  allowedValues: ReadonlySet<string>,
): void {
  if (typeof value !== 'string' || !allowedValues.has(value)) {
    issues.push({ path, message: `許可されていない値です: ${String(value)}` })
  }
}

export function addUrlIssue(
  issues: ContentValidationIssue[],
  path: string,
  value: unknown,
): void {
  if (typeof value !== 'string' || value.trim().length === 0) {
    issues.push({ path, message: 'URLが空です。' })
    return
  }

  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      issues.push({ path, message: 'httpまたはhttpsのURLではありません。' })
    }
  } catch {
    issues.push({ path, message: `不正なURLです: ${value}` })
  }
}

export function addSitePathIssue(
  issues: ContentValidationIssue[],
  path: string,
  value: unknown,
): void {
  if (typeof value !== 'string' || !sitePathPattern.test(value) || value.startsWith('//')) {
    issues.push({ path, message: '不正なサイト内URLです。' })
  }
}

export function addDateIssue(
  issues: ContentValidationIssue[],
  path: string,
  value: unknown,
): void {
  if (typeof value !== 'string' || !isoDatePattern.test(value)) {
    issues.push({ path, message: 'YYYY-MM-DD形式の日付ではありません。' })
    return
  }

  const parsed = new Date(`${value}T00:00:00.000Z`)
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    issues.push({ path, message: `実在しない日付です: ${value}` })
  }
}

export function addDuplicateIssues(
  issues: ContentValidationIssue[],
  path: string,
  values: readonly string[],
): void {
  const seen = new Set<string>()
  const duplicates = new Set<string>()

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value)
    seen.add(value)
  }

  for (const duplicate of duplicates) {
    issues.push({ path, message: `重複しています: ${duplicate}` })
  }
}

export function validateSources(
  issues: ContentValidationIssue[],
  path: string,
  sources: readonly ContentSource[],
): void {
  if (!Array.isArray(sources) || sources.length === 0) {
    issues.push({ path, message: '出典が1件以上必要です。' })
    return
  }

  sources.forEach((source, index) => {
    const sourcePath = `${path}[${index}]`
    addRequiredTextIssue(issues, `${sourcePath}.label`, source.label)
    addUrlIssue(issues, `${sourcePath}.url`, source.url)
    addEnumIssue(issues, `${sourcePath}.kind`, source.kind, sourceKindSet)
    if (source.role !== undefined) {
      addEnumIssue(issues, `${sourcePath}.role`, source.role, sourceRoleSet)
    }
    addDateIssue(issues, `${sourcePath}.verifiedAt`, source.verifiedAt)
  })
}

export function validatePendingFacts(
  issues: ContentValidationIssue[],
  path: string,
  facts: readonly PendingFact[],
): void {
  if (!Array.isArray(facts)) {
    issues.push({ path, message: 'factsPendingは配列である必要があります。' })
    return
  }

  facts.forEach((fact, index) => {
    const factPath = `${path}[${index}]`
    addEnumIssue(issues, `${factPath}.field`, fact.field, pendingFactFieldSet)
    addRequiredTextIssue(issues, `${factPath}.note`, fact.note)
  })
}

export function validateIntroduction(
  issues: ContentValidationIssue[],
  path: string,
  introduction: readonly string[],
): void {
  if (!Array.isArray(introduction) || introduction.length === 0) {
    issues.push({ path, message: '紹介文が1段落以上必要です。' })
    return
  }

  introduction.forEach((paragraph, index) => {
    addRequiredTextIssue(issues, `${path}[${index}]`, paragraph)
  })
}
