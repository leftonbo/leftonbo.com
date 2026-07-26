export function formatJapaneseDate(date: string): string {
  const parsedDate = new Date(`${date}T00:00:00Z`)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat('ja-JP', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(parsedDate)
}
