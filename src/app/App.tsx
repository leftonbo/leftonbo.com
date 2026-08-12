import { SiteShell } from '../components/SiteShell'
import { activityAreas, externalLinks, siteProfile } from '../content/site'
import { works } from '../content/works'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProfilePage } from '../pages/ProfilePage'
import { WorkDetailPage } from '../pages/WorkDetailPage'
import { WorksPage } from '../pages/WorksPage'
import { matchRoute } from './routes'

interface AppProps {
  pathname: string
}

export function App({ pathname }: AppProps) {
  const route = matchRoute(pathname, works)

  return (
    <SiteShell
      canonicalName={siteProfile.name}
      japaneseName={siteProfile.reading}
      siteUpdatedAt={siteProfile.updatedAt}
      pathname={pathname}
    >
      {route.kind === 'home' ? (
        <HomePage
          profile={siteProfile}
          activityAreas={activityAreas}
          works={works}
          externalLinks={externalLinks}
        />
      ) : null}
      {route.kind === 'works' ? <WorksPage works={works} /> : null}
      {route.kind === 'work-detail' ? <WorkDetailPage work={route.work} works={works} /> : null}
      {route.kind === 'profile' ? (
        <ProfilePage profile={siteProfile} activityAreas={activityAreas} externalLinks={externalLinks} />
      ) : null}
      {route.kind === 'not-found' ? <NotFoundPage /> : null}
    </SiteShell>
  )
}
