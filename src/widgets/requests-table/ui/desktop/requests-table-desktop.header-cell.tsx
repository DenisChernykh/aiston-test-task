import { DotDoubleChevronIcon, DotUpChevronIcon } from '@/shared/assets/icons'
import type {
  RequestTableColumnFilterOptions,
  RequestTableColumnFilters,
} from '@/widgets/requests-table/model/request-table-column-filters'
import type { RequestTableSortDirection } from '@/widgets/requests-table/model/request-table-sorting'
import { type ColumnKey } from '@/widgets/requests-table/ui/desktop/requests-table-desktop.columns'
import {
  FilterControl,
  type FilterControlProps,
} from '@/widgets/requests-table/ui/desktop/requests-table-desktop.filter-control'
import { Box, HStack, Text } from '@chakra-ui/react'

type SortControlProps = {
  label: string
  direction: RequestTableSortDirection | null
  onSort?: () => void
}

function SortControl({ label, direction, onSort }: SortControlProps) {
  if (!onSort) {
    return null
  }

  let icon = <DotDoubleChevronIcon boxSize="iconMd" color="text.muted" />

  if (direction) {
    const transform = direction === 'asc' ? 'none' : 'rotate(180deg)'
    icon = <DotUpChevronIcon boxSize="iconMd" color="text.primary" transform={transform} />
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
      {icon}
    </Box>
  )
}

export type HeaderCellProps = {
  column: ColumnKey
  label: string
  direction: RequestTableSortDirection | null
  onSort?: () => void
  columnFilters: RequestTableColumnFilters
  filterOptions: RequestTableColumnFilterOptions
  onColumnFiltersChange: (value: RequestTableColumnFilters) => void
}

export function HeaderCell({
  column,
  label,
  direction,
  onSort,
  columnFilters,
  filterOptions,
  onColumnFiltersChange,
}: HeaderCellProps) {
  const filterControlProps: FilterControlProps = {
    column,
    label,
    columnFilters,
    filterOptions,
    onColumnFiltersChange,
  }

  return (
    <HStack justify="space-between" align="center" w="full" gap="8">
      <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary" minW="0">
        {label}
      </Text>

      <HStack gap="5" align="center" flexShrink={0}>
        <FilterControl {...filterControlProps} />
        <SortControl label={label} direction={direction} onSort={onSort} />
      </HStack>
    </HStack>
  )
}
