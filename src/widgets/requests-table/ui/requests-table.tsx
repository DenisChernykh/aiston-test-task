import type { RequestItem } from '@/entities/request/model'
import {
  sortRequests,
  type RequestTableSortableColumn,
  type RequestTableSortState,
} from '@/widgets/requests-table/model/request-table-sorting'
import {
  type RequestsTableFilters,
  useRequestsTableViewModel,
} from '@/widgets/requests-table/model/use-requests-table-view-model'
import { RequestsTableDesktop } from '@/widgets/requests-table/ui/requests-table.desktop'
import { RequestsTableEmpty } from '@/widgets/requests-table/ui/requests-table.empty'
import { RequestsTableError } from '@/widgets/requests-table/ui/requests-table.error'
import { RequestsTableLoading } from '@/widgets/requests-table/ui/requests-table.loading'
import { RequestsTableMobile } from '@/widgets/requests-table/ui/requests-table.mobile'
import { useBreakpointValue } from '@chakra-ui/react'
import { useEffect } from 'react'

export type RequestsTableProps = {
  filters: RequestsTableFilters
  sortState: RequestTableSortState
  isSortApplying?: boolean
  onSortChange: (column: RequestTableSortableColumn) => void
  onResetFilters: () => void
  onVisibleRequestsChange?: (rows: RequestItem[]) => void
}

export function RequestsTable({
  filters,
  sortState,
  isSortApplying = false,
  onSortChange,
  onResetFilters,
  onVisibleRequestsChange,
}: RequestsTableProps) {
  const isDesktop = useBreakpointValue({ base: false, md: true }) ?? false
  const {
    requests,
    groupedRequests,
    isLoading,
    isFiltersApplying,
    error,
    hasSourceData,
    hasFilteredData,
    reload,
  } = useRequestsTableViewModel(filters)
  const desktopRows = isDesktop ? sortRequests(requests, sortState) : requests
  const visibleRows = isDesktop ? desktopRows : requests
  const isRowsLoading = isDesktop && (isSortApplying || isFiltersApplying)

  useEffect(() => {
    if (!onVisibleRequestsChange || isLoading || isRowsLoading) {
      return
    }

    onVisibleRequestsChange(visibleRows)
  }, [isLoading, isRowsLoading, onVisibleRequestsChange, visibleRows])

  if (isLoading) {
    return <RequestsTableLoading />
  }

  if (error) {
    return <RequestsTableError message={error} onRetry={() => void reload()} />
  }

  if (!hasSourceData) {
    return <RequestsTableEmpty mode="noData" />
  }

  if (isRowsLoading) {
    return (
      <RequestsTableDesktop
        requests={desktopRows}
        sortState={sortState}
        isRowsLoading
        onSortChange={onSortChange}
      />
    )
  }

  if (!hasFilteredData) {
    return <RequestsTableEmpty mode="noMatches" onResetFilters={onResetFilters} />
  }

  if (isDesktop) {
    return (
      <RequestsTableDesktop
        requests={desktopRows}
        sortState={sortState}
        isRowsLoading={isRowsLoading}
        onSortChange={onSortChange}
      />
    )
  }

  return <RequestsTableMobile groups={groupedRequests} />
}
