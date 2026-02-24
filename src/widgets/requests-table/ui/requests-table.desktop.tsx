import type { RequestItem } from '@/entities/request/model'
import type {
  RequestTableColumnFilterOptions,
  RequestTableColumnFilters,
} from '@/widgets/requests-table/model/request-table-column-filters'
import type {
  RequestTableSortState,
  RequestTableSortableColumn,
} from '@/widgets/requests-table/model/request-table-sorting'
import {
  COLUMNS,
  getColumnAriaSort,
  isSortableColumn,
} from '@/widgets/requests-table/ui/desktop/requests-table-desktop.columns'
import { HeaderCell } from '@/widgets/requests-table/ui/desktop/requests-table-desktop.header-cell'
import {
  RequestsTableRows,
  RequestsTableRowsSkeleton,
} from '@/widgets/requests-table/ui/desktop/requests-table-desktop.rows'
import { Box, Table } from '@chakra-ui/react'

export type RequestsTableDesktopProps = {
  requests: RequestItem[]
  sortState: RequestTableSortState
  columnFilters: RequestTableColumnFilters
  filterOptions: RequestTableColumnFilterOptions
  isRowsLoading?: boolean
  onSortChange: (column: RequestTableSortableColumn) => void
  onColumnFiltersChange: (value: RequestTableColumnFilters) => void
}

export function RequestsTableDesktop({
  requests,
  sortState,
  columnFilters,
  filterOptions,
  isRowsLoading = false,
  onSortChange,
  onColumnFiltersChange,
}: RequestsTableDesktopProps) {
  const loadingRowsCount = 7

  const bodyContent = isRowsLoading ? (
    <RequestsTableRowsSkeleton rowsCount={loadingRowsCount} />
  ) : (
    <RequestsTableRows requests={requests} />
  )

  return (
    <Box px="40">
      <Table.ScrollArea borderRadius="lg">
        <Table.Root minW="1840px" unstyled tableLayout="fixed">
          <Table.ColumnGroup>
            {COLUMNS.map((column) => (
              <Table.Column key={column.key} width={column.width} />
            ))}
          </Table.ColumnGroup>

          <Table.Header>
            <Table.Row h="tableRow" bg="bg.surface">
              {COLUMNS.map((column) => {
                const sortColumn = isSortableColumn(column.key) ? column.key : null
                const isActiveSort = sortColumn !== null && sortState?.column === sortColumn

                return (
                  <Table.ColumnHeader
                    key={column.key}
                    px={column.key === 'number' ? '11' : '10'}
                    py="8"
                    borderBottomWidth="1px"
                    borderColor="border.subtle"
                    aria-sort={getColumnAriaSort(column.key, sortState)}
                  >
                    <HeaderCell
                      column={column.key}
                      label={column.label}
                      direction={isActiveSort ? sortState.direction : null}
                      onSort={sortColumn ? () => onSortChange(sortColumn) : undefined}
                      columnFilters={columnFilters}
                      filterOptions={filterOptions}
                      onColumnFiltersChange={onColumnFiltersChange}
                    />
                  </Table.ColumnHeader>
                )
              })}
            </Table.Row>
          </Table.Header>

          <Table.Body>{bodyContent}</Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  )
}
