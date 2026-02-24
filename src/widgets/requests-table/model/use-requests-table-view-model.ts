import { useRequests, type RequestItem } from '@/entities/request/model'
import { useCurrentUser } from '@/entities/user'
import type { RequestStatusFilterValue } from '@/features/request-filters/model/request-filter-status'
import { waitWithDelay } from '@/shared/lib/fake-api'
import {
  applyRequestTableColumnFilters,
  buildRequestTableColumnFilterOptions,
  type RequestTableColumnFilterOptions,
  type RequestTableColumnFilters,
} from '@/widgets/requests-table/model/request-table-column-filters'
import {
  groupRequestsByDate,
  type RequestsDateGroup,
} from '@/widgets/requests-table/model/group-requests-by-date'
import {
  getNextSortState,
  sortRequests,
  type RequestTableSortState,
  type RequestTableSortableColumn,
} from '@/widgets/requests-table/model/request-table-sorting'
import { useEffect, useRef, useState } from 'react'

const APPLY_DELAY_MS = 220

export type RequestsTableFilters = {
  status: RequestStatusFilterValue
  onlyMine: boolean
  search: string
}

export type UseRequestsTableViewModelResult = {
  requests: RequestItem[]
  groupedRequests: RequestsDateGroup[]
  columnFilterOptions: RequestTableColumnFilterOptions
  isLoading: boolean
  isRowsApplying: boolean
  sortState: RequestTableSortState
  onSortChange: (column: RequestTableSortableColumn) => void
  error: string | null
  hasSourceData: boolean
  hasFilteredData: boolean
  reload: () => Promise<void>
}

type AppliedTableState = {
  filters: RequestsTableFilters
  columnFilters: RequestTableColumnFilters
  sortState: RequestTableSortState
}

function sortByCreatedAtDesc(items: RequestItem[]): RequestItem[] {
  return [...items].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

function filterByStatus(items: RequestItem[], status: RequestStatusFilterValue): RequestItem[] {
  if (status === 'all') {
    return items
  }

  return items.filter((item) => item.status === status)
}

function filterOnlyMine(
  items: RequestItem[],
  onlyMine: boolean,
  currentUserName: string | null,
): RequestItem[] {
  if (!onlyMine) {
    return items
  }

  if (!currentUserName) {
    return []
  }

  return items.filter((item) => item.technician === currentUserName)
}

function filterBySearch(items: RequestItem[], search: string): RequestItem[] {
  const normalizedSearch = search.trim().toLowerCase()

  if (!normalizedSearch) {
    return items
  }

  return items.filter((item) => {
    return (
      item.number.toLowerCase().includes(normalizedSearch) ||
      item.topic.toLowerCase().includes(normalizedSearch)
    )
  })
}

function serializeFilters(filters: RequestsTableFilters): string {
  return `${filters.status}|${filters.onlyMine ? '1' : '0'}|${filters.search.trim()}`
}

function serializeColumnFilters(columnFilters: RequestTableColumnFilters): string {
  const serializedPriority = [...new Set(columnFilters.priority)].join(',')
  const serializedCategory = [...new Set(columnFilters.category)]
    .sort((left, right) => left.localeCompare(right, 'ru'))
    .join(',')
  const serializedTechnician = [...new Set(columnFilters.technician)]
    .sort((left, right) => left.localeCompare(right, 'ru'))
    .join(',')

  return `${serializedPriority}|${serializedCategory}|${serializedTechnician}`
}

function serializeSort(sortState: RequestTableSortState): string {
  if (!sortState) {
    return 'none'
  }

  return `${sortState.column}|${sortState.direction}`
}

function getTableStateKey(state: AppliedTableState): string {
  return `${serializeFilters(state.filters)}|${serializeColumnFilters(state.columnFilters)}|${serializeSort(state.sortState)}`
}

function cloneFilters(filters: RequestsTableFilters): RequestsTableFilters {
  return {
    status: filters.status,
    onlyMine: filters.onlyMine,
    search: filters.search,
  }
}

function cloneColumnFilters(columnFilters: RequestTableColumnFilters): RequestTableColumnFilters {
  return {
    priority: [...columnFilters.priority],
    category: [...columnFilters.category],
    technician: [...columnFilters.technician],
  }
}

function cloneSortState(sortState: RequestTableSortState): RequestTableSortState {
  if (!sortState) {
    return null
  }

  return {
    column: sortState.column,
    direction: sortState.direction,
  }
}

export function useRequestsTableViewModel(
  filters: RequestsTableFilters,
  columnFilters: RequestTableColumnFilters,
): UseRequestsTableViewModelResult {
  const {
    requests,
    isLoading: isRequestsLoading,
    error: requestsError,
    reload: reloadRequests,
  } = useRequests()
  const {
    data: currentUser,
    isLoading: isCurrentUserLoading,
    error: currentUserError,
    reload: reloadCurrentUser,
  } = useCurrentUser()
  const [sortState, setSortState] = useState<RequestTableSortState>(null)
  const [appliedState, setAppliedState] = useState<AppliedTableState>(() => ({
    filters: cloneFilters(filters),
    columnFilters: cloneColumnFilters(columnFilters),
    sortState: null,
  }))

  const applySequenceRef = useRef(0)
  const { status, onlyMine, search } = filters
  const {
    priority: priorityColumnFilters,
    category: categoryColumnFilters,
    technician: technicianColumnFilters,
  } = columnFilters

  const desiredKey = getTableStateKey({
    filters: {
      status,
      onlyMine,
      search,
    },
    columnFilters: {
      priority: [...priorityColumnFilters],
      category: [...categoryColumnFilters],
      technician: [...technicianColumnFilters],
    },
    sortState: cloneSortState(sortState),
  })
  const appliedKey = getTableStateKey(appliedState)

  function onSortChange(column: RequestTableSortableColumn) {
    setSortState((prevSortState) => getNextSortState(prevSortState, column))
  }

  useEffect(() => {
    if (appliedKey === desiredKey) {
      return
    }

    const applySequence = ++applySequenceRef.current
    let isCancelled = false
    const desiredStateSnapshot = {
      filters: {
        status,
        onlyMine,
        search,
      },
      columnFilters: {
        priority: [...priorityColumnFilters],
        category: [...categoryColumnFilters],
        technician: [...technicianColumnFilters],
      },
      sortState: cloneSortState(sortState),
    }

    const applyState = async () => {
      await waitWithDelay(APPLY_DELAY_MS)

      if (isCancelled || applySequenceRef.current !== applySequence) {
        return
      }

      setAppliedState(desiredStateSnapshot)
    }

    void applyState()

    return () => {
      isCancelled = true
    }
  }, [
    appliedKey,
    categoryColumnFilters,
    desiredKey,
    onlyMine,
    priorityColumnFilters,
    search,
    sortState,
    status,
    technicianColumnFilters,
  ])

  const sortedByCreatedAtRequests = sortByCreatedAtDesc(requests)
  const statusFilteredRequests = filterByStatus(sortedByCreatedAtRequests, appliedState.filters.status)
  const onlyMineFilteredRequests = filterOnlyMine(
    statusFilteredRequests,
    appliedState.filters.onlyMine,
    currentUser?.displayName ?? null,
  )
  const searchFilteredRequests = filterBySearch(onlyMineFilteredRequests, appliedState.filters.search)
  const columnFilterOptions = buildRequestTableColumnFilterOptions(searchFilteredRequests)
  const columnFilteredRequests = applyRequestTableColumnFilters(
    searchFilteredRequests,
    appliedState.columnFilters,
  )
  const desktopSortedRequests = sortRequests(columnFilteredRequests, appliedState.sortState)
  const groupedRequests = groupRequestsByDate(columnFilteredRequests)

  const isLoading = isRequestsLoading || (appliedState.filters.onlyMine && isCurrentUserLoading)
  const isRowsApplying = !isLoading && appliedKey !== desiredKey
  const error = requestsError ?? (appliedState.filters.onlyMine ? currentUserError : null)

  async function reload() {
    await Promise.all([reloadRequests(), reloadCurrentUser()])
  }

  return {
    requests: desktopSortedRequests,
    groupedRequests,
    columnFilterOptions,
    isLoading,
    isRowsApplying,
    sortState,
    onSortChange,
    error,
    hasSourceData: sortedByCreatedAtRequests.length > 0,
    hasFilteredData: columnFilteredRequests.length > 0,
    reload,
  }
}
