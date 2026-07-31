import { categoryLabels, roleLabels } from '../app/presentation'
import type { Work } from '../content/types'
import { WorkMark } from './WorkMark'

interface WorkCardProps {
  work: Work
}

export function WorkCard({ work }: WorkCardProps) {
  const preview = work.media[0]
  const detailHref = `/works/${work.slug}/`

  return (
    <article className="work-card">
      <div
        className={`work-card__visual${preview ? '' : ' work-card__visual--fallback'}`}
      >
        {preview ? (
          <img src={preview.url} alt={preview.alt} loading="lazy" decoding="async" />
        ) : (
          <WorkMark category={work.category} />
        )}
      </div>
      <div className="work-card__body">
        <ul className="work-card__tags" aria-label="作品情報">
          <li data-tone="category">{categoryLabels[work.category]}</li>
          {work.period ? <li>{work.period}</li> : null}
          {work.role !== 'pending-confirmation' ? <li>{roleLabels[work.role]}</li> : null}
        </ul>
        <h3>
          <a href={detailHref}>{work.title}</a>
        </h3>
        <p>{work.description}</p>
        <a className="work-card__detail" href={detailHref}>
          作品を見る
          <span className="visually-hidden">：{work.title}</span>
          <span className="work-card__detail-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}
