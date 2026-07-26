import type { Work } from './types'

const yearPattern = /\d{4}/

const workModules = import.meta.glob<Work>(['./works/*.ts', '!./works/*.test.ts'], {
  eager: true,
  import: 'default',
})

function getSortYear(work: Work): number {
  const firstPublishedYear = work.firstPublishedAt?.match(yearPattern)?.[0]
  if (firstPublishedYear) return Number(firstPublishedYear)

  const periodYear = work.period?.match(yearPattern)?.[0]
  return periodYear ? Number(periodYear) : 0
}

function compareByPublishedDate(left: Work, right: Work): number {
  const yearDifference = getSortYear(right) - getSortYear(left)
  if (yearDifference !== 0) return yearDifference

  const dateDifference = (right.firstPublishedAt ?? '').localeCompare(left.firstPublishedAt ?? '')
  if (dateDifference !== 0) return dateDifference

  if (left.slug < right.slug) return -1
  if (left.slug > right.slug) return 1
  return 0
}

export const works: readonly Work[] = [...Object.values(workModules)].sort(compareByPublishedDate)
