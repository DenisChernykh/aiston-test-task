import type { RequestItem, RequestPriority, RequestStatus } from '@/entities/request/model'

export type RequestTableSortableColumn = 'createdAt' | 'priority' | 'status'
export type RequestTableSortDirection = 'asc' | 'desc'
export type RequestTableSortState = {
  column: RequestTableSortableColumn
  direction: RequestTableSortDirection
} | null

export function getNextSortState(
  prevSortState: RequestTableSortState,
  column: RequestTableSortableColumn,
): NonNullable<RequestTableSortState> {
  if (!prevSortState || prevSortState.column !== column) {
    return {
      column,
      direction: 'asc',
    }
  }

  return {
    column,
    direction: prevSortState.direction === 'asc' ? 'desc' : 'asc',
  }
}

const PRIORITY_SORT_RANK: Record<RequestPriority, number> = {
  low: 0,
  medium: 1,
  high: 2,
  critical: 3,
}

const STATUS_SORT_RANK: Record<RequestStatus, number> = {
  new: 0,
  onReview: 1,
  inProgress: 2,
  awaitingParts: 3,
  ready: 4,
  paused: 5,
  rejected: 6,
  closed: 7,
}

function getCreatedAtTimestamp(createdAt: string): number {
  const timestamp = Date.parse(createdAt)

  if (Number.isNaN(timestamp)) {
    return 0
  }

  return timestamp
}

function getSortDirectionFactor(direction: RequestTableSortDirection): 1 | -1 {
  return direction === 'asc' ? 1 : -1
}

function compareByColumn(
  left: RequestItem,
  right: RequestItem,
  sortState: NonNullable<RequestTableSortState>,
): number {
  const directionFactor = getSortDirectionFactor(sortState.direction)

  if (sortState.column === 'createdAt') {
    const leftValue = getCreatedAtTimestamp(left.createdAt)
    const rightValue = getCreatedAtTimestamp(right.createdAt)
    return (leftValue - rightValue) * directionFactor
  }

  if (sortState.column === 'priority') {
    const leftValue = PRIORITY_SORT_RANK[left.priority]
    const rightValue = PRIORITY_SORT_RANK[right.priority]
    return (leftValue - rightValue) * directionFactor
  }

  const leftValue = STATUS_SORT_RANK[left.status]
  const rightValue = STATUS_SORT_RANK[right.status]
  return (leftValue - rightValue) * directionFactor
}

function compareByBackendTieBreaker(left: RequestItem, right: RequestItem): number {
  const createdAtDiff = getCreatedAtTimestamp(right.createdAt) - getCreatedAtTimestamp(left.createdAt)

  if (createdAtDiff !== 0) {
    return createdAtDiff
  }

  return left.id.localeCompare(right.id, 'ru')
}

export function sortRequests(items: RequestItem[], sortState: RequestTableSortState): RequestItem[] {
  if (!sortState) {
    return items
  }

  return [...items].sort((left, right) => {
    const primaryComparison = compareByColumn(left, right, sortState)

    if (primaryComparison !== 0) {
      return primaryComparison
    }

    return compareByBackendTieBreaker(left, right)
  })
}
