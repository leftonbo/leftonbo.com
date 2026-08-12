import { ExternalLink } from '../components/ExternalLink'
import { OfficialLinkIcon } from '../components/OfficialLinkIcon'
import { WorkCard } from '../components/WorkCard'
import type { ActivityArea, ExternalLink as ExternalLinkData, SiteProfile, Work } from '../content/types'

interface HomePageProps {
  profile: SiteProfile
  activityAreas: readonly ActivityArea[]
  works: readonly Work[]
  externalLinks: readonly ExternalLinkData[]
}

export function HomePage({ profile, activityAreas, works, externalLinks }: HomePageProps) {
  const entranceWorks = works
    .filter((work) => work.featuredOrder !== null)
    .sort((left, right) => (left.featuredOrder ?? 0) - (right.featuredOrder ?? 0))
  const primaryLinks = ['tonbo-notion', 'vrchat', 'booth', 'github']
    .map((id) => externalLinks.find((link) => link.id === id))
    .filter((link): link is ExternalLinkData => link !== undefined)

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <p className="section-kicker">Official portal &amp; portfolio</p>
            <h1>
              <span>{profile.name}</span>
              <small>{profile.reading}</small>
            </h1>
            <p className="hero__lead">{profile.summary}</p>
            <p className="hero__note">公開できる制作と活動を、一か所からたどれるポータルです。</p>
            <div className="hero__actions">
              <a className="action-link action-link--primary" href="/works/">
                制作を見る
                <span aria-hidden="true">→</span>
              </a>
              <a className="action-link" href="/profile/">
                プロフィール
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--surface" aria-labelledby="entrance-title">
        <div className="container">
          <div className="section-split-heading">
            <div>
              <p className="section-kicker">Selected works</p>
              <h2 className="section-title" id="entrance-title">
                代表作
              </h2>
            </div>
            <div>
              <p className="section-lead">
                ワールド、ゲーム、3Dモデルから、LefTonboを知るための4作品を選びました。
              </p>
              <a className="text-link-arrow" href="/works/">
                掲載作品をすべて見る <span aria-hidden="true">→</span>
              </a>
            </div>
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
          <div className="section-split-heading">
            <div>
              <p className="section-kicker">Creative fields</p>
              <h2 className="section-title" id="activity-title">
                制作領域
              </h2>
            </div>
            <p className="section-lead">
              ワールド、ゲーム、3D、Web、オリジナルキャラクター創作の入口をまとめています。
            </p>
          </div>
          <ul className="activity-index activity-index--home">
            {activityAreas.map((area) => {
              const destination = getActivityHref(area)

              return (
                <li key={area.id}>
                  <div>
                    <h3>{area.label}</h3>
                    <p>{area.description}</p>
                  </div>
                  {destination ? (
                    destination.external ? (
                      <ExternalLink href={destination.href}>公開先を見る</ExternalLink>
                    ) : (
                      <a href={destination.href}>
                        制作を見る <span aria-hidden="true">→</span>
                      </a>
                    )
                  ) : null}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="section-shell section-shell--surface" aria-labelledby="links-title">
        <div className="container links-preview links-preview--compact">
          <div>
            <p className="section-kicker">Official links</p>
            <h2 className="section-title" id="links-title">
              公式リンク
            </h2>
            <a className="text-link-arrow" href="/profile/#official-links">
              すべてプロフィールで見る <span aria-hidden="true">→</span>
            </a>
          </div>
          <ul className="official-link-strip" aria-label="主な公式リンク">
            {primaryLinks.map((link) => (
              <li key={link.id}>
                <ExternalLink href={link.url}>
                  <OfficialLinkIcon linkId={link.id} category={link.category} />
                  <span>{link.label}</span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

function getActivityHref(area: ActivityArea): { href: string; external: boolean } | undefined {
  if (area.id === 'vrchat-worlds') return { href: '/works/?category=vrchat-world#work-index', external: false }
  if (area.id === 'avatar-3d') return { href: '/works/?category=avatar-3d#work-index', external: false }
  if (area.id === 'games') return { href: '/works/?category=game#work-index', external: false }
  if (area.url) return { href: area.url, external: true }
  return undefined
}
