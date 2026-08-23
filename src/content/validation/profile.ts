import type { ContentValidationIssue, ProfileHistoryEntry, ProfileToolGroup, SiteProfile } from '../types'
import {
  addDateIssue,
  addRequiredTextIssue,
  validateIntroduction,
  validatePendingFacts,
  validateSources,
} from './shared'

function validateProfileHistory(
  issues: ContentValidationIssue[],
  path: string,
  history: readonly ProfileHistoryEntry[],
): void {
  if (!Array.isArray(history) || history.length === 0) {
    issues.push({ path, message: '経歴が1件以上必要です。' })
    return
  }

  history.forEach((entry, index) => {
    const entryPath = `${path}[${index}]`
    addRequiredTextIssue(issues, `${entryPath}.period`, entry.period)
    addRequiredTextIssue(issues, `${entryPath}.title`, entry.title)
    addRequiredTextIssue(issues, `${entryPath}.description`, entry.description)
  })
}

function validateProfileTools(
  issues: ContentValidationIssue[],
  path: string,
  tools: readonly ProfileToolGroup[],
): void {
  if (!Array.isArray(tools) || tools.length === 0) {
    issues.push({ path, message: '使用ツールが1分類以上必要です。' })
    return
  }

  tools.forEach((group, index) => {
    const groupPath = `${path}[${index}]`
    addRequiredTextIssue(issues, `${groupPath}.label`, group.label)
    if (!Array.isArray(group.items) || group.items.length === 0) {
      issues.push({ path: `${groupPath}.items`, message: 'ツールが1件以上必要です。' })
      return
    }
    group.items.forEach((item: string, itemIndex: number) => {
      addRequiredTextIssue(issues, `${groupPath}.items[${itemIndex}]`, item)
    })
  })
}

export function validateProfile(
  issues: ContentValidationIssue[],
  profile: SiteProfile,
): void {
  addRequiredTextIssue(issues, 'profile.name', profile.name)
  addRequiredTextIssue(issues, 'profile.reading', profile.reading)
  addRequiredTextIssue(issues, 'profile.handle', profile.handle)
  addRequiredTextIssue(issues, 'profile.tagline', profile.tagline)
  addRequiredTextIssue(issues, 'profile.summary', profile.summary)
  validateIntroduction(issues, 'profile.introduction', profile.introduction)
  addRequiredTextIssue(issues, 'profile.craft', profile.craft)
  validateProfileHistory(issues, 'profile.history', profile.history)
  validateProfileTools(issues, 'profile.tools', profile.tools)
  addDateIssue(issues, 'profile.updatedAt', profile.updatedAt)
  addDateIssue(issues, 'profile.verifiedAt', profile.verifiedAt)
  validateSources(issues, 'profile.sources', profile.sources)
  validatePendingFacts(issues, 'profile.factsPending', profile.factsPending)
}
