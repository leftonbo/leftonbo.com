import { useEffect, useMemo, useState } from 'react'
import { categoryLabels, workCategoryOrder } from '../app/presentation'
import type { Work, WorkCategory } from '../content/types'
import { WorkCard } from './WorkCard'

type WorkFilter = 'all' | WorkCategory
type WorkSort = 'featured' | 'newest' | 'oldest'

const filterOptions: readonly WorkFilter[] = ['all', ...workCategoryOrder]

interface WorkIndexProps {
  works: readonly Work[]
}

export function WorkIndex({ works }: WorkIndexProps) {
  const [selectedCategory, setSelectedCategory] = useState<WorkFilter>('all')
  const [selectedSort, setSelectedSort] = useState<WorkSort>('featured')

  useEffect(() => {
    const syncFromLocation = () => {
      const value = new URLSearchParams(window.location.search).get('category')
      const sortValue = new URLSearchParams(window.location.search).get('sort')
      const isKnownCategory = workCategoryOrder.includes(value as WorkCategory)
      const isKnownSort = sortValue === 'newest' || sortValue === 'oldest'

      if ((value !== null && !isKnownCategory) || (sortValue !== null && !isKnownSort)) {
        const normalizedUrl = new URL(window.location.href)
        if (value !== null && !isKnownCategory) normalizedUrl.searchParams.delete('category')
        if (sortValue !== null && !isKnownSort) normalizedUrl.searchParams.delete('sort')
        window.history.replaceState(
          {},
          '',
          `${normalizedUrl.pathname}${normalizedUrl.search}${normalizedUrl.hash}`,
        )
      }

      setSelectedCategory(isKnownCategory ? (value as WorkCategory) : 'all')
      setSelectedSort(isKnownSort ? sortValue : 'featured')
    }

    syncFromLocation()
    window.addEventListener('popstate', syncFromLocation)
    return () => window.removeEventListener('popstate', syncFromLocation)
  }, [])

  const filteredWorks = useMemo(
    () => selectedCategory === 'all' ? works : works.filter((work) => work.category === selectedCategory),
    [selectedCategory, works],
  )
  const sortedWorks = useMemo(
    () => sortWorks(filteredWorks, selectedSort),
    [filteredWorks, selectedSort],
  )
  const showFeaturedSections = selectedCategory === 'all' && selectedSort === 'featured'
  const representativeWorks = showFeaturedSections
    ? sortedWorks.filter((work) => work.featuredOrder !== null)
    : []
  const archiveWorks = showFeaturedSections
    ? sortedWorks.filter((work) => work.featuredOrder === null)
    : []

  const selectCategory = (category: WorkFilter) => {
    const nextUrl = new URL(window.location.href)
    if (category === 'all') {
      nextUrl.searchParams.delete('category')
    } else {
      nextUrl.searchParams.set('category', category)
    }
    nextUrl.hash = 'work-index'
    const nextRelativeUrl = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`
    const currentRelativeUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

    if (category === selectedCategory && nextRelativeUrl === currentRelativeUrl) return

    setSelectedCategory(category)
    window.history.pushState({}, '', nextRelativeUrl)
  }

  const selectSort = (sort: WorkSort) => {
    const nextUrl = new URL(window.location.href)
    if (sort === 'featured') {
      nextUrl.searchParams.delete('sort')
    } else {
      nextUrl.searchParams.set('sort', sort)
    }
    nextUrl.hash = 'work-index'
    const nextRelativeUrl = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`
    const currentRelativeUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

    if (sort === selectedSort && nextRelativeUrl === currentRelativeUrl) return

    setSelectedSort(sort)
    window.history.pushState({}, '', nextRelativeUrl)
  }

  return (
    <section className="work-index" id="work-index" aria-labelledby="work-index-title">
      <div className="container">
        <div className="work-index__heading">
          <div>
            <p className="section-kicker">Index</p>
            <h2 id="work-index-title">掲載している制作</h2>
          </div>
          <p className="work-index__count" aria-live="polite" aria-atomic="true">
            <strong>{filteredWorks.length}</strong>
            <span>件を表示</span>
          </p>
        </div>
        <div className="work-index__controls">
          <div className="work-filter" role="group" aria-label="制作カテゴリで絞り込む">
            {filterOptions.map((category) => (
              <button
                key={category}
                type="button"
                aria-controls="work-results"
                aria-pressed={selectedCategory === category}
                onClick={() => selectCategory(category)}
              >
                {category === 'all' ? 'すべて' : categoryLabels[category]}
                <span>{category === 'all' ? works.length : countWorks(works, category)}</span>
              </button>
            ))}
          </div>
          <label className="work-sort">
            <span>並び順</span>
            <select value={selectedSort} onChange={(event) => selectSort(event.target.value as WorkSort)}>
              <option value="featured">おすすめ順</option>
              <option value="newest">新しい順</option>
              <option value="oldest">古い順</option>
            </select>
          </label>
        </div>
        <div className="work-results" id="work-results">
          {showFeaturedSections ? (
            <>
              <section className="work-results__group" aria-labelledby="representative-works-title">
                <div className="work-results__heading">
                  <h3 id="representative-works-title">代表作</h3>
                  <p>まず見てほしい作品</p>
                </div>
                <ul className="work-card-grid work-card-grid--featured" aria-label="代表作一覧">
                  {representativeWorks.map((work) => (
                    <li key={work.id}>
                      <WorkCard work={work} />
                    </li>
                  ))}
                </ul>
              </section>
              <section className="work-results__group work-results__group--archive" aria-labelledby="archive-works-title">
                <div className="work-results__heading">
                  <h3 id="archive-works-title">アーカイブ</h3>
                  <p>これまでの制作記録</p>
                </div>
                <ul className="work-card-grid" aria-label="アーカイブ一覧">
                  {archiveWorks.map((work) => (
                    <li key={work.id}>
                      <WorkCard work={work} />
                    </li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <ul className="work-card-grid work-results__standard" aria-label="制作一覧">
              {sortedWorks.map((work) => (
                <li key={work.id}>
                  <WorkCard work={work} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

function sortWorks(works: readonly Work[], sort: WorkSort): Work[] {
  return [...works].sort((left, right) => {
    if (sort === 'featured') {
      if (left.featuredOrder !== null && right.featuredOrder !== null) {
        return left.featuredOrder - right.featuredOrder
      }
      if (left.featuredOrder !== null) return -1
      if (right.featuredOrder !== null) return 1
    }

    const direction = sort === 'oldest' ? 1 : -1
    return getWorkDateKey(left).localeCompare(getWorkDateKey(right)) * direction
  })
}

function getWorkDateKey(work: Work): string {
  if (work.firstPublishedAt) return work.firstPublishedAt
  return work.period?.match(/\d{4}/)?.[0] ?? '0000'
}

function countWorks(works: readonly Work[], category: WorkCategory): number {
  return works.reduce((count, work) => count + Number(work.category === category), 0)
}
