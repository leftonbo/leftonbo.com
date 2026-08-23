import { ExternalLink } from '../components/ExternalLink'
import { HeroWispParade } from '../components/HeroWispParade'
import { OfficialLinkIcon } from '../components/OfficialLinkIcon'
import { UiIcon } from '../components/UiIcon'
import { WorkCard } from '../components/WorkCard'
import type { ActivityArea, ExternalLink as ExternalLinkData, SiteProfile, Work } from '../content/types'

interface HomePageProps {
  profile: SiteProfile
  activityAreas: readonly ActivityArea[]
  works: readonly Work[]
  externalLinks: readonly ExternalLinkData[]
}

interface ActivityPresentation {
  readonly id: ActivityArea['id']
  readonly label: string
  readonly destinationLabel: string
  readonly workSlugs?: readonly string[]
  readonly image?: string
}

const activityPresentations: readonly ActivityPresentation[] = [
  {
    id: 'vrchat-worlds',
    label: 'VRChatワールド',
    destinationLabel: '3作品を見る',
    workSlugs: [
      'tonbo-battlefield-the-two-bases',
      'massive-medal-pusher',
      'kawauchi-board-game-world',
    ],
  },
  {
    id: 'games',
    label: 'ゲーム',
    destinationLabel: '3作品を見る',
    workSlugs: ['infiroad', 'heroad', 'light-trail'],
  },
  {
    id: 'avatar-3d',
    label: '3Dモデル',
    destinationLabel: '2作品を見る',
    workSlugs: ['biter-spectre', 'sajak-sahagin'],
  },
  {
    id: 'web',
    label: 'Web',
    destinationLabel: 'GitHubへ',
    image: '/images/activity/web-github.webp',
  },
  {
    id: 'original-characters',
    label: 'オリジナルキャラクター',
    destinationLabel: 'Notionへ',
    image: '/images/activity/original-characters-notion.webp',
  },
]

const categoryDestinations: Readonly<Partial<Record<ActivityArea['id'], string>>> = {
  'vrchat-worlds': '/works/?category=vrchat-world#work-index',
  'avatar-3d': '/works/?category=avatar-3d#work-index',
  games: '/works/?category=game#work-index',
}

const primaryLinkLabels: Readonly<Record<string, string>> = {
  'tonbo-notion': 'Notion',
  vrchat: 'VRChat',
  booth: 'BOOTH',
  github: 'GitHub',
}

export function HomePage({ profile, activityAreas, works, externalLinks }: HomePageProps) {
  const entranceWorks = works
    .filter((work) => work.featuredOrder !== null)
    .sort((left, right) => (left.featuredOrder ?? 0) - (right.featuredOrder ?? 0))
  const primaryLinks = ['tonbo-notion', 'vrchat', 'booth', 'github']
    .map((id) => externalLinks.find((link) => link.id === id))
    .filter((link): link is ExternalLinkData => link !== undefined)
  const activityAreaById = new Map(activityAreas.map((area) => [area.id, area]))
  const workBySlug = new Map(works.map((work) => [work.slug, work]))

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
              <p>ゲームづくりを中心に、活動をまとめています。</p>
              <p>VRChatワールド、3Dモデル、Webなど。</p>
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
            {activityPresentations.map((presentation) => {
              const area = activityAreaById.get(presentation.id)
              if (!area) return null

              const internalHref = categoryDestinations[presentation.id]
              const href = internalHref ?? area.url
              if (!href) return null

              const previewWorks = presentation.workSlugs
                ?.map((slug) => workBySlug.get(slug))
                .filter((work): work is Work => work !== undefined)
              const cardContent = (
                <>
                  <ActivityVisual
                    image={presentation.image}
                    works={previewWorks}
                  />
                  <span className="activity-card__copy">
                    <strong>{presentation.label}</strong>
                    <span>{presentation.destinationLabel}</span>
                  </span>
                </>
              )

              return (
                <li key={presentation.id} data-size={previewWorks?.length === 3 ? 'wide' : 'standard'}>
                  {internalHref ? (
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
            {primaryLinks.map((link) => (
              <li key={link.id}>
                <ExternalLink href={link.url}>
                  <OfficialLinkIcon linkId={link.id} category={link.category} />
                  <strong>{primaryLinkLabels[link.id] ?? link.label}</strong>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
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
