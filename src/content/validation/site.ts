import {
  externalLinkCategories,
  externalLinkStatuses,
  workCategories,
  type ActivityArea,
  type ContentValidationIssue,
  type ExternalLink,
  type HomeContent,
  type Work,
} from '../types'
import {
  addDateIssue,
  addDuplicateIssues,
  addEnumIssue,
  addRequiredTextIssue,
  addSitePathIssue,
  addUrlIssue,
  validateIntroduction,
  validatePendingFacts,
  validateSources,
} from './shared'

const externalLinkCategorySet = new Set<string>(externalLinkCategories)
const externalLinkStatusSet = new Set<string>(externalLinkStatuses)
const workCategorySet = new Set<string>(workCategories)
const homeActivityKinds = new Set(['works', 'external'])

export function validateExternalLinks(
  issues: ContentValidationIssue[],
  links: readonly ExternalLink[],
): void {
  addDuplicateIssues(issues, 'links.id', links.map((link) => link.id))
  links.forEach((link, index) => {
    const path = `links[${index}]`
    addRequiredTextIssue(issues, `${path}.id`, link.id)
    addRequiredTextIssue(issues, `${path}.label`, link.label)
    addUrlIssue(issues, `${path}.url`, link.url)
    addEnumIssue(issues, `${path}.category`, link.category, externalLinkCategorySet)
    addEnumIssue(issues, `${path}.status`, link.status, externalLinkStatusSet)
    addDateIssue(issues, `${path}.verifiedAt`, link.verifiedAt)
  })
}

export function validateActivityAreas(
  issues: ContentValidationIssue[],
  activityAreas: readonly ActivityArea[],
): void {
  addDuplicateIssues(issues, 'activityAreas.id', activityAreas.map((area) => area.id))
  activityAreas.forEach((area, index) => {
    const path = `activityAreas[${index}]`
    addRequiredTextIssue(issues, `${path}.id`, area.id)
    addRequiredTextIssue(issues, `${path}.label`, area.label)
    addRequiredTextIssue(issues, `${path}.description`, area.description)
    if (area.url !== undefined) addUrlIssue(issues, `${path}.url`, area.url)
    addDateIssue(issues, `${path}.verifiedAt`, area.verifiedAt)
    validateSources(issues, `${path}.sources`, area.sources)
    validatePendingFacts(issues, `${path}.factsPending`, area.factsPending)
  })
}

export function validateHomeContent(
  issues: ContentValidationIssue[],
  home: HomeContent,
  activityAreas: readonly ActivityArea[],
  works: readonly Work[],
  links: readonly ExternalLink[],
): void {
  validateIntroduction(issues, 'home.introduction', home.introduction)
  const activityAreaById = new Map(activityAreas.map((area) => [area.id, area]))
  const workBySlug = new Map(works.map((work) => [work.slug, work]))
  const linkById = new Map(links.map((link) => [link.id, link]))

  addDuplicateIssues(
    issues,
    'home.activities.areaId',
    home.activities.map((activity) => activity.areaId),
  )
  home.activities.forEach((activity, index) => {
    const path = `home.activities[${index}]`
    addEnumIssue(issues, `${path}.kind`, activity.kind, homeActivityKinds)
    addRequiredTextIssue(issues, `${path}.areaId`, activity.areaId)
    addRequiredTextIssue(issues, `${path}.label`, activity.label)
    const area = activityAreaById.get(activity.areaId)
    if (area === undefined) {
      issues.push({
        path: `${path}.areaId`,
        message: `参照先の活動領域が見つかりません: ${activity.areaId}`,
      })
    }

    if (activity.kind === 'works') {
      addEnumIssue(issues, `${path}.category`, activity.category, workCategorySet)
      if (!Array.isArray(activity.workSlugs) || activity.workSlugs.length === 0) {
        issues.push({ path: `${path}.workSlugs`, message: '作品slugが1件以上必要です。' })
        return
      }
      addDuplicateIssues(issues, `${path}.workSlugs`, activity.workSlugs)
      activity.workSlugs.forEach((slug, slugIndex) => {
        const slugPath = `${path}.workSlugs[${slugIndex}]`
        addRequiredTextIssue(issues, slugPath, slug)
        const work = workBySlug.get(slug)
        if (work === undefined) {
          issues.push({ path: slugPath, message: `参照先の作品が見つかりません: ${slug}` })
        } else if (work.category !== activity.category) {
          issues.push({
            path: slugPath,
            message: `作品カテゴリが一致しません: ${work.category}`,
          })
        }
      })
      return
    }

    addRequiredTextIssue(issues, `${path}.destinationLabel`, activity.destinationLabel)
    addRequiredTextIssue(issues, `${path}.image`, activity.image)
    addSitePathIssue(issues, `${path}.image`, activity.image)
    if (area !== undefined && area.url === undefined) {
      issues.push({ path: `${path}.areaId`, message: '外部活動にはURLが必要です。' })
    }
  })

  addDuplicateIssues(
    issues,
    'home.primaryLinks.linkId',
    home.primaryLinks.map((link) => link.linkId),
  )
  home.primaryLinks.forEach((primaryLink, index) => {
    const path = `home.primaryLinks[${index}]`
    addRequiredTextIssue(issues, `${path}.linkId`, primaryLink.linkId)
    addRequiredTextIssue(issues, `${path}.label`, primaryLink.label)
    if (!linkById.has(primaryLink.linkId)) {
      issues.push({
        path: `${path}.linkId`,
        message: `参照先の公式リンクが見つかりません: ${primaryLink.linkId}`,
      })
    }
  })
}
