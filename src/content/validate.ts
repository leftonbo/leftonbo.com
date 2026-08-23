import { homeContent } from './home'
import { activityAreas, externalLinks, siteProfile } from './site'
import type { CanonicalContent, ContentValidationIssue } from './types'
import { validateProfile } from './validation/profile'
import {
  validateActivityAreas,
  validateExternalLinks,
  validateHomeContent,
} from './validation/site'
import { validateWorks } from './validation/work'
import { works } from './works'

const canonicalContent = {
  profile: siteProfile,
  links: externalLinks,
  activityAreas,
  works,
  home: homeContent,
} satisfies CanonicalContent

export function collectContentValidationIssues(
  content: CanonicalContent = canonicalContent,
): ContentValidationIssue[] {
  const issues: ContentValidationIssue[] = []
  validateProfile(issues, content.profile)
  validateExternalLinks(issues, content.links)
  validateActivityAreas(issues, content.activityAreas)
  validateWorks(issues, content.works)
  validateHomeContent(issues, content.home, content.activityAreas, content.works, content.links)
  return issues
}

export function assertValidContent(content: CanonicalContent = canonicalContent): void {
  const issues = collectContentValidationIssues(content)
  if (issues.length === 0) return

  const details = issues.map((issue) => `- ${issue.path}: ${issue.message}`).join('\n')
  throw new Error(`Canonical content validation failed:\n${details}`)
}
