import { categoryLabels, roleLabels } from '../app/presentation'
import { ExternalLink } from '../components/ExternalLink'
import { WorkMark } from '../components/WorkMark'
import type { Work } from '../content/types'

interface WorkDetailPageProps {
  work: Work
  works: readonly Work[]
}

export function WorkDetailPage({ work, works }: WorkDetailPageProps) {
  const categoryWorks = works.filter((item) => item.category === work.category)
  const currentIndex = categoryWorks.findIndex((item) => item.id === work.id)
  const previousWork = currentIndex > 0 ? categoryWorks[currentIndex - 1] : undefined
  const nextWork = currentIndex >= 0 ? categoryWorks[currentIndex + 1] : undefined

  return (
    <article className="work-detail">
      <div className="container">
        <nav className="breadcrumbs" aria-label="パンくず">
          <ol>
            <li>
              <a href="/">ホーム</a>
            </li>
            <li>
              <a href="/works/">制作</a>
            </li>
            <li aria-current="page">{work.title}</li>
          </ol>
        </nav>
        <header className="work-detail__hero">
          <div className="work-detail__title">
            <p className="section-kicker">{categoryLabels[work.category]}</p>
            <h1>{work.title}</h1>
            <p>{work.description}</p>
            <ExternalLink className="action-link action-link--primary" href={work.url}>
              公式の公開先へ
            </ExternalLink>
          </div>
          <WorkMark category={work.category} />
        </header>

        <div className="work-detail__content">
          <section aria-labelledby="work-facts-title">
            <p className="section-kicker">Details</p>
            <h2 id="work-facts-title">作品情報</h2>
            <dl className="fact-list">
              <div>
                <dt>カテゴリ</dt>
                <dd>{categoryLabels[work.category]}</dd>
              </div>
              {work.role !== 'pending-confirmation' ? (
                <div>
                  <dt>関わり方</dt>
                  <dd>{roleLabels[work.role]}</dd>
                </div>
              ) : null}
              {work.period ? (
                <div>
                  <dt>制作時期</dt>
                  <dd>{work.period}</dd>
                </div>
              ) : null}
            </dl>
          </section>
        </div>

        <nav className="work-neighbors" aria-label="同じカテゴリの制作">
          {previousWork ? (
            <a href={`/works/${previousWork.slug}/`}>
              <span>
                <span aria-hidden="true">← </span>
                前の制作
              </span>
              <strong>{previousWork.title}</strong>
            </a>
          ) : (
            <span />
          )}
          {nextWork ? (
            <a href={`/works/${nextWork.slug}/`}>
              <span>
                次の制作 <span aria-hidden="true">→</span>
              </span>
              <strong>{nextWork.title}</strong>
            </a>
          ) : (
            <a href={`/works/?category=${work.category}#work-index`}>
              <span>
                一覧へ <span aria-hidden="true">→</span>
              </span>
              <strong>{categoryLabels[work.category]}</strong>
            </a>
          )}
        </nav>
      </div>
    </article>
  )
}
