import { exportRequestsToCsv } from '@/features/request-actions'
import {
  DEFAULT_REQUEST_STATUS_FILTER,
  type RequestStatusFilterValue,
} from '@/features/request-filters'
import { toaster } from '@/shared/ui/toaster'
import { type RequestsTableProps } from '@/widgets/requests-table'
import {
  createEmptyRequestTableColumnFilters,
  type RequestTableColumnFilters,
} from '@/widgets/requests-table/model/request-table-column-filters'
import { useRequestsTableViewModel } from '@/widgets/requests-table/model/use-requests-table-view-model'
import { type RequestsToolbarProps } from '@/widgets/requests-toolbar'
import { useBreakpointValue } from '@chakra-ui/react'
import { useState } from 'react'

export type UseRequestsPageControllerResult = {
  toolbarProps: RequestsToolbarProps
  tableProps: RequestsTableProps
}

export function useRequestsPageController(): UseRequestsPageControllerResult {
  const [statusFilter, setStatusFilter] = useState<RequestStatusFilterValue>(
    DEFAULT_REQUEST_STATUS_FILTER,
  )
  const [onlyMine, setOnlyMine] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [columnFilters, setColumnFilters] = useState<RequestTableColumnFilters>(() =>
    createEmptyRequestTableColumnFilters(),
  )
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
  } = useRequestsTableViewModel(
    {
      status: statusFilter,
      onlyMine,
      search: searchValue,
    },
    columnFilters,
  )

  function resetFilters() {
    setStatusFilter(DEFAULT_REQUEST_STATUS_FILTER)
    setOnlyMine(false)
    setSearchValue('')
    setColumnFilters(createEmptyRequestTableColumnFilters())
  }

  const visibleRows = isDesktop ? requests : groupedRequests.flatMap((group) => group.items)
  const exportRows = isLoading || isRowsApplying ? [] : visibleRows

  function handleExportClick() {
    if (exportRows.length === 0) {
      toaster.success({
        title: 'Нечего экспортировать',
        description: 'По текущим фильтрам нет заявок',
        closable: true,
      })
      return
    }

    const result = exportRequestsToCsv(exportRows)

    toaster.success({
      title: 'Экспорт завершен',
      description: `Файл ${result.fileName}, строк: ${result.count}`,
      closable: true,
    })
  }

  function handleRetry() {
    void reload()
  }

  return {
    toolbarProps: {
      searchValue,
      statusFilter,
      onlyMine,
      onExportClick: handleExportClick,
      isExportDisabled: exportRows.length === 0,
      onSearchChange: setSearchValue,
      onStatusChange: setStatusFilter,
      onOnlyMineChange: setOnlyMine,
    },
    tableProps: {
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
      onColumnFiltersChange: setColumnFilters,
      onRetry: handleRetry,
      onResetFilters: resetFilters,
    },
  }
}
