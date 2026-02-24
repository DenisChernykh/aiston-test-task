import { useRequests, type RequestItem } from '@/entities/request/model'
import {
  groupRequestsByDate,
  type RequestsDateGroup,
} from '@/widgets/requests-table/model/group-requests-by-date'

export type UseRequestsTableViewModelResult = {
  requests: RequestItem[]
  groupedRequests: RequestsDateGroup[]
  isLoading: boolean
  error: string | null
  hasData: boolean
  reload: () => Promise<void>
}

function sortByCreatedAtDesc(items: RequestItem[]): RequestItem[] {
  return [...items].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export function useRequestsTableViewModel(): UseRequestsTableViewModelResult {
  const { requests, isLoading, error, reload } = useRequests()

  const sortedRequests = sortByCreatedAtDesc(requests)
  const groupedRequests = groupRequestsByDate(sortedRequests)

  return {
    requests: sortedRequests,
    groupedRequests,
    isLoading,
    error,
    hasData: sortedRequests.length > 0,
    reload,
  }
}
