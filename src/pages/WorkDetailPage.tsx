import { categoryLabels, getWorkActionLabel, roleLabels } from '../app/presentation'
import { ExternalLink } from '../components/ExternalLink'
import { WorkMark } from '../components/WorkMark'
import { XPostEmbed } from '../components/XPostEmbed'
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
  const headerMedia = work.media[0]
  const catalogSource = work.sources.find((source) => source.role === 'catalog')
  const eventPostSource = work.sources.find((source) => source.role === 'event-post')
  const videoSource = work.sources.find((source) => source.role === 'video')
  const actionLinks = work.additionalLinks?.filter((link) => link.placement === 'action') ?? []
  const relatedLinks = work.additionalLinks?.filter((link) => link.placement === 'related') ?? []

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
          <div className={`work-detail__visual${headerMedia ? '' : ' work-detail__visual--fallback'}`}>
            {headerMedia ? (
              <img
                src={headerMedia.url}
                alt={headerMedia.alt}
                width="16"
                height="10"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            ) : (
              <WorkMark category={work.category} />
            )}
          </div>
          <div className="work-detail__title">
            <p className="section-kicker">{categoryLabels[work.category]}</p>
            <h1>{work.title}</h1>
            <p>{work.description}</p>
            <div className="work-detail__actions">
              <div className="work-detail__primary-action">
                <ExternalLink className="action-link action-link--primary" href={work.url}>
                  {getWorkActionLabel(work)}
                </ExternalLink>
                {work.primaryActionNote ? (
                  <p className="work-detail__action-note">{work.primaryActionNote}</p>
                ) : null}
              </div>
              {actionLinks.map((link) => (
                <ExternalLink className="action-link" href={link.url} key={link.url}>
                  {link.label}
                </ExternalLink>
              ))}
            </div>
          </div>
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
              {work.firstPublishedAt ? (
                <div>
                  <dt>初公開日</dt>
                  <dd>
                    <time dateTime={work.firstPublishedAt}>{formatPublishedDate(work.firstPublishedAt)}</time>
                  </dd>
                </div>
              ) : null}
              {work.vketExhibition ? (
                <div>
                  <dt>出展ワールド</dt>
                  <dd>
                    {work.vketExhibition.world.url ? (
                      <ExternalLink href={work.vketExhibition.world.url}>
                        {work.vketExhibition.world.name}
                      </ExternalLink>
                    ) : (
                      <>
                        {work.vketExhibition.world.name}
                        <span className="fact-list__note">Public Link 未公開</span>
                      </>
                    )}
                  </dd>
                </div>
              ) : null}
              {catalogSource ? (
                <div>
                  <dt>カタログ</dt>
                  <dd>
                    <ExternalLink href={catalogSource.url}>{catalogSource.label}</ExternalLink>
                  </dd>
                </div>
              ) : null}
              {work.gameDetails ? (
                <div>
                  <dt>ジャンル</dt>
                  <dd>{work.gameDetails.genre}</dd>
                </div>
              ) : null}
              {work.gameDetails?.developmentTool ? (
                <div>
                  <dt>制作ツール</dt>
                  <dd>{work.gameDetails.developmentTool}</dd>
                </div>
              ) : null}
              {relatedLinks.length > 0 ? (
                <div>
                  <dt>関連リンク</dt>
                  <dd>
                    <ul className="fact-list__links">
                      {relatedLinks.map((link) => (
                        <li key={link.url}>
                          <ExternalLink href={link.url}>{link.label}</ExternalLink>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ) : null}
            </dl>
          </section>
          {work.gameDetails ? (
            <section className="work-detail__introduction" aria-labelledby="game-introduction-title">
              <p className="section-kicker">Introduction</p>
              <h2 id="game-introduction-title">ゲーム紹介</h2>
              {work.gameDetails.introduction.map((paragraph, index) => (
                <p key={`${work.id}-introduction-${index}`}>{paragraph}</p>
              ))}
            </section>
          ) : null}
          {videoSource ? (
            <section aria-labelledby="work-video-title">
              <p className="section-kicker">Video</p>
              <h2 id="work-video-title">紹介動画</h2>
              <ExternalLink className="action-link" href={videoSource.url}>
                YouTubeで紹介動画を見る
              </ExternalLink>
            </section>
          ) : null}
        </div>

        {eventPostSource ? (
          <section className="work-event-post" aria-labelledby="work-event-post-title">
            <p className="section-kicker">Event post</p>
            <h2 id="work-event-post-title">開催時のX投稿</h2>
            <XPostEmbed url={eventPostSource.url} />
          </section>
        ) : null}

        {work.media.length > 0 ? (
          <section className="work-gallery" aria-labelledby="work-gallery-title">
            <div className="work-gallery__heading">
              <div>
                <p className="section-kicker">Visual archive</p>
                <h2 id="work-gallery-title">作品画像</h2>
              </div>
              <p>{work.media.length}点</p>
            </div>
            <ul>
              {work.media.map((media, index) => (
                <li key={media.url} className={index === 0 ? 'work-gallery__hero' : undefined}>
                  <figure>
                    <img
                      src={media.url}
                      alt={media.alt}
                      width="16"
                      height="9"
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>
                      <div>
                        <span className="work-gallery__index">
                          IMAGE {String(index + 1).padStart(2, '0')}
                        </span>
                        <p>{media.caption ?? media.alt}</p>
                      </div>
                      {media.credit ? <span className="work-gallery__credit">{media.credit}</span> : null}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

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

function formatPublishedDate(value: string): string {
  const [year, month, day] = value.split('-').map(Number)
  return `${year}年${month}月${day}日`
}
