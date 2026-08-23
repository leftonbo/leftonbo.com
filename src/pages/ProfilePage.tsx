import { ExternalLink } from '../components/ExternalLink'
import { OfficialLinkGroups } from '../components/OfficialLinkGroups'
import { PageIntro } from '../components/PageIntro'
import type { ActivityArea, ExternalLink as ExternalLinkData, SiteProfile } from '../content/types'

interface ProfilePageProps {
  profile: SiteProfile
  activityAreas: readonly ActivityArea[]
  externalLinks: readonly ExternalLinkData[]
}

export function ProfilePage({ profile, activityAreas, externalLinks }: ProfilePageProps) {
  return (
    <>
      <PageIntro kicker="Profile" title={`${profile.name}について`} description={profile.tagline} />
      <section className="section-shell profile-overview" aria-labelledby="about-title">
        <div className="container profile-grid">
          <div className="profile-portrait">
            <img
              className="profile-avatar"
              src="/images/profile.webp"
              alt={`${profile.name}のプロフィールアイコン`}
              width="512"
              height="512"
              decoding="async"
            />
          </div>
          <div className="profile-about">
            <p className="section-kicker">About</p>
            <h2 id="about-title">つくっている人</h2>
            <div className="profile-introduction">
              {profile.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="profile-craft">
              <h3>制作で大切にしていること</h3>
              <p>{profile.craft}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-shell section-shell--surface"
        aria-labelledby="profile-history-title"
      >
        <div className="container">
          <div className="section-split-heading">
            <div>
              <p className="section-kicker">History</p>
              <h2 className="section-title" id="profile-history-title">
                活動の歩み
              </h2>
            </div>
            <p className="section-lead">
              Tonyu
              Systemで始めたゲーム制作から、Unity、VRChatワールド制作へと活動の場所を広げてきました。
            </p>
          </div>
          <ol className="profile-timeline">
            {profile.history.map((entry) => (
              <li key={`${entry.period}-${entry.title}`}>
                <span className="profile-timeline__period">{entry.period}</span>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell" aria-labelledby="profile-practice-title">
        <div className="container">
          <p className="section-kicker">Practice</p>
          <h2 className="section-title" id="profile-practice-title">
            制作環境
          </h2>
          <div className="profile-practice">
            <section aria-labelledby="profile-tools-title">
              <h3 id="profile-tools-title">使っているもの</h3>
              <dl className="profile-facts">
                {profile.tools.map((group) => (
                  <div key={group.label}>
                    <dt>{group.label}</dt>
                    <dd>{group.items.join('、')}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </section>

      <section
        className="section-shell section-shell--surface"
        aria-labelledby="profile-activity-title"
      >
        <div className="container">
          <p className="section-kicker">Activity areas</p>
          <h2 className="section-title" id="profile-activity-title">
            制作しているもの
          </h2>
          <ul className="profile-areas">
            {activityAreas.map((area) => (
              <li key={area.id}>
                <h3>{area.label}</h3>
                <p>{area.description}</p>
                {area.url ? (
                  <ExternalLink href={area.url}>{area.label}の公開先</ExternalLink>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell" id="official-links" aria-labelledby="profile-links-title">
        <div className="container">
          <div className="section-split-heading">
            <div>
              <p className="section-kicker">Official destinations</p>
              <h2 className="section-title" id="profile-links-title">
                公式の行き先
              </h2>
            </div>
            <p className="section-lead">
              作品を見る、最新の活動を追う、連絡するなど、目的ごとに公開先をまとめています。
            </p>
          </div>
          <OfficialLinkGroups links={externalLinks} />
        </div>
      </section>
    </>
  )
}
