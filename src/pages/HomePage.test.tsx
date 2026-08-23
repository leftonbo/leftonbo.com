import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { homeContent } from '../content/home'
import { activityAreas, externalLinks, siteProfile } from '../content/site'
import type { HomeContent } from '../content/types'
import { works } from '../content/works'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('作品数から活動カードの案内を生成する', () => {
    const workActivity = homeContent.activities.find((activity) => activity.kind === 'works')
    if (!workActivity) throw new Error('検証元のホーム設定がありません。')
    const testHomeContent = {
      ...homeContent,
      activities: [{ ...workActivity, workSlugs: workActivity.workSlugs.slice(0, 2) }],
    } satisfies HomeContent

    render(
      <HomePage
        profile={siteProfile}
        activityAreas={activityAreas}
        works={works}
        externalLinks={externalLinks}
        homeContent={testHomeContent}
      />,
    )

    expect(
      screen.getByRole('link', { name: new RegExp(`${workActivity.label}\\s*2作品を見る`) }),
    ).toHaveAttribute('href', `/works/?category=${workActivity.category}#work-index`)
  })

  it('必須の参照先が欠けている場合は明示的に失敗する', () => {
    const invalidHomeContent = {
      ...homeContent,
      primaryLinks: [{ linkId: 'missing-link', label: 'Missing' }],
    } satisfies HomeContent

    expect(() =>
      render(
        <HomePage
          profile={siteProfile}
          activityAreas={activityAreas}
          works={works}
          externalLinks={externalLinks}
          homeContent={invalidHomeContent}
        />,
      ),
    ).toThrow('参照先が見つかりません: home.primaryLinks.missing-link')
  })
})
