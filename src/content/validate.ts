import { activityAreas, externalLinks, siteProfile } from "./site";
import { works } from "./works";
import type {
  CanonicalContent,
  ContentSource,
  ContentValidationIssue,
  PendingFact,
  ProfileHistoryEntry,
  ProfileToolGroup,
  Work,
  WorkCategory,
  WorkLink,
  WorkLinkTag,
  WorkMedia,
} from "./types";

const canonicalContent = {
  profile: siteProfile,
  links: externalLinks,
  activityAreas,
  works,
} satisfies CanonicalContent;

const sourceKinds = new Set([
  "first-party-public",
  "third-party-public",
  "person-confirmed",
]);
const sourceRoles = new Set(['catalog', 'event-post', 'video'])
const pendingFactFields = new Set([
  "current-status",
  "first-published-at",
  "last-updated-at",
  "summary",
  "role",
  "media",
  "version",
  "link-availability",
]);
const workCategories = new Set<WorkCategory>([
  "vrchat-world",
  "avatar-3d",
  "game",
  "vket",
]);
const workStatuses = new Set([
  "published",
  "recent-evidence",
  "recent-public-record",
  "unverified",
  "stopped-with-public-record",
  "archived",
  'confirmed-record',
]);
const workRoles = new Set([
  "self-produced",
  "model-creator",
  "collaborator",
  "programming-support",
  "pending-confirmation",
  'exhibitor',
]);
const workMediaKinds = new Set(["image"]);
const workLinkTags = new Set(['primary', 'action', 'related'])
const externalLinkCategories = new Set([
  "hub",
  "code",
  "social",
  "shop",
  "vrchat",
  "portfolio",
  "contact",
  "support",
  "community",
]);
const externalLinkStatuses = new Set([
  "recent-evidence",
  "availability-unverified",
]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const yearPattern = /^\d{4}$/
const xPostUrlPattern = /^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/\d+\/?$/
const workSummaryMaxLength = 80

function addRequiredTextIssue(
  issues: ContentValidationIssue[],
  path: string,
  value: unknown,
): void {
  if (typeof value !== "string" || value.trim().length === 0) {
    issues.push({ path, message: "必須の文字列が空です。" });
  }
}

function addEnumIssue(
  issues: ContentValidationIssue[],
  path: string,
  value: unknown,
  allowedValues: ReadonlySet<string>,
): void {
  if (typeof value !== "string" || !allowedValues.has(value)) {
    issues.push({ path, message: `許可されていない値です: ${String(value)}` });
  }
}

function addUrlIssue(
  issues: ContentValidationIssue[],
  path: string,
  value: unknown,
): void {
  if (typeof value !== "string" || value.trim().length === 0) {
    issues.push({ path, message: "URLが空です。" });
    return;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      issues.push({ path, message: "httpまたはhttpsのURLではありません。" });
    }
  } catch {
    issues.push({ path, message: `不正なURLです: ${value}` });
  }
}

function addDateIssue(
  issues: ContentValidationIssue[],
  path: string,
  value: unknown,
): void {
  if (typeof value !== "string" || !isoDatePattern.test(value)) {
    issues.push({ path, message: "YYYY-MM-DD形式の日付ではありません。" });
    return;
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    issues.push({ path, message: `実在しない日付です: ${value}` });
  }
}

function addDuplicateIssues(
  issues: ContentValidationIssue[],
  path: string,
  values: readonly string[],
): void {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  for (const duplicate of duplicates) {
    issues.push({ path, message: `重複しています: ${duplicate}` });
  }
}

function validateSources(
  issues: ContentValidationIssue[],
  path: string,
  sources: readonly ContentSource[],
): void {
  if (!Array.isArray(sources) || sources.length === 0) {
    issues.push({ path, message: "出典が1件以上必要です。" });
    return;
  }

  sources.forEach((source, index) => {
    const sourcePath = `${path}[${index}]`;
    addRequiredTextIssue(issues, `${sourcePath}.label`, source.label);
    addUrlIssue(issues, `${sourcePath}.url`, source.url);
    addEnumIssue(issues, `${sourcePath}.kind`, source.kind, sourceKinds);
    if (source.role !== undefined) {
      addEnumIssue(issues, `${sourcePath}.role`, source.role, sourceRoles)
    }
    addDateIssue(issues, `${sourcePath}.verifiedAt`, source.verifiedAt);
  });
}

function validatePendingFacts(
  issues: ContentValidationIssue[],
  path: string,
  facts: readonly PendingFact[],
): void {
  if (!Array.isArray(facts)) {
    issues.push({ path, message: "factsPendingは配列である必要があります。" });
    return;
  }

  facts.forEach((fact, index) => {
    const factPath = `${path}[${index}]`;
    addEnumIssue(issues, `${factPath}.field`, fact.field, pendingFactFields);
    addRequiredTextIssue(issues, `${factPath}.note`, fact.note);
  });
}

function validateWorkMediaItem(
  issues: ContentValidationIssue[],
  path: string,
  item: WorkMedia,
): void {
  addEnumIssue(issues, `${path}.kind`, item.kind, workMediaKinds)
  if (typeof item.url === 'string' && item.url.startsWith('/')) {
    if (!/^\/[a-zA-Z0-9._/-]+$/.test(item.url) || item.url.startsWith('//')) {
      issues.push({ path: `${path}.url`, message: '不正なサイト内URLです。' })
    }
  } else {
    addUrlIssue(issues, `${path}.url`, item.url)
  }
  addRequiredTextIssue(issues, `${path}.alt`, item.alt)
  if (item.caption !== undefined) {
    addRequiredTextIssue(issues, `${path}.caption`, item.caption)
  }
  if (item.credit !== null) {
    addRequiredTextIssue(issues, `${path}.credit`, item.credit)
  }
}

function validateWorkMedia(
  issues: ContentValidationIssue[],
  path: string,
  media: readonly WorkMedia[],
): void {
  if (!Array.isArray(media)) {
    issues.push({ path, message: "mediaは配列である必要があります。" });
    return;
  }

  media.forEach((item, index) => validateWorkMediaItem(issues, `${path}[${index}]`, item))
}

function validateWorkLinks(
  issues: ContentValidationIssue[],
  path: string,
  links: readonly WorkLink[],
): void {
  if (!Array.isArray(links)) {
    issues.push({ path, message: 'linksは配列である必要があります。' })
    return
  }

  links.forEach((link, index) => {
    const linkPath = `${path}[${index}]`
    addRequiredTextIssue(issues, `${linkPath}.label`, link.label)
    addUrlIssue(issues, `${linkPath}.url`, link.url)
    if (link.note !== undefined) {
      addRequiredTextIssue(issues, `${linkPath}.note`, link.note)
    }
    if (!Array.isArray(link.tags) || link.tags.length === 0) {
      issues.push({ path: `${linkPath}.tags`, message: '1件以上のタグが必要です。' })
    } else {
      link.tags.forEach((tag: WorkLinkTag, tagIndex: number) => {
        addEnumIssue(issues, `${linkPath}.tags[${tagIndex}]`, tag, workLinkTags)
      })
      if (new Set(link.tags).size !== link.tags.length) {
        issues.push({ path: `${linkPath}.tags`, message: '同じタグが重複しています。' })
      }
    }
    if (link.disabled !== undefined && typeof link.disabled !== 'boolean') {
      issues.push({ path: `${linkPath}.disabled`, message: 'booleanではありません。' })
    }
  })

  const primaryCount = links.filter((link) => link.tags.includes('primary')).length
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

  const gameDetails = work.gameDetails
  if (gameDetails === undefined) {
    issues.push({ path, message: 'ゲーム作品にはgameDetailsが必要です。' })
    return
  }

  addRequiredTextIssue(issues, `${path}.genre`, gameDetails.genre)
  if (gameDetails.developmentTool !== null) {
    addRequiredTextIssue(issues, `${path}.developmentTool`, gameDetails.developmentTool)
  }
}

function validateWorkIntroduction(
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

function validateWorkSummary(
  issues: ContentValidationIssue[],
  path: string,
  summary: string,
): void {
  addRequiredTextIssue(issues, path, summary)

  if (summary.includes('\n')) {
    issues.push({ path, message: '改行を含められません。' })
  }

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

export function collectContentValidationIssues(
  content: CanonicalContent = canonicalContent,
): ContentValidationIssue[] {
  const issues: ContentValidationIssue[] = [];

  addRequiredTextIssue(issues, "profile.name", content.profile.name);
  addRequiredTextIssue(issues, "profile.reading", content.profile.reading);
  addRequiredTextIssue(issues, "profile.handle", content.profile.handle);
  addRequiredTextIssue(issues, "profile.groupName", content.profile.groupName);
  addRequiredTextIssue(
    issues,
    "profile.groupDescription",
    content.profile.groupDescription,
  );
  addRequiredTextIssue(issues, 'profile.tagline', content.profile.tagline)
  addRequiredTextIssue(issues, "profile.summary", content.profile.summary);
  validateWorkIntroduction(issues, "profile.introduction", content.profile.introduction)
  addRequiredTextIssue(issues, 'profile.craft', content.profile.craft)
  validateProfileHistory(issues, 'profile.history', content.profile.history)
  validateProfileTools(issues, 'profile.tools', content.profile.tools)
  if (typeof content.profile.acceptsRequests !== 'boolean') {
    issues.push({ path: 'profile.acceptsRequests', message: 'booleanではありません。' })
  }
  addRequiredTextIssue(issues, 'profile.contactNote', content.profile.contactNote)
  addDateIssue(issues, "profile.updatedAt", content.profile.updatedAt);
  addDateIssue(issues, "profile.verifiedAt", content.profile.verifiedAt);
  validateSources(issues, "profile.sources", content.profile.sources);
  validatePendingFacts(
    issues,
    "profile.factsPending",
    content.profile.factsPending,
  );

  addDuplicateIssues(
    issues,
    "links.id",
    content.links.map((link) => link.id),
  );
  content.links.forEach((link, index) => {
    const path = `links[${index}]`;
    addRequiredTextIssue(issues, `${path}.id`, link.id);
    addRequiredTextIssue(issues, `${path}.label`, link.label);
    addUrlIssue(issues, `${path}.url`, link.url);
    addEnumIssue(
      issues,
      `${path}.category`,
      link.category,
      externalLinkCategories,
    );
    addEnumIssue(
      issues,
      `${path}.status`,
      link.status,
      externalLinkStatuses,
    );
    addDateIssue(issues, `${path}.verifiedAt`, link.verifiedAt);
  });

  addDuplicateIssues(
    issues,
    "activityAreas.id",
    content.activityAreas.map((area) => area.id),
  );
  content.activityAreas.forEach((area, index) => {
    const path = `activityAreas[${index}]`;
    addRequiredTextIssue(issues, `${path}.id`, area.id);
    addRequiredTextIssue(issues, `${path}.label`, area.label);
    addRequiredTextIssue(issues, `${path}.description`, area.description);
    if (area.url !== undefined) {
      addUrlIssue(issues, `${path}.url`, area.url);
    }
    addDateIssue(issues, `${path}.verifiedAt`, area.verifiedAt);
    validateSources(issues, `${path}.sources`, area.sources);
    validatePendingFacts(issues, `${path}.factsPending`, area.factsPending);
  });

  addDuplicateIssues(
    issues,
    "works.id",
    content.works.map((work) => work.id),
  );
  addDuplicateIssues(
    issues,
    "works.slug",
    content.works.map((work) => work.slug),
  );
  addDuplicateIssues(
    issues,
    'works.featuredOrder',
    content.works.flatMap((work) =>
      work.featuredOrder === null ? [] : [String(work.featuredOrder)],
    ),
  )

  content.works.forEach((work, index) => {
    const path = `works[${index}]`;
    addRequiredTextIssue(issues, `${path}.id`, work.id);
    addRequiredTextIssue(issues, `${path}.slug`, work.slug);
    if (!slugPattern.test(work.slug)) {
      issues.push({
        path: `${path}.slug`,
        message: `英小文字・数字・ハイフンだけのslugではありません: ${work.slug}`,
      });
    }
    addRequiredTextIssue(issues, `${path}.title`, work.title);
    validateWorkSummary(issues, `${path}.summary`, work.summary)
    validateWorkIntroduction(issues, `${path}.introduction`, work.introduction)
    addEnumIssue(issues, `${path}.category`, work.category, workCategories);
    addEnumIssue(issues, `${path}.status`, work.status, workStatuses);
    addEnumIssue(issues, `${path}.role`, work.role, workRoles);
    if (work.period !== null) {
      addRequiredTextIssue(issues, `${path}.period`, work.period);
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
      issues.push({
        path: `${path}.media`,
        message: 'heroMediaと同じ画像を含められません。',
      })
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
    validateWorkLinks(issues, `${path}.links`, work.links)
    addDateIssue(issues, `${path}.verifiedAt`, work.verifiedAt);
    validateSources(issues, `${path}.sources`, work.sources);
    validatePendingFacts(issues, `${path}.factsPending`, work.factsPending);
  });

  return issues;
}

export function assertValidContent(
  content: CanonicalContent = canonicalContent,
): void {
  const issues = collectContentValidationIssues(content);
  if (issues.length === 0) {
    return;
  }

  const details = issues
    .map((issue) => `- ${issue.path}: ${issue.message}`)
    .join("\n");
  throw new Error(`Canonical content validation failed:\n${details}`);
}
