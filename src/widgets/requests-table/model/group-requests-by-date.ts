import type { RequestItem } from '@/entities/request/model'
import { compareDesc, differenceInCalendarDays, format, parseISO, startOfDay } from 'date-fns'
import { MONTHS_RU_PREPOSITIONAL } from './months-ru-prepositional'

export type RequestsDateGroup = {
  key: string
  label: string
  items: RequestItem[]
}

function getLabel(date: Date, now: Date): string {
  const diff = differenceInCalendarDays(startOfDay(now), startOfDay(date))

  if (diff === 0) return 'сегодня'
  if (diff === 1) return 'вчера'

  const month = MONTHS_RU_PREPOSITIONAL[date.getMonth()]
  const year = format(date, 'yyyy')
  return `в ${month} ${year}`
}

export function groupRequestsByDate(
  items: RequestItem[],
  nowDate = new Date(),
): RequestsDateGroup[] {
  const groupsMap = new Map<string, RequestsDateGroup>()

  const sorted = [...items]
    .map((item) => ({ item, date: parseISO(item.createdAt) }))
    .sort((a, b) => compareDesc(a.date, b.date))

  for (const { item, date } of sorted) {
    const label = getLabel(date, nowDate)
    const bucketKey =
      label === 'сегодня' || label === 'вчера' ? label : `month:${format(date, 'yyyy-MM')}`

    if (!groupsMap.has(bucketKey)) {
      groupsMap.set(bucketKey, { key: bucketKey, label, items: [] })
    }

    groupsMap.get(bucketKey)!.items.push(item)
  }

  return [...groupsMap.values()]
}
