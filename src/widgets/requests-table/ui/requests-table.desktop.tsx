import { type RequestItem, type RequestPriority } from '@/entities/request/model'
import { RequestCodePill } from '@/entities/request/ui/request-code-pill'
import { RequestPriorityCell } from '@/entities/request/ui/request-priority-cell'
import { RequestSlaCell } from '@/entities/request/ui/request-sla-cell'
import { RequestStatusBadge } from '@/entities/request/ui/request-status-badge'
import { DotDoubleChevronIcon, DotUpChevronIcon, FilterAltIcon } from '@/shared/assets/icons'
import {
  NO_TECHNICIAN_FILTER_VALUE,
  type RequestTableColumnFilterOptions,
  type RequestTableColumnFilters,
  type RequestTableFilterableColumn,
} from '@/widgets/requests-table/model/request-table-column-filters'
import type {
  RequestTableSortDirection,
  RequestTableSortState,
  RequestTableSortableColumn,
} from '@/widgets/requests-table/model/request-table-sorting'
import {
  Box,
  Checkbox,
  HStack,
  Popover,
  Portal,
  Skeleton,
  Table,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'

const NO_FILTER_TOOLTIP_TEXT = 'Фильтр для этой колонки не предусмотрен'

const PRIORITY_FILTER_LABELS: Record<RequestPriority, string> = {
  critical: 'Критич.',
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
}

export type RequestsTableDesktopProps = {
  requests: RequestItem[]
  sortState: RequestTableSortState
  columnFilters: RequestTableColumnFilters
  filterOptions: RequestTableColumnFilterOptions
  isRowsLoading?: boolean
  onSortChange: (column: RequestTableSortableColumn) => void
  onColumnFiltersChange: (value: RequestTableColumnFilters) => void
}

type ColumnKey =
  | 'number'
  | 'pharmacy'
  | 'createdAt'
  | 'priority'
  | 'topic'
  | 'category'
  | 'technician'
  | 'reaction'
  | 'resolution'
  | 'status'

type ColumnDef = {
  key: ColumnKey
  label: string
  width: string
}

type FilterOption = {
  value: string
  label: string
}

const COLUMNS: ColumnDef[] = [
  { key: 'number', label: '№', width: '90px' },
  { key: 'pharmacy', label: 'Аптека', width: '260px' },
  { key: 'createdAt', label: 'Создана', width: '160px' },
  { key: 'priority', label: 'Приоритет', width: '120px' },
  { key: 'topic', label: 'Тема', width: '300px' },
  { key: 'category', label: 'Категория', width: '200px' },
  { key: 'technician', label: 'Техник', width: '180px' },
  { key: 'reaction', label: 'Реакция', width: '120px' },
  { key: 'resolution', label: 'Решение', width: '120px' },
  { key: 'status', label: 'Статус', width: '290px' },
]

function isSortableColumn(key: ColumnKey): key is RequestTableSortableColumn {
  return key === 'createdAt' || key === 'priority' || key === 'status'
}

function isFilterableColumn(key: ColumnKey): key is RequestTableFilterableColumn {
  return key === 'priority' || key === 'category' || key === 'technician'
}

function getColumnAriaSort(
  key: ColumnKey,
  sortState: RequestTableSortState,
): 'none' | 'ascending' | 'descending' | undefined {
  if (!isSortableColumn(key)) {
    return undefined
  }

  if (!sortState || sortState.column !== key) {
    return 'none'
  }

  return sortState.direction === 'asc' ? 'ascending' : 'descending'
}

function getColumnSelectedValues(
  columnFilters: RequestTableColumnFilters,
  column: RequestTableFilterableColumn,
): string[] {
  if (column === 'priority') {
    return columnFilters.priority
  }

  if (column === 'category') {
    return columnFilters.category
  }

  return columnFilters.technician
}

function clearColumnFilter(
  columnFilters: RequestTableColumnFilters,
  column: RequestTableFilterableColumn,
): RequestTableColumnFilters {
  if (column === 'priority') {
    return {
      ...columnFilters,
      priority: [],
    }
  }

  if (column === 'category') {
    return {
      ...columnFilters,
      category: [],
    }
  }

  return {
    ...columnFilters,
    technician: [],
  }
}

function toggleColumnFilterValue(
  columnFilters: RequestTableColumnFilters,
  column: RequestTableFilterableColumn,
  value: string,
  checked: boolean,
): RequestTableColumnFilters {
  if (column === 'priority') {
    const typedValue = value as RequestPriority
    const currentValues = columnFilters.priority
    const nextValues = checked
      ? currentValues.includes(typedValue)
        ? currentValues
        : [...currentValues, typedValue]
      : currentValues.filter((currentValue) => currentValue !== typedValue)

    return {
      ...columnFilters,
      priority: nextValues,
    }
  }

  if (column === 'category') {
    const currentValues = columnFilters.category
    const nextValues = checked
      ? currentValues.includes(value)
        ? currentValues
        : [...currentValues, value]
      : currentValues.filter((currentValue) => currentValue !== value)

    return {
      ...columnFilters,
      category: nextValues,
    }
  }

  const currentValues = columnFilters.technician
  const nextValues = checked
    ? currentValues.includes(value)
      ? currentValues
      : [...currentValues, value]
    : currentValues.filter((currentValue) => currentValue !== value)

  return {
    ...columnFilters,
    technician: nextValues,
  }
}

function getFilterOptionsByColumn(
  column: RequestTableFilterableColumn,
  filterOptions: RequestTableColumnFilterOptions,
): FilterOption[] {
  if (column === 'priority') {
    return filterOptions.priority.map((priority) => ({
      value: priority,
      label: PRIORITY_FILTER_LABELS[priority],
    }))
  }

  if (column === 'category') {
    return filterOptions.category.map((value) => ({
      value,
      label: value,
    }))
  }

  const options: FilterOption[] = filterOptions.technician.map((value) => ({
    value,
    label: value,
  }))

  if (filterOptions.hasRequestsWithoutTechnician) {
    return [
      {
        value: NO_TECHNICIAN_FILTER_VALUE,
        label: 'Без техника',
      },
      ...options,
    ]
  }

  return options
}

function CreatedAtCell({ createdAt }: { createdAt: string }) {
  const date = parseISO(createdAt)

  return (
    <HStack gap="6" align="center">
      <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
        {format(date, 'dd.MM.yyyy')}
      </Text>
      <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary" opacity={0.3}>
        {format(date, 'HH:mm:ss')}
      </Text>
    </HStack>
  )
}

function PharmacyCell({
  number,
  city,
  address,
}: {
  number: string
  city: string
  address: string
}) {
  return (
    <HStack gap="10" align="center">
      <RequestCodePill value={number} />
      <HStack gap="6" align="center">
        <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
          {city}
        </Text>
        <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
          {address}
        </Text>
      </HStack>
    </HStack>
  )
}

type SortControlProps = {
  label: string
  direction: RequestTableSortDirection | null
  onSort?: () => void
}

function SortControl({ label, direction, onSort }: SortControlProps) {
  if (!onSort) {
    return null
  }

  return (
    <Box
      as="button"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      p="0"
      minW="auto"
      h="auto"
      border="none"
      bg="transparent"
      cursor="pointer"
      aria-label={`Сортировать по колонке «${label}»`}
      _focusVisible={{
        outline: 'none',
        boxShadow: '0 0 0 2px var(--chakra-colors-border-focus)',
        borderRadius: 'xs',
      }}
      onClick={onSort}
    >
      {direction ? (
        <DotUpChevronIcon
          boxSize="iconMd"
          color="text.primary"
          transform={direction === 'asc' ? 'none' : 'rotate(180deg)'}
        />
      ) : (
        <DotDoubleChevronIcon boxSize="iconMd" color="text.muted" />
      )}
    </Box>
  )
}

type FilterControlProps = {
  column: ColumnKey
  label: string
  columnFilters: RequestTableColumnFilters
  filterOptions: RequestTableColumnFilterOptions
  onColumnFiltersChange: (value: RequestTableColumnFilters) => void
}

function FilterControl({
  column,
  label,
  columnFilters,
  filterOptions,
  onColumnFiltersChange,
}: FilterControlProps) {
  if (!isFilterableColumn(column)) {
    return (
      <Tooltip.Root openDelay={120} positioning={{ placement: 'top' }}>
        <Tooltip.Trigger
          type="button"
          p="0"
          minW="auto"
          h="auto"
          border="none"
          bg="transparent"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          cursor="help"
          aria-label={NO_FILTER_TOOLTIP_TEXT}
          _focusVisible={{
            outline: 'none',
            boxShadow: '0 0 0 2px var(--chakra-colors-border-focus)',
            borderRadius: 'xs',
          }}
        >
          <FilterAltIcon boxSize="iconXs" color="text.muted" />
        </Tooltip.Trigger>
        <Portal>
          <Tooltip.Positioner>
            <Tooltip.Content fontSize="xs" lineHeight="xs" maxW="220px">
              {NO_FILTER_TOOLTIP_TEXT}
            </Tooltip.Content>
          </Tooltip.Positioner>
        </Portal>
      </Tooltip.Root>
    )
  }

  const selectedValues = getColumnSelectedValues(columnFilters, column)
  const options = getFilterOptionsByColumn(column, filterOptions)
  const isActive = selectedValues.length > 0

  return (
    <Popover.Root positioning={{ placement: 'bottom-end' }}>
      <Popover.Trigger
        type="button"
        p="0"
        minW="auto"
        h="auto"
        border="none"
        bg="transparent"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        color={isActive ? 'text.primary' : 'text.muted'}
        aria-label={`Фильтр по колонке «${label}»`}
        _focusVisible={{
          outline: 'none',
          boxShadow: '0 0 0 2px var(--chakra-colors-border-focus)',
          borderRadius: 'xs',
        }}
      >
        <FilterAltIcon boxSize="iconXs" color="currentColor" />
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content
            borderWidth="1px"
            borderColor="border.subtle"
            borderRadius="md"
            bg="bg.canvas"
            boxShadow="sm"
            minW="220px"
            zIndex="popover"
          >
            <Popover.Body p="10">
              <VStack align="stretch" gap="10">
                <HStack justify="space-between" align="center" gap="8">
                  <Text fontSize="xs" lineHeight="xs" fontWeight="semibold" color="text.primary">
                    {label}
                  </Text>
                  {isActive ? (
                    <Box
                      as="button"
                      p="0"
                      border="none"
                      bg="transparent"
                      fontSize="xs"
                      lineHeight="xs"
                      color="text.secondary"
                      cursor="pointer"
                      _hover={{ color: 'text.primary' }}
                      _focusVisible={{
                        outline: 'none',
                        boxShadow: '0 0 0 2px var(--chakra-colors-border-focus)',
                        borderRadius: 'xs',
                      }}
                      onClick={() => onColumnFiltersChange(clearColumnFilter(columnFilters, column))}
                    >
                      Сбросить
                    </Box>
                  ) : null}
                </HStack>

                {options.length === 0 ? (
                  <Text fontSize="xs" lineHeight="xs" color="text.secondary">
                    Нет доступных значений
                  </Text>
                ) : (
                  <VStack align="stretch" gap="8" maxH="260px" overflowY="auto" pr="2">
                    {options.map((option) => (
                      <Checkbox.Root
                        key={`${column}-${option.value}`}
                        checked={selectedValues.includes(option.value)}
                        onCheckedChange={(details) => {
                          onColumnFiltersChange(
                            toggleColumnFilterValue(
                              columnFilters,
                              column,
                              option.value,
                              details.checked === true,
                            ),
                          )
                        }}
                        gap="8"
                        alignItems="center"
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control
                          w="16px"
                          h="16px"
                          borderWidth="1px"
                          borderColor="border.default"
                          borderRadius="sm"
                          bg="bg.field"
                          color="bg.field"
                          _checked={{
                            bg: 'text.primary',
                            borderColor: 'text.primary',
                          }}
                        >
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Label fontSize="xs" lineHeight="xs" color="text.primary">
                          {option.label}
                        </Checkbox.Label>
                      </Checkbox.Root>
                    ))}
                  </VStack>
                )}
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

type HeaderCellProps = {
  column: ColumnKey
  label: string
  direction: RequestTableSortDirection | null
  onSort?: () => void
  columnFilters: RequestTableColumnFilters
  filterOptions: RequestTableColumnFilterOptions
  onColumnFiltersChange: (value: RequestTableColumnFilters) => void
}

function HeaderCell({
  column,
  label,
  direction,
  onSort,
  columnFilters,
  filterOptions,
  onColumnFiltersChange,
}: HeaderCellProps) {
  return (
    <HStack justify="space-between" align="center" w="full" gap="8">
      <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary" minW="0">
        {label}
      </Text>

      <HStack gap="5" align="center" flexShrink={0}>
        <FilterControl
          column={column}
          label={label}
          columnFilters={columnFilters}
          filterOptions={filterOptions}
          onColumnFiltersChange={onColumnFiltersChange}
        />
        <SortControl label={label} direction={direction} onSort={onSort} />
      </HStack>
    </HStack>
  )
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
          <Table.Body>
            {isRowsLoading
              ? Array.from({ length: loadingRowsCount }).map((_, index) => (
                  <Table.Row key={`rows-loading-${index}`} h="tableRow">
                    {COLUMNS.map((column) => (
                      <Table.Cell
                        key={`${column.key}-loading-${index}`}
                        px="10"
                        py="8"
                        borderBottomWidth="1px"
                        borderColor="border.subtle"
                      >
                        <Skeleton h="12px" w="80%" />
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))
              : requests.map((request) => (
                  <Table.Row key={request.id} h="tableRow">
                    <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
                      <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
                        {request.number}
                      </Text>
                    </Table.Cell>
                    <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
                      <PharmacyCell
                        number={request.pharmacyCode}
                        city={request.pharmacyCity}
                        address={request.pharmacyAddress}
                      />
                    </Table.Cell>

                    <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
                      <CreatedAtCell createdAt={request.createdAt} />
                    </Table.Cell>

                    <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
                      <RequestPriorityCell priority={request.priority} />
                    </Table.Cell>

                    <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
                      <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
                        {request.topic}
                      </Text>
                    </Table.Cell>

                    <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
                      <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
                        {request.category}
                      </Text>
                    </Table.Cell>
                    <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
                      <Text
                        fontSize="md"
                        lineHeight="md"
                        fontWeight="regular"
                        color={request.technician ? 'text.primary' : 'sla.empty'}
                      >
                        {request.technician ?? '—'}
                      </Text>
                    </Table.Cell>

                    <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
                      <RequestSlaCell
                        value={request.reactionTime}
                        kind="reaction"
                        status={request.status}
                        createdAt={request.createdAt}
                      />
                    </Table.Cell>

                    <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
                      <RequestSlaCell
                        value={request.resolutionTime}
                        kind="resolution"
                        status={request.status}
                        createdAt={request.createdAt}
                      />
                    </Table.Cell>

                    <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
                      <RequestStatusBadge status={request.status} />
                    </Table.Cell>
                  </Table.Row>
                ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  )
}
