import { categoryLabels, editorialEntranceWorkIds, roleLabels } from '../app/presentation'
import { ExternalLink } from '../components/ExternalLink'
import { FlightMap } from '../components/FlightMap'
import type { FlightStop } from '../components/FlightMap'
import { WorkMark } from '../components/WorkMark'
import type { ActivityArea, ExternalLink as ExternalLinkData, HistoryEntry, SiteProfile, Work } from '../content/types'

interface HomePageProps {
  profile: SiteProfile
  activityAreas: readonly ActivityArea[]
  works: readonly Work[]
  history: readonly HistoryEntry[]
  externalLinks: readonly ExternalLinkData[]
}

export function HomePage({ profile, activityAreas, works, history, externalLinks }: HomePageProps) {
  const entranceWorks = editorialEntranceWorkIds
    .map((id) => works.find((work) => work.id === id || work.slug === id))
    .filter((work): work is Work => work !== undefined)
  const flightStops = createFlightStops(activityAreas)
  const primaryLinks = ['tonbo-notion', 'vrchat', 'booth', 'github']
    .map((id) => externalLinks.find((link) => link.id === id))
    .filter((link): link is ExternalLinkData => link !== undefined)

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
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
              <ul className="hero__areas" aria-label="主な活動領域">
                {activityAreas.map((area) => (
                  <li key={area.id}>{area.label}</li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <FlightMap stops={flightStops} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--surface" aria-labelledby="entrance-title">
        <div className="container">
          <div className="section-split-heading">
            <div>
              <p className="section-kicker">Selected entrances</p>
              <h2 className="section-title" id="entrance-title">
                制作の入口
              </h2>
            </div>
            <div>
              <p className="section-lead">
                活動の幅が分かるよう、カテゴリの異なる制作を入口として並べています。
              </p>
              <a className="text-link-arrow" href="/works/">
                掲載作品をすべて見る <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <ol className="entrance-list">
            {entranceWorks.map((work, index) => (
              <li key={work.id}>
                <article className="entrance-work">
                  <p className="entrance-work__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <WorkMark category={work.category} />
                  <div>
                    <p className="entrance-work__meta">
                      {categoryLabels[work.category]} / {roleLabels[work.role]}
                    </p>
                    <h3>
                      <a href={`/works/${work.slug}/`}>{work.title}</a>
                    </h3>
                    <p>{work.description}</p>
                  </div>
                  <a className="entrance-work__go" href={`/works/${work.slug}/`} aria-label={`${work.title}の詳細を見る`}>
                    <span aria-hidden="true">→</span>
                  </a>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell" aria-labelledby="activity-title">
        <div className="container">
          <p className="section-kicker">Activity areas</p>
          <h2 className="section-title" id="activity-title">
            つながっている活動
          </h2>
          <p className="section-lead">
            ワールド、ゲーム、3D、Web、オリジナルキャラクター創作を、それぞれの公開先へつなぎます。
          </p>
          <ul className="activity-index">
            {activityAreas.map((area) => (
              <li key={area.id}>
                <div>
                  <h3>{area.label}</h3>
                  <p>{area.description}</p>
                </div>
                {getActivityHref(area) ? (
                  getActivityHref(area)?.external ? (
                    <ExternalLink href={getActivityHref(area)?.href}>{area.label}の公開先を見る</ExternalLink>
                  ) : (
                    <a href={getActivityHref(area)?.href}>
                      {area.label}の制作一覧を見る <span aria-hidden="true">→</span>
                    </a>
                  )
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell history-section" aria-labelledby="history-title">
        <div className="container history-layout">
          <div className="history-section__heading">
            <p className="section-kicker">Recorded activity</p>
            <h2 className="section-title" id="history-title">
              出展の記録
            </h2>
            <p className="section-lead">
              Vketへの出展を年代順にまとめています。
            </p>
          </div>
          <ol className="history-list">
            {history.map((entry) => (
              <li key={entry.id}>
                <span>{entry.period}</span>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.groupName}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell section-shell--surface" aria-labelledby="links-title">
        <div className="container links-preview">
          <div>
            <p className="section-kicker">Official links</p>
            <h2 className="section-title" id="links-title">
              公式の行き先
            </h2>
            <p className="section-lead">詳しい情報、公開作品、配布・販売、ソースコードへ移動できます。</p>
          </div>
          <ul>
            {primaryLinks.map((link) => (
              <li key={link.id}>
                <ExternalLink href={link.url}>{link.label}</ExternalLink>
              </li>
            ))}
            <li>
              <a href="/links/">
                すべての公式リンク <span aria-hidden="true">→</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

function createFlightStops(activityAreas: readonly ActivityArea[]): readonly FlightStop[] {
  const findArea = (id: string) => activityAreas.find((area) => area.id === id)
  const candidates = [
    { area: findArea('vrchat-worlds'), href: '/works/?category=vrchat-world#work-index' },
    { area: findArea('avatar-3d'), href: '/works/?category=avatar-3d#work-index' },
    { area: findArea('games'), href: '/works/?category=past-game#work-index' },
    { area: findArea('original-characters'), href: findArea('original-characters')?.url ?? '/links/#creation', external: true },
  ]

  return candidates.flatMap(({ area, href, external }) =>
    area ? [{ id: area.id, label: area.label, description: area.description, href, external }] : [],
  )
}

function getActivityHref(area: ActivityArea): { href: string; external: boolean } | undefined {
  if (area.id === 'vrchat-worlds') return { href: '/works/?category=vrchat-world#work-index', external: false }
  if (area.id === 'avatar-3d') return { href: '/works/?category=avatar-3d#work-index', external: false }
  if (area.id === 'games') return { href: '/works/?category=past-game#work-index', external: false }
  if (area.url) return { href: area.url, external: true }
  return undefined
}
