import { categoryLabels, getWorkActionLabel, roleLabels, workCategoryOrder } from './app/presentation'
import { getStaticRoutePaths } from './app/routes'
import { activityAreas, externalLinks, siteProfile } from './content/site'
import type { Work } from './content/types'
import { works } from './content/works'

const SITE_ORIGIN = 'https://leftonbo.com'
const identityLinkIds = new Set(['tonbo-notion', 'github', 'x', 'vrchat'])

export function getMachineReadableFiles(): Record<string, string> {
  const publicRoutes = getStaticRoutePaths(works).filter((route) => route !== '/404.html')
  const profilePayload = {
    schemaVersion: 3,
    profile: {
      name: siteProfile.name,
      reading: siteProfile.reading,
      handle: siteProfile.handle,
      groupName: siteProfile.groupName,
      groupDescription: siteProfile.groupDescription,
      summary: siteProfile.summary,
      updatedAt: siteProfile.updatedAt,
    },
    activityAreas: activityAreas.map((area) => ({
      id: area.id,
      label: area.label,
      description: area.description,
      url: area.url,
    })),
    externalLinks: externalLinks.map((link) => ({
      id: link.id,
      label: link.label,
      url: link.url,
      category: link.category,
    })),
  }
  const worksPayload = {
    schemaVersion: 6,
    siteUpdatedAt: siteProfile.updatedAt,
    count: works.length,
    works: works.map((work) => {
      const catalogSource = work.sources.find((source) => source.role === 'catalog')
      const eventPostSource = work.sources.find((source) => source.role === 'event-post')

      return {
        id: work.id,
        slug: work.slug,
        title: work.title,
        description: work.description,
        category: work.category,
        role: work.role === 'pending-confirmation' ? null : work.role,
        period: work.period,
        firstPublishedAt: work.firstPublishedAt,
        gameDetails: work.gameDetails ?? null,
        vketExhibition: work.vketExhibition
          ? {
              world: work.vketExhibition.world,
              catalog: catalogSource
                ? { label: catalogSource.label, url: catalogSource.url }
                : null,
              eventPostUrl: eventPostSource?.url ?? null,
            }
          : null,
        media: work.media,
        featured: work.featured,
        url: work.url,
        primaryActionNote: work.primaryActionNote ?? null,
        additionalLinks: work.additionalLinks ?? [],
      }
    }),
  }

  return {
    'data/profile.json': `${JSON.stringify(profilePayload, null, 2)}\n`,
    'data/works.json': `${JSON.stringify(worksPayload, null, 2)}\n`,
    'profile.md': createProfileMarkdown(),
    'works.md': createWorksMarkdown(),
    'llms.txt': createLlmsText(),
    'sitemap.xml': createSitemap(publicRoutes),
    'robots.txt': `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
  }
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_ORIGIN}/#person`,
    name: siteProfile.name,
    alternateName: [siteProfile.reading, siteProfile.handle],
    url: `${SITE_ORIGIN}/`,
    image: `${SITE_ORIGIN}/images/profile.webp`,
    sameAs: externalLinks.filter((link) => identityLinkIds.has(link.id)).map((link) => link.url),
    knowsAbout: activityAreas.map((area) => area.label),
  }
}

export function profilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_ORIGIN}/profile/#page`,
    url: `${SITE_ORIGIN}/profile/`,
    name: `${siteProfile.name}について`,
    description: siteProfile.summary,
    dateModified: siteProfile.updatedAt,
    inLanguage: 'ja',
    mainEntity: { '@id': `${SITE_ORIGIN}/#person` },
  }
}

export function worksCollectionJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_ORIGIN}/works/#page`,
    url: `${SITE_ORIGIN}/works/`,
    name: `${siteProfile.name}の制作`,
    description: 'VRChatワールド、アバター／3D、ゲーム制作の掲載一覧。',
    dateModified: siteProfile.updatedAt,
    inLanguage: 'ja',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: works.length,
      itemListElement: works.map((work, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_ORIGIN}/works/${work.slug}/`,
        name: work.title,
      })),
    },
  }
}

export function creativeWorkJsonLd(work: Work) {
  const involvement =
    work.role === 'pending-confirmation'
      ? {}
      : work.role === 'self-produced' || work.role === 'model-creator'
        ? { creator: { '@id': `${SITE_ORIGIN}/#person` } }
        : { contributor: { '@id': `${SITE_ORIGIN}/#person` } }

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${SITE_ORIGIN}/works/${work.slug}/#work`,
    url: `${SITE_ORIGIN}/works/${work.slug}/`,
    sameAs: [work.url, ...(work.additionalLinks?.map((link) => link.url) ?? [])],
    name: work.title,
    description: work.description,
    genre: work.gameDetails?.genre ?? categoryLabels[work.category],
    inLanguage: 'ja',
    ...(work.firstPublishedAt ? { datePublished: work.firstPublishedAt } : {}),
    ...involvement,
  }
}

export function canonicalUrl(route: string): string {
  return route === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`
}

function createProfileMarkdown(): string {
  const areas = activityAreas.map((area) => `- **${area.label}**: ${area.description}`).join('\n')
  const links = externalLinks.map((link) => `- [${link.label}](${link.url})`).join('\n')

  return `# ${siteProfile.name}（${siteProfile.reading}）\n\n${siteProfile.summary}\n\n- 基本名義: ${siteProfile.name}\n- URL・ユーザーID表記: ${siteProfile.handle}\n- 活動グループ名: ${siteProfile.groupName}\n- サイト更新日: ${siteProfile.updatedAt}\n\n## 活動領域\n\n${areas}\n\n## 公式リンク\n\n${links}\n`
}

function createWorksMarkdown(): string {
  const sections = workCategoryOrder.map((category) => {
    const entries = works
      .filter((work) => work.category === category)
      .map((work) => {
        const catalogSource = work.sources.find((source) => source.role === 'catalog')
        const eventPostSource = work.sources.find((source) => source.role === 'event-post')
        const primaryLinkLabel = work.category === 'game' ? 'ダウンロード' : '公開先'
        const primaryLinkNote = work.primaryActionNote ? `（${work.primaryActionNote}）` : ''
        const additionalLinks = (work.additionalLinks ?? []).map(
          (link) =>
            `- ${link.placement === 'action' ? 'ブラウザ版' : '関連リンク'}: [${link.label}](${link.url})`,
        )
        const details = [
          ...(work.role === 'pending-confirmation' ? [] : [`- 関わり方: ${roleLabels[work.role]}`]),
          ...(work.period ? [`- 制作時期: ${work.period}`] : []),
          ...(work.firstPublishedAt ? [`- 初公開日: ${work.firstPublishedAt}`] : []),
          ...(work.vketExhibition
            ? [
                work.vketExhibition.world.url
                  ? `- 出展ワールド: [${work.vketExhibition.world.name}](${work.vketExhibition.world.url})`
                  : `- 出展ワールド: ${work.vketExhibition.world.name}（Public Link 未公開）`,
              ]
            : []),
          ...(catalogSource ? [`- カタログ: [${catalogSource.label}](${catalogSource.url})`] : []),
          ...(eventPostSource ? [`- 開催時のX投稿: ${eventPostSource.url}`] : []),
          ...(work.gameDetails ? [`- ジャンル: ${work.gameDetails.genre}`] : []),
          ...(work.gameDetails?.developmentTool
            ? [`- 制作ツール: ${work.gameDetails.developmentTool}`]
            : []),
          `- ${primaryLinkLabel}: [${getWorkActionLabel(work)}](${work.url})${primaryLinkNote}`,
          ...additionalLinks,
        ].join('\n')
        const introduction = work.gameDetails
          ? `\n\n#### ゲーム紹介\n\n${work.gameDetails.introduction.join('\n\n')}`
          : ''
        return `### [${work.title}](${SITE_ORIGIN}/works/${work.slug}/)\n\n${work.description}\n\n${details}${introduction}`
      })
      .join('\n\n')
    return `## ${categoryLabels[category]}\n\n${entries}`
  })

  return `# ${siteProfile.name}の制作\n\n掲載件数: ${works.length}件  \nサイト更新日: ${siteProfile.updatedAt}\n\n${sections.join('\n\n')}\n`
}

function createLlmsText(): string {
  return `# LefTonbo\n\n> LefTonbo（レフとんぼ）の公式ポータル兼ポートフォリオ。VRChatワールド、アバター／3D、ゲーム、Web、オリジナルキャラクター創作への入口です。\n\nサイト更新日: ${siteProfile.updatedAt}\n\n## Canonical data\n\n- [プロフィールJSON](${SITE_ORIGIN}/data/profile.json)\n- [制作一覧JSON](${SITE_ORIGIN}/data/works.json)\n- [プロフィールMarkdown](${SITE_ORIGIN}/profile.md)\n- [制作一覧Markdown](${SITE_ORIGIN}/works.md)\n\n## Human-readable pages\n\n- [ホーム](${SITE_ORIGIN}/)\n- [制作一覧](${SITE_ORIGIN}/works/)\n- [プロフィール](${SITE_ORIGIN}/profile/)\n- [公式リンク](${SITE_ORIGIN}/links/)\n`
}

function createSitemap(routes: readonly string[]): string {
  const entries = routes
    .map(
      (route) =>
        `  <url>\n    <loc>${escapeXml(canonicalUrl(route))}</loc>\n    <lastmod>${siteProfile.updatedAt}</lastmod>\n  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}
