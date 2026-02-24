import type { RequestItem } from '@/entities/request/model'
import { exportRequestsToCsv } from '@/features/request-actions'
import {
  DEFAULT_REQUEST_STATUS_FILTER,
  type RequestStatusFilterValue,
} from '@/features/request-filters'
import { toaster } from '@/shared/ui/toaster'
import { Header } from '@/widgets/header'
import { RequestsTable } from '@/widgets/requests-table'
import type {
  RequestTableSortableColumn,
  RequestTableSortState,
} from '@/widgets/requests-table/model/request-table-sorting'
import { RequestsToolbar } from '@/widgets/requests-toolbar'
import { Box, VStack } from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'

const SORT_BACKEND_DELAY_MS = 220

export function RequestsPage() {
  const [statusFilter, setStatusFilter] = useState<RequestStatusFilterValue>(
    DEFAULT_REQUEST_STATUS_FILTER,
  )
  const [onlyMine, setOnlyMine] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [sortState, setSortState] = useState<RequestTableSortState>(null)
  const [isSortApplying, setIsSortApplying] = useState(false)
  const [visibleRequests, setVisibleRequests] = useState<RequestItem[]>([])
  const sortTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (sortTimeoutRef.current !== null) {
        window.clearTimeout(sortTimeoutRef.current)
      }
    }
  }, [])

  function resetFilters() {
    setStatusFilter(DEFAULT_REQUEST_STATUS_FILTER)
    setOnlyMine(false)
    setSearchValue('')
  }

  const handleVisibleRequestsChange = useCallback((nextRows: RequestItem[]) => {
    setVisibleRequests((prevRows) => {
      const isSame =
        prevRows.length === nextRows.length &&
        prevRows.every((row, index) => row.id === nextRows[index]?.id)

      if (isSame) {
        return prevRows
      }

      return nextRows
    })
  }, [])

  const handleSortChange = useCallback((column: RequestTableSortableColumn) => {
    const nextSortState = ((prevSortState: RequestTableSortState): NonNullable<RequestTableSortState> => {
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
    })(sortState)

    setIsSortApplying(true)

    if (sortTimeoutRef.current !== null) {
      window.clearTimeout(sortTimeoutRef.current)
    }

    sortTimeoutRef.current = window.setTimeout(() => {
      setSortState(nextSortState)
      setIsSortApplying(false)
    }, SORT_BACKEND_DELAY_MS)
  }, [sortState])

  const handleExportClick = useCallback(() => {
    if (visibleRequests.length === 0) {
      toaster.success({
        title: 'Нечего экспортировать',
        description: 'По текущим фильтрам нет заявок',
        closable: true,
      })
      return
    }

    const result = exportRequestsToCsv(visibleRequests)

    toaster.success({
      title: 'Экспорт завершен',
      description: `Файл ${result.fileName}, строк: ${result.count}`,
      closable: true,
    })
  }, [visibleRequests])

  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: '130', md: '0' }}>
      <Header />
      <VStack align="stretch" gap={{ base: '12', md: '0' }}>
        <RequestsToolbar
          searchValue={searchValue}
          statusFilter={statusFilter}
          onlyMine={onlyMine}
          onExportClick={handleExportClick}
          isExportDisabled={visibleRequests.length === 0}
          onSearchChange={setSearchValue}
          onStatusChange={setStatusFilter}
          onOnlyMineChange={setOnlyMine}
        />
        <Box display={{ base: 'none', md: 'block' }} h="1px" bg="border.subtle" />
        <Box mt={{ base: '0', md: '31px' }}>
          <RequestsTable
            filters={{
              status: statusFilter,
              onlyMine,
              search: searchValue,
            }}
            sortState={sortState}
            isSortApplying={isSortApplying}
            onSortChange={handleSortChange}
            onResetFilters={resetFilters}
            onVisibleRequestsChange={handleVisibleRequestsChange}
          />
        </Box>
      </VStack>
    </Box>
  )
}
