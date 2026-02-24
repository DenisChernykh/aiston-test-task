import type { RequestItem } from '@/entities/request/model'
import type { RequestTableColumnFilters } from '@/widgets/requests-table/model/request-table-column-filters'
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
  columnFilters: RequestTableColumnFilters
  onColumnFiltersChange: (value: RequestTableColumnFilters) => void
  onResetFilters: () => void
  onVisibleRequestsChange?: (rows: RequestItem[]) => void
}

export function RequestsTable({
  filters,
  columnFilters,
  onColumnFiltersChange,
  onResetFilters,
  onVisibleRequestsChange,
}: RequestsTableProps) {
  const isDesktop = useBreakpointValue({ base: false, md: true }) ?? false
  const {
    requests,
    groupedRequests,
    columnFilterOptions,
    isLoading,
    isRowsApplying,
    sortState,
    onSortChange,
    error,
    hasSourceData,
    hasFilteredData,
    reload,
  } = useRequestsTableViewModel(filters, columnFilters)
  const visibleRows = isDesktop ? requests : groupedRequests.flatMap((group) => group.items)

  useEffect(() => {
    if (!onVisibleRequestsChange || isLoading || isRowsApplying) {
      return
    }

    onVisibleRequestsChange(visibleRows)
  }, [isLoading, isRowsApplying, onVisibleRequestsChange, visibleRows])

  if (isLoading) {
    return <RequestsTableLoading />
  }

  if (error) {
    return <RequestsTableError message={error} onRetry={() => void reload()} />
  }

  if (!hasSourceData) {
    return <RequestsTableEmpty mode="noData" />
  }

  if (isRowsApplying) {
    if (!isDesktop) {
      return <RequestsTableMobile groups={groupedRequests} isRowsLoading />
    }

    return (
      <RequestsTableDesktop
        requests={requests}
        sortState={sortState}
        isRowsLoading
        onSortChange={onSortChange}
        columnFilters={columnFilters}
        filterOptions={columnFilterOptions}
        onColumnFiltersChange={onColumnFiltersChange}
      />
    )
  }

  if (!hasFilteredData) {
    return <RequestsTableEmpty mode="noMatches" onResetFilters={onResetFilters} />
  }

  if (isDesktop) {
    return (
      <RequestsTableDesktop
        requests={requests}
        sortState={sortState}
        isRowsLoading={false}
        onSortChange={onSortChange}
        columnFilters={columnFilters}
        filterOptions={columnFilterOptions}
        onColumnFiltersChange={onColumnFiltersChange}
      />
    )
  }

  return <RequestsTableMobile groups={groupedRequests} />
}
