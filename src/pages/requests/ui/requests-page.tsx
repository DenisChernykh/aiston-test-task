import { exportRequestsToCsv } from '@/features/request-actions'
import {
  DEFAULT_REQUEST_STATUS_FILTER,
  type RequestStatusFilterValue,
} from '@/features/request-filters'
import { toaster } from '@/shared/ui/toaster'
import { Header } from '@/widgets/header'
import { RequestsTable } from '@/widgets/requests-table'
import {
  createEmptyRequestTableColumnFilters,
  type RequestTableColumnFilters,
} from '@/widgets/requests-table/model/request-table-column-filters'
import { useRequestsTableViewModel } from '@/widgets/requests-table/model/use-requests-table-view-model'
import { RequestsToolbar } from '@/widgets/requests-toolbar'
import { Box, VStack, useBreakpointValue } from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'

export function RequestsPage() {
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

  const visibleRows = useMemo(() => {
    if (isDesktop) {
      return requests
    }

    return groupedRequests.flatMap((group) => group.items)
  }, [groupedRequests, isDesktop, requests])
  const exportRows = useMemo(() => {
    if (isLoading || isRowsApplying) {
      return []
    }

    return visibleRows
  }, [isLoading, isRowsApplying, visibleRows])

  const handleExportClick = useCallback(() => {
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
  }, [exportRows])

  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: '130', md: '0' }}>
      <Header />
      <VStack align="stretch" gap={{ base: '12', md: '0' }}>
        <RequestsToolbar
          searchValue={searchValue}
          statusFilter={statusFilter}
          onlyMine={onlyMine}
          onExportClick={handleExportClick}
          isExportDisabled={exportRows.length === 0}
          onSearchChange={setSearchValue}
          onStatusChange={setStatusFilter}
          onOnlyMineChange={setOnlyMine}
        />
        <Box display={{ base: 'none', md: 'block' }} h="1px" bg="border.subtle" />
        <Box mt={{ base: '0', md: '31px' }}>
          <RequestsTable
            requests={requests}
            groupedRequests={groupedRequests}
            columnFilters={columnFilters}
            columnFilterOptions={columnFilterOptions}
            sortState={sortState}
            isLoading={isLoading}
            isRowsApplying={isRowsApplying}
            error={error}
            hasSourceData={hasSourceData}
            hasFilteredData={hasFilteredData}
            onSortChange={onSortChange}
            onColumnFiltersChange={setColumnFilters}
            onRetry={() => void reload()}
            onResetFilters={resetFilters}
          />
        </Box>
      </VStack>
    </Box>
  )
}
