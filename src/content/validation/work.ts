import {
  workCategories,
  workLinkTags,
  workMediaKinds,
  workRoles,
  workStatuses,
  type ContentValidationIssue,
  type Work,
  type WorkLinkTag,
  type WorkMedia,
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

const workCategorySet = new Set<string>(workCategories)
const workStatusSet = new Set<string>(workStatuses)
const workRoleSet = new Set<string>(workRoles)
const workMediaKindSet = new Set<string>(workMediaKinds)
const workLinkTagSet = new Set<string>(workLinkTags)
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const yearPattern = /^\d{4}$/
const xPostUrlPattern = /^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/\d+\/?$/
const workSummaryMaxLength = 80

function validateWorkMediaItem(
  issues: ContentValidationIssue[],
  path: string,
  item: WorkMedia,
): void {
  addEnumIssue(issues, `${path}.kind`, item.kind, workMediaKindSet)
  if (typeof item.url === 'string' && item.url.startsWith('/')) {
    addSitePathIssue(issues, `${path}.url`, item.url)
  } else {
    addUrlIssue(issues, `${path}.url`, item.url)
  }
  addRequiredTextIssue(issues, `${path}.alt`, item.alt)
  if (item.caption !== undefined) addRequiredTextIssue(issues, `${path}.caption`, item.caption)
  if (item.credit !== null) addRequiredTextIssue(issues, `${path}.credit`, item.credit)
}

function validateWorkMedia(
  issues: ContentValidationIssue[],
  path: string,
  media: readonly WorkMedia[],
): void {
  if (!Array.isArray(media)) {
    issues.push({ path, message: 'mediaは配列である必要があります。' })
    return
  }
  media.forEach((item, index) => validateWorkMediaItem(issues, `${path}[${index}]`, item))
}

function validateWorkLinks(
  issues: ContentValidationIssue[],
  path: string,
  work: Work,
): void {
  if (!Array.isArray(work.links)) {
    issues.push({ path, message: 'linksは配列である必要があります。' })
    return
  }

  work.links.forEach((link, index) => {
    const linkPath = `${path}[${index}]`
    addRequiredTextIssue(issues, `${linkPath}.label`, link.label)
    addUrlIssue(issues, `${linkPath}.url`, link.url)
    if (link.note !== undefined) addRequiredTextIssue(issues, `${linkPath}.note`, link.note)
    if (!Array.isArray(link.tags) || link.tags.length === 0) {
      issues.push({ path: `${linkPath}.tags`, message: '1件以上のタグが必要です。' })
    } else {
      link.tags.forEach((tag: WorkLinkTag, tagIndex: number) => {
        addEnumIssue(issues, `${linkPath}.tags[${tagIndex}]`, tag, workLinkTagSet)
      })
      if (new Set(link.tags).size !== link.tags.length) {
        issues.push({ path: `${linkPath}.tags`, message: '同じタグが重複しています。' })
      }
    }
    if (link.disabled !== undefined && typeof link.disabled !== 'boolean') {
      issues.push({ path: `${linkPath}.disabled`, message: 'booleanではありません。' })
    }
  })

  const primaryCount = work.links.filter((link) => link.tags.includes('primary')).length
  if (work.links.length === 0 && work.status === 'archived') return
  if (primaryCount !== 1) {
    issues.push({ path, message: 'primaryタグを持つリンクは必ず1件にしてください。' })
  }
}

function validateGameDetails(
  issues: ContentValidationIssue[],
  path: string,
  work: Work,
): void {
  if (work.category !== 'game') {
    if (work.gameDetails !== undefined) {
      issues.push({ path, message: 'ゲーム作品以外にはgameDetailsを指定できません。' })
    }
    return
  }
  if (work.gameDetails === undefined) {
    issues.push({ path, message: 'ゲーム作品にはgameDetailsが必要です。' })
    return
  }
  addRequiredTextIssue(issues, `${path}.genre`, work.gameDetails.genre)
  if (work.gameDetails.developmentTool !== null) {
    addRequiredTextIssue(issues, `${path}.developmentTool`, work.gameDetails.developmentTool)
  }
}

function validateWorkSummary(
  issues: ContentValidationIssue[],
  path: string,
  summary: string,
): void {
  addRequiredTextIssue(issues, path, summary)
  if (summary.includes('\n')) issues.push({ path, message: '改行を含められません。' })
  const length = Array.from(summary).length
  if (length > workSummaryMaxLength) {
    issues.push({ path, message: `${workSummaryMaxLength}文字を超えています: ${length}文字` })
  }
}

function validateVketExhibition(
  issues: ContentValidationIssue[],
  workPath: string,
  work: Work,
): void {
  const sourceRolesForWork = work.sources.flatMap((source) =>
    source.role === undefined ? [] : [source.role],
  )
  addDuplicateIssues(issues, `${workPath}.sources.role`, sourceRolesForWork)
  work.sources.forEach((source, index) => {
    if (source.role === 'event-post' && !xPostUrlPattern.test(source.url)) {
      issues.push({
        path: `${workPath}.sources[${index}].url`,
        message: 'Xの投稿URLではありません。',
      })
    }
  })

  if (work.category !== 'vket') {
    if (work.vketExhibition !== undefined) {
      issues.push({
        path: `${workPath}.vketExhibition`,
        message: 'Vket作品以外にはvketExhibitionを指定できません。',
      })
    }
    work.sources.forEach((source, index) => {
      if (source.role === 'catalog') {
        issues.push({
          path: `${workPath}.sources[${index}].role`,
          message: 'Vket作品以外にはカタログ用途を指定できません。',
        })
      }
    })
    return
  }

  if (work.vketExhibition === undefined) {
    issues.push({
      path: `${workPath}.vketExhibition`,
      message: 'Vket作品にはvketExhibitionが必要です。',
    })
    return
  }
  const worldPath = `${workPath}.vketExhibition.world`
  addRequiredTextIssue(issues, `${worldPath}.name`, work.vketExhibition.world.name)
  if (work.vketExhibition.world.url !== null) {
    addUrlIssue(issues, `${worldPath}.url`, work.vketExhibition.world.url)
  }
}

export function validateWorks(issues: ContentValidationIssue[], works: readonly Work[]): void {
  addDuplicateIssues(issues, 'works.id', works.map((work) => work.id))
  addDuplicateIssues(issues, 'works.slug', works.map((work) => work.slug))
  addDuplicateIssues(
    issues,
    'works.featuredOrder',
    works.flatMap((work) =>
      work.featuredOrder === null ? [] : [String(work.featuredOrder)],
    ),
  )

  works.forEach((work, index) => {
    const path = `works[${index}]`
    addRequiredTextIssue(issues, `${path}.id`, work.id)
    addRequiredTextIssue(issues, `${path}.slug`, work.slug)
    if (!slugPattern.test(work.slug)) {
      issues.push({
        path: `${path}.slug`,
        message: `英小文字・数字・ハイフンだけのslugではありません: ${work.slug}`,
      })
    }
    addRequiredTextIssue(issues, `${path}.title`, work.title)
    validateWorkSummary(issues, `${path}.summary`, work.summary)
    validateIntroduction(issues, `${path}.introduction`, work.introduction)
    addEnumIssue(issues, `${path}.category`, work.category, workCategorySet)
    addEnumIssue(issues, `${path}.status`, work.status, workStatusSet)
    addEnumIssue(issues, `${path}.role`, work.role, workRoleSet)
    if (work.period !== null) {
      addRequiredTextIssue(issues, `${path}.period`, work.period)
      if (!yearPattern.test(work.period)) {
        issues.push({ path: `${path}.period`, message: 'YYYY形式の年ではありません。' })
      }
    }
    if (work.firstPublishedAt !== null) {
      addDateIssue(issues, `${path}.firstPublishedAt`, work.firstPublishedAt)
    }
    validateGameDetails(issues, `${path}.gameDetails`, work)
    validateVketExhibition(issues, path, work)
    if (work.heroMedia !== null) {
      validateWorkMediaItem(issues, `${path}.heroMedia`, work.heroMedia)
    }
    validateWorkMedia(issues, `${path}.media`, work.media)
    if (work.heroMedia && work.media.some((media) => media.url === work.heroMedia?.url)) {
      issues.push({ path: `${path}.media`, message: 'heroMediaと同じ画像を含められません。' })
    }
    if (
      work.featuredOrder !== null &&
      (!Number.isInteger(work.featuredOrder) || work.featuredOrder < 1)
    ) {
      issues.push({
        path: `${path}.featuredOrder`,
        message: '1以上の整数またはnullである必要があります。',
      })
    }
    validateWorkLinks(issues, `${path}.links`, work)
    addDateIssue(issues, `${path}.verifiedAt`, work.verifiedAt)
    validateSources(issues, `${path}.sources`, work.sources)
    validatePendingFacts(issues, `${path}.factsPending`, work.factsPending)
  })
}
