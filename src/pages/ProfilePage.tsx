import { ExternalLink } from '../components/ExternalLink'
import { PageIntro } from '../components/PageIntro'
import type { ActivityArea, SiteProfile } from '../content/types'

interface ProfilePageProps {
  profile: SiteProfile
  activityAreas: readonly ActivityArea[]
}

export function ProfilePage({ profile, activityAreas }: ProfilePageProps) {
  return (
    <>
      <PageIntro
        kicker="Profile"
        title={`${profile.name}について`}
        description={profile.summary}
      />
      <section className="section-shell profile-overview" aria-labelledby="naming-title">
        <div className="container profile-grid">
          <div>
            <img
              className="profile-avatar"
              src="/images/profile.webp"
              alt={`${profile.name}のプロフィールアイコン`}
              width="512"
              height="512"
              decoding="async"
            />
            <p className="section-kicker">Names</p>
            <h2 id="naming-title">名義と表記</h2>
            <p>
              <strong>{profile.name}</strong> を基本名義として使用しています。
            </p>
          </div>
          <dl className="naming-list">
            <div>
              <dt>基本表記</dt>
              <dd>{profile.name}</dd>
            </div>
            <div>
              <dt>読み方／日本語表記</dt>
              <dd>{profile.reading}</dd>
            </div>
            <div>
              <dt>URL・ユーザーID表記</dt>
              <dd>{profile.handle}</dd>
            </div>
            <div>
              <dt>活動グループ名</dt>
              <dd>
                {profile.groupName}
                <small>{profile.groupDescription}</small>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section-shell section-shell--surface" aria-labelledby="profile-activity-title">
        <div className="container">
          <p className="section-kicker">Activity areas</p>
          <h2 className="section-title" id="profile-activity-title">
            公開している活動の入口
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
    </>
  )
}
