import { describe, expect, it } from 'vitest'
import { works } from '../content/works'
import { createPageMetadata, defaultSocialImage } from './metadata'

describe('page metadata', () => {
  it('builds the approved home, works, and profile metadata', () => {
    expect(createPageMetadata('/', works)).toMatchObject({
      title: 'LefTonbo（レフとんぼ）｜放浪するゲームクリエイター',
      description: 'ゲームづくりを中心に、VRChatワールド、3Dモデル、Webなど、LefTonboの活動をまとめています。',
      canonical: 'https://leftonbo.com/',
      socialImage: {
        url: 'https://leftonbo.com/images/og/home.png',
        alt: 'LefTonbo（レフとんぼ）のプロフィールアイコンと「放浪するゲームクリエイター」の紹介',
        mimeType: 'image/png',
        width: 1200,
        height: 630,
      },
    })
    expect(createPageMetadata('/works/', works)).toMatchObject({
      title: '制作一覧｜LefTonbo',
      canonical: 'https://leftonbo.com/works/',
      socialImage: defaultSocialImage,
    })
    expect(createPageMetadata('/profile/', works)).toMatchObject({
      title: 'プロフィール｜LefTonbo（レフとんぼ）',
      canonical: 'https://leftonbo.com/profile/',
      socialImage: defaultSocialImage,
    })
  })

  it('uses a work hero and confirmed publication date on detail pages', () => {
    const metadata = createPageMetadata('/works/light-trail/', works)

    expect(metadata).toMatchObject({
      title: 'Light Trail｜LefTonbo',
      description: '停滞要素を抑え、テンポよく遊べる「ライトな救世RPG」。',
      ogType: 'article',
      publishedTime: '2018-04-29',
      socialImage: {
        url: 'https://leftonbo.com/images/works/light-trail/hero.webp',
        mimeType: 'image/webp',
      },
    })
  })

  it('falls back to the common image and does not invent an unknown publication date', () => {
    const sourceWork = works.find((work) => work.slug === 'ball-maze')
    if (!sourceWork) throw new Error('メタデータ検証用の作品がありません。')
    const undatedWork = {
      ...sourceWork,
      id: 'undated-test',
      slug: 'undated-test',
      firstPublishedAt: null,
    }
    const metadata = createPageMetadata('/works/undated-test/', [undatedWork])

    expect(metadata.socialImage).toEqual(defaultSocialImage)
    expect(metadata.publishedTime).toBeUndefined()
  })

  it('marks not-found metadata as noindex', () => {
    expect(createPageMetadata('/not-real/', works)).toMatchObject({
      title: 'ページが見つかりません｜LefTonbo',
      canonical: 'https://leftonbo.com/404.html',
      noindex: true,
      socialImage: defaultSocialImage,
    })
  })
})
