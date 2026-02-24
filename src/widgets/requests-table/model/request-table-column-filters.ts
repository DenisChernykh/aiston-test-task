import type { RequestItem, RequestPriority } from '@/entities/request/model'

export type RequestTableFilterableColumn = 'priority' | 'category' | 'technician'

export const NO_TECHNICIAN_FILTER_VALUE = '__none__'

export type RequestTableColumnFilters = {
  priority: RequestPriority[]
  category: string[]
  technician: string[]
}

export type RequestTableColumnFilterOptions = {
  priority: RequestPriority[]
  category: string[]
  technician: string[]
  hasRequestsWithoutTechnician: boolean
}

const PRIORITY_FILTER_ORDER: RequestPriority[] = ['critical', 'high', 'medium', 'low']

function sortByRuLocale(left: string, right: string): number {
  return left.localeCompare(right, 'ru')
}

function getUniqueSortedValues(values: string[]): string[] {
  return [...new Set(values)].sort(sortByRuLocale)
}

function hasNoColumnFilters(columnFilters: RequestTableColumnFilters): boolean {
  return (
    columnFilters.priority.length === 0 &&
    columnFilters.category.length === 0 &&
    columnFilters.technician.length === 0
  )
}

export function createEmptyRequestTableColumnFilters(): RequestTableColumnFilters {
  return {
    priority: [],
    category: [],
    technician: [],
  }
}

export function applyRequestTableColumnFilters(
  items: RequestItem[],
  columnFilters: RequestTableColumnFilters,
): RequestItem[] {
  if (hasNoColumnFilters(columnFilters)) {
    return items
  }

  return items.filter((item) => {
    const priorityMatches =
      columnFilters.priority.length === 0 || columnFilters.priority.includes(item.priority)
    const categoryMatches =
      columnFilters.category.length === 0 || columnFilters.category.includes(item.category)
    const technicianMatches =
      columnFilters.technician.length === 0 ||
      (item.technician === null
        ? columnFilters.technician.includes(NO_TECHNICIAN_FILTER_VALUE)
        : columnFilters.technician.includes(item.technician))

    return priorityMatches && categoryMatches && technicianMatches
  })
}

export function buildRequestTableColumnFilterOptions(
  items: RequestItem[],
): RequestTableColumnFilterOptions {
  const prioritiesInData = new Set(items.map((item) => item.priority))
  const categoryValues = getUniqueSortedValues(items.map((item) => item.category))
  const technicianValues = getUniqueSortedValues(
    items
      .map((item) => item.technician)
      .filter((technician): technician is string => technician !== null),
  )

  return {
    priority: PRIORITY_FILTER_ORDER.filter((priority) => prioritiesInData.has(priority)),
    category: categoryValues,
    technician: technicianValues,
    hasRequestsWithoutTechnician: items.some((item) => item.technician === null),
  }
}
