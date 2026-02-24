import { useRequests, type RequestItem } from '@/entities/request/model'
import { useCurrentUser } from '@/entities/user'
import type { RequestStatusFilterValue } from '@/features/request-filters/model/request-filter-status'
import {
  groupRequestsByDate,
  type RequestsDateGroup,
} from '@/widgets/requests-table/model/group-requests-by-date'
import { useCallback, useEffect, useMemo, useState } from 'react'

const FILTERS_APPLY_DELAY_MS = 350

export type RequestsTableFilters = {
  status: RequestStatusFilterValue
  onlyMine: boolean
  search: string
}

export type UseRequestsTableViewModelResult = {
  requests: RequestItem[]
  groupedRequests: RequestsDateGroup[]
  isLoading: boolean
  error: string | null
  hasSourceData: boolean
  hasFilteredData: boolean
  reload: () => Promise<void>
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

export function useRequestsTableViewModel(
  filters: RequestsTableFilters,
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
  const [appliedFilters, setAppliedFilters] = useState<RequestsTableFilters>(() => filters)

  const currentFiltersKey = useMemo(() => {
    return `${filters.status}|${filters.onlyMine ? '1' : '0'}|${filters.search.trim()}`
  }, [filters.onlyMine, filters.search, filters.status])

  const appliedFiltersKey = useMemo(() => {
    return `${appliedFilters.status}|${appliedFilters.onlyMine ? '1' : '0'}|${appliedFilters.search.trim()}`
  }, [appliedFilters.onlyMine, appliedFilters.search, appliedFilters.status])

  useEffect(() => {
    if (appliedFiltersKey === currentFiltersKey) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setAppliedFilters({
        status: filters.status,
        onlyMine: filters.onlyMine,
        search: filters.search,
      })
    }, FILTERS_APPLY_DELAY_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [appliedFiltersKey, currentFiltersKey, filters.onlyMine, filters.search, filters.status])

  const sortedRequests = sortByCreatedAtDesc(requests)
  const statusFilteredRequests = filterByStatus(sortedRequests, appliedFilters.status)
  const onlyMineFilteredRequests = filterOnlyMine(
    statusFilteredRequests,
    appliedFilters.onlyMine,
    currentUser?.displayName ?? null,
  )
  const searchFilteredRequests = filterBySearch(onlyMineFilteredRequests, appliedFilters.search)
  const groupedRequests = groupRequestsByDate(searchFilteredRequests)

  const isFiltersApplying = appliedFiltersKey !== currentFiltersKey
  const isLoading =
    isRequestsLoading || (appliedFilters.onlyMine && isCurrentUserLoading) || isFiltersApplying
  const error = requestsError ?? (appliedFilters.onlyMine ? currentUserError : null)

  const reload = useCallback(async () => {
    await Promise.all([reloadRequests(), reloadCurrentUser()])
  }, [reloadCurrentUser, reloadRequests])

  return {
    requests: searchFilteredRequests,
    groupedRequests,
    isLoading,
    error,
    hasSourceData: sortedRequests.length > 0,
    hasFilteredData: searchFilteredRequests.length > 0,
    reload,
  }
}
