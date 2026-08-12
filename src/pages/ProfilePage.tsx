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
      <PageIntro
        kicker="Profile"
        title={`${profile.name}について`}
        description={profile.summary}
      />
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
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--surface" aria-labelledby="profile-activity-title">
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
                {area.url ? <ExternalLink href={area.url}>{area.label}の公開先</ExternalLink> : null}
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
