import { useEffect, useState } from 'react'
import { categoryLabels, workCategoryOrder } from '../app/presentation'
import type { Work, WorkCategory } from '../content/types'
import { WorkCard } from './WorkCard'

type WorkFilter = 'all' | WorkCategory

const filterOptions: readonly WorkFilter[] = ['all', ...workCategoryOrder]

interface WorkIndexProps {
  works: readonly Work[]
}

export function WorkIndex({ works }: WorkIndexProps) {
  const [selectedCategory, setSelectedCategory] = useState<WorkFilter>('all')

  useEffect(() => {
    const syncFromLocation = () => {
      const value = new URLSearchParams(window.location.search).get('category')
      const isKnownCategory = workCategoryOrder.includes(value as WorkCategory)

      if (value !== null && !isKnownCategory) {
        const normalizedUrl = new URL(window.location.href)
        normalizedUrl.searchParams.delete('category')
        window.history.replaceState(
          {},
          '',
          `${normalizedUrl.pathname}${normalizedUrl.search}${normalizedUrl.hash}`,
        )
      }

      setSelectedCategory(isKnownCategory ? (value as WorkCategory) : 'all')
    }

    syncFromLocation()
    window.addEventListener('popstate', syncFromLocation)
    return () => window.removeEventListener('popstate', syncFromLocation)
  }, [])

  const filteredWorks =
    selectedCategory === 'all' ? works : works.filter((work) => work.category === selectedCategory)

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
        <ul className="work-card-grid" id="work-results" aria-label="制作一覧">
          {filteredWorks.map((work) => (
            <li key={work.id}>
              <WorkCard work={work} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function countWorks(works: readonly Work[], category: WorkCategory): number {
  return works.reduce((count, work) => count + Number(work.category === category), 0)
}
