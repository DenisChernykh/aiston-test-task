import { type RequestItem } from '@/entities/request/model'
import { RequestCodePill } from '@/entities/request/ui/request-code-pill'
import { RequestPriorityCell } from '@/entities/request/ui/request-priority-cell'
import { RequestSlaCell } from '@/entities/request/ui/request-sla-cell'
import { RequestStatusBadge } from '@/entities/request/ui/request-status-badge'
import { DotDoubleChevronIcon, DotUpChevronIcon, FilterAltIcon } from '@/shared/assets/icons'
import type {
  RequestTableSortDirection,
  RequestTableSortState,
  RequestTableSortableColumn,
} from '@/widgets/requests-table/model/request-table-sorting'
import { Box, HStack, Skeleton, Table, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'

export type RequestsTableDesktopProps = {
  requests: RequestItem[]
  sortState: RequestTableSortState
  isRowsLoading?: boolean
  onSortChange: (column: RequestTableSortableColumn) => void
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

type HeaderCellProps = {
  label: string
  isSortable: boolean
  direction: RequestTableSortDirection | null
  onSort?: () => void
}

function HeaderCell({ label, isSortable, direction, onSort }: HeaderCellProps) {
  const sortIndicator = isSortable ? (
    direction ? (
      <Box
        as="span"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        pointerEvents="none"
        aria-hidden
        transform={direction === 'asc' ? 'none' : 'rotate(180deg)'}
      >
        <DotUpChevronIcon boxSize="iconMd" color="text.primary" />
      </Box>
    ) : (
      <Box
        as="span"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        pointerEvents="none"
        aria-hidden
      >
        <DotDoubleChevronIcon boxSize="iconMd" color="text.muted" />
      </Box>
    )
  ) : null

  const indicators = (
    <HStack gap="5" align="center">
      <Box as="span" pointerEvents="none" aria-hidden>
        <FilterAltIcon boxSize="iconXs" color="text.muted" />
      </Box>
      {sortIndicator}
    </HStack>
  )

  if (!isSortable) {
    return (
      <HStack justify="space-between" align="center" w="full">
        <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
          {label}
        </Text>
        {indicators}
      </HStack>
    )
  }

  return (
    <Box
      as="button"
      w="full"
      display="block"
      cursor="pointer"
      textAlign="left"
      p="0"
      border="none"
      bg="transparent"
      _focusVisible={{
        outline: 'none',
        boxShadow: '0 0 0 2px var(--chakra-colors-border-focus)',
        borderRadius: 'xs',
      }}
      onClick={onSort}
      aria-label={`Сортировать по колонке «${label}»`}
    >
      <HStack justify="space-between" align="center" w="full">
        <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
          {label}
        </Text>
        {indicators}
      </HStack>
    </Box>
  )
}

export function RequestsTableDesktop({
  requests,
  sortState,
  isRowsLoading = false,
  onSortChange,
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
                const sortable = sortColumn !== null
                const isActive = sortColumn !== null && sortState?.column === sortColumn

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
                      label={column.label}
                      isSortable={sortable}
                      direction={isActive ? sortState.direction : null}
                      onSort={sortColumn ? () => onSortChange(sortColumn) : undefined}
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
