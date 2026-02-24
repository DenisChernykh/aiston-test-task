import type { RequestItem } from '@/entities/request/model'
import type {
  RequestTableColumnFilterOptions,
  RequestTableColumnFilters,
} from '@/widgets/requests-table/model/request-table-column-filters'
import type { RequestsDateGroup } from '@/widgets/requests-table/model/group-requests-by-date'
import type {
  RequestTableSortState,
  RequestTableSortableColumn,
} from '@/widgets/requests-table/model/request-table-sorting'
import { RequestsTableDesktop } from '@/widgets/requests-table/ui/requests-table.desktop'
import { RequestsTableEmpty } from '@/widgets/requests-table/ui/requests-table.empty'
import { RequestsTableError } from '@/widgets/requests-table/ui/requests-table.error'
import { RequestsTableLoading } from '@/widgets/requests-table/ui/requests-table.loading'
import { RequestsTableMobile } from '@/widgets/requests-table/ui/requests-table.mobile'
import { useBreakpointValue } from '@chakra-ui/react'

export type RequestsTableProps = {
  requests: RequestItem[]
  groupedRequests: RequestsDateGroup[]
  columnFilters: RequestTableColumnFilters
  columnFilterOptions: RequestTableColumnFilterOptions
  sortState: RequestTableSortState
  isLoading: boolean
  isRowsApplying: boolean
  error: string | null
  hasSourceData: boolean
  hasFilteredData: boolean
  onSortChange: (column: RequestTableSortableColumn) => void
  onColumnFiltersChange: (value: RequestTableColumnFilters) => void
  onRetry: () => void
  onResetFilters: () => void
}

export function RequestsTable({
  requests,
  groupedRequests,
  columnFilters,
  columnFilterOptions,
  sortState,
  isLoading,
  isRowsApplying,
  error,
  hasSourceData,
  hasFilteredData,
  onSortChange,
  onColumnFiltersChange,
  onRetry,
  onResetFilters,
}: RequestsTableProps) {
  const isDesktop = useBreakpointValue({ base: false, md: true }) ?? false

  if (isLoading) {
    return <RequestsTableLoading />
  }

  if (error) {
    return <RequestsTableError message={error} onRetry={onRetry} />
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
