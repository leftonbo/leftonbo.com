import { linkCategoryLabels } from '../app/presentation'
import { ExternalLink } from '../components/ExternalLink'
import { PageIntro } from '../components/PageIntro'
import type { ExternalLink as ExternalLinkData, ExternalLinkCategory } from '../content/types'

interface LinksPageProps {
  links: readonly ExternalLinkData[]
}

const categoryOrder: readonly ExternalLinkCategory[] = [
  'hub',
  'vrchat',
  'shop',
  'code',
  'portfolio',
  'social',
  'community',
  'contact',
  'support',
]

export function LinksPage({ links }: LinksPageProps) {
  return (
    <>
      <PageIntro
        kicker="Official links"
        title="外部の公開拠点"
        description="プロフィール、作品、配布・販売、ソースコード、コミュニティ、メッセージ窓口をまとめています。"
      />
      <section className="section-shell" aria-labelledby="official-links-title">
        <div className="container">
          <h2 className="visually-hidden" id="official-links-title">
            公式リンク一覧
          </h2>
          <ul className="official-link-list">
            {categoryOrder.flatMap((category) =>
              links
                .filter((link) => link.category === category)
                .map((link) => (
                  <li key={link.id} id={link.id === 'tonbo-notion' ? 'creation' : undefined}>
                    <p>{linkCategoryLabels[link.category]}</p>
                    <h3>
                      <ExternalLink href={link.url}>{link.label}</ExternalLink>
                    </h3>
                  </li>
                )),
            )}
          </ul>
        </div>
      </section>
    </>
  )
}
