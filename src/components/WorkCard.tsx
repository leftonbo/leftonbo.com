import { Badge, Card } from 'react-bootstrap'
import { categoryLabels, roleLabels } from '../app/presentation'
import type { Work } from '../content/types'
import { UiIcon } from './UiIcon'
import { WorkMark } from './WorkMark'

interface WorkCardProps {
  work: Work
}

export function WorkCard({ work }: WorkCardProps) {
  const preview = work.heroMedia
  const detailHref = `/works/${work.slug}/`

  return (
    <Card as="article" className="work-card">
      <a className="work-card__link" href={detailHref}>
        <div className={`work-card__visual${preview ? '' : ' work-card__visual--fallback'}`}>
          {preview ? (
            <img
              src={preview.url}
              alt={preview.alt}
              width="16"
              height="10"
              loading={work.featuredOrder !== null && work.featuredOrder <= 2 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ) : (
            <WorkMark category={work.category} />
          )}
        </div>
        <Card.Body className="work-card__body">
          <ul className="work-card__tags" aria-label="作品情報">
            <Badge as="li" bg="" pill data-tone="category">
              {categoryLabels[work.category]}
            </Badge>
            {work.period ? (
              <Badge as="li" bg="" pill>
                {work.period}
              </Badge>
            ) : null}
            {work.role !== 'pending-confirmation' ? (
              <Badge as="li" bg="" pill>
                {roleLabels[work.role]}
              </Badge>
            ) : null}
          </ul>
          <h3>{work.title}</h3>
          <p>{work.summary}</p>
          <span className="work-card__detail">
            作品を見る
            <UiIcon className="work-card__detail-arrow" name="arrow-right" width="18" height="18" />
          </span>
        </Card.Body>
      </a>
    </Card>
  )
}
