import { ExternalLink } from '../components/ExternalLink'
import { HeroWispParade } from '../components/HeroWispParade'
import { OfficialLinkIcon } from '../components/OfficialLinkIcon'
import { UiIcon } from '../components/UiIcon'
import { WorkCard } from '../components/WorkCard'
import type {
  ActivityArea,
  ExternalLink as ExternalLinkData,
  HomeContent,
  SiteProfile,
  Work,
} from '../content/types'

interface HomePageProps {
  profile: SiteProfile
  activityAreas: readonly ActivityArea[]
  works: readonly Work[]
  externalLinks: readonly ExternalLinkData[]
  homeContent: HomeContent
}

export function HomePage({
  profile,
  activityAreas,
  works,
  externalLinks,
  homeContent,
}: HomePageProps) {
  const entranceWorks = works
    .filter((work) => work.featuredOrder !== null)
    .sort((left, right) => (left.featuredOrder ?? 0) - (right.featuredOrder ?? 0))
  const activityAreaById = new Map(activityAreas.map((area) => [area.id, area]))
  const workBySlug = new Map(works.map((work) => [work.slug, work]))
  const externalLinkById = new Map(externalLinks.map((link) => [link.id, link]))
  const primaryLinks = homeContent.primaryLinks.map(({ linkId, label }) => ({
    link: getRequiredItem(externalLinkById, linkId, `home.primaryLinks.${linkId}`),
    label,
  }))

  return (
    <>
      <section className="hero">
        <HeroWispParade />
        <div className="container hero__foreground">
          <div className="hero__content">
            <div className="hero__identity">
              <img
                className="hero__avatar"
                src="/images/profile.webp"
                alt={`${profile.name}のプロフィールアイコン`}
                width="512"
                height="512"
                loading="eager"
                decoding="async"
              />
              <h1>
                <span>{profile.name}</span>
                <small>{profile.reading}</small>
              </h1>
            </div>
            <p className="hero__tagline">{profile.tagline}</p>
            <div className="hero__introduction">
              {homeContent.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="hero__actions">
              <a className="action-link action-link--hero-primary" href="/works/">
                制作を見る
                <UiIcon name="arrow-right" width="16" height="16" />
              </a>
              <a className="action-link action-link--hero-secondary" href="/profile/">
                プロフィール
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--surface" aria-labelledby="entrance-title">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">MAIN WORKS</p>
              <h2 className="section-title" id="entrance-title">
                代表作
              </h2>
            </div>
            <a className="action-link section-heading-row__action" href="/works/">
              掲載作品をすべて見る
              <UiIcon name="arrow-right" width="16" height="16" />
            </a>
          </div>
          <ul className="work-card-grid work-card-grid--featured" aria-label="代表作">
            {entranceWorks.map((work) => (
              <li key={work.id}>
                <WorkCard work={work} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell" aria-labelledby="activity-title">
        <div className="container">
          <div className="section-heading-row section-heading-row--compact">
            <div>
              <p className="section-kicker">WHAT I MAKE</p>
              <h2 className="section-title" id="activity-title">
                つくっているもの
              </h2>
            </div>
          </div>
          <ul className="activity-card-grid">
            {homeContent.activities.map((presentation) => {
              const area = getRequiredItem(
                activityAreaById,
                presentation.areaId,
                `home.activities.${presentation.areaId}`,
              )
              const isWorksDestination = presentation.kind === 'works'
              const href = isWorksDestination
                ? `/works/?category=${presentation.category}#work-index`
                : getRequiredUrl(area.url, `activityAreas.${area.id}.url`)
              const previewWorks = isWorksDestination
                ? presentation.workSlugs.map((slug) =>
                    getRequiredItem(workBySlug, slug, `home.activities.${presentation.areaId}.${slug}`),
                  )
                : undefined
              const destinationLabel = isWorksDestination
                ? `${presentation.workSlugs.length}作品を見る`
                : presentation.destinationLabel
              const cardContent = (
                <>
                  <ActivityVisual
                    image={isWorksDestination ? undefined : presentation.image}
                    works={previewWorks}
                  />
                  <span className="activity-card__copy">
                    <strong>{presentation.label}</strong>
                    <span>{destinationLabel}</span>
                  </span>
                </>
              )

              return (
                <li
                  key={presentation.areaId}
                  data-size={previewWorks?.length === 3 ? 'wide' : 'standard'}
                >
                  {isWorksDestination ? (
                    <a className="activity-card" href={href}>
                      {cardContent}
                      <UiIcon name="arrow-right" width="18" height="18" />
                    </a>
                  ) : (
                    <ExternalLink className="activity-card" href={href}>
                      {cardContent}
                    </ExternalLink>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="section-shell section-shell--surface" aria-labelledby="links-title">
        <div className="container links-preview-home">
          <div className="section-heading-row section-heading-row--compact">
            <div>
              <p className="section-kicker">OFFICIAL LINKS</p>
              <h2 className="section-title" id="links-title">
                公式リンク
              </h2>
            </div>
            <a className="text-link-arrow" href="/profile/#official-links">
              すべて見る
              <UiIcon name="arrow-right" width="16" height="16" />
            </a>
          </div>
          <ul className="official-link-tiles" aria-label="主な公式リンク">
            {primaryLinks.map(({ link, label }) => (
              <li key={link.id}>
                <ExternalLink href={link.url}>
                  <OfficialLinkIcon linkId={link.id} category={link.category} />
                  <strong>{label}</strong>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

function getRequiredItem<T>(items: ReadonlyMap<string, T>, key: string, path: string): T {
  const item = items.get(key)
  if (item === undefined) {
    throw new Error(`参照先が見つかりません: ${path}`)
  }
  return item
}

function getRequiredUrl(url: string | undefined, path: string): string {
  if (url === undefined) {
    throw new Error(`URLが見つかりません: ${path}`)
  }
  return url
}

interface ActivityVisualProps {
  readonly image?: string
  readonly works?: readonly Work[]
}

function ActivityVisual({ image, works: previewWorks }: ActivityVisualProps) {
  return (
    <span className="activity-card__visual" aria-hidden="true">
      {image ? (
        <img src={image} alt="" width="1280" height="800" loading="lazy" decoding="async" />
      ) : (
        <span className="activity-card__mosaic">
          {previewWorks?.map((work) =>
            work.heroMedia ? (
              <img
                src={work.heroMedia.url}
                alt=""
                width="16"
                height="10"
                loading="lazy"
                decoding="async"
                key={work.id}
              />
            ) : null,
          )}
        </span>
      )}
    </span>
  )
}
