import type { RequestPriority } from '@/entities/request/model'
import { FilterAltIcon } from '@/shared/assets/icons'
import {
  NO_TECHNICIAN_FILTER_VALUE,
  type RequestTableColumnFilterOptions,
  type RequestTableColumnFilters,
  type RequestTableFilterableColumn,
} from '@/widgets/requests-table/model/request-table-column-filters'
import {
  clearColumnFilter,
  getColumnSelectedValues,
  toggleColumnFilterValue,
} from '@/widgets/requests-table/model/request-table-column-filter-state'
import {
  type ColumnKey,
  isFilterableColumn,
} from '@/widgets/requests-table/ui/desktop/requests-table-desktop.columns'
import { Box, Checkbox, HStack, Popover, Portal, Text, Tooltip, VStack } from '@chakra-ui/react'

const NO_FILTER_TOOLTIP_TEXT = 'Фильтр для этой колонки не предусмотрен'

const PRIORITY_FILTER_LABELS: Record<RequestPriority, string> = {
  critical: 'Критич.',
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
}

type FilterOption = {
  value: string
  label: string
}

function getFilterOptionsByColumn(
  column: RequestTableFilterableColumn,
  filterOptions: RequestTableColumnFilterOptions,
): FilterOption[] {
  switch (column) {
    case 'priority':
      return filterOptions.priority.map((priority) => ({
        value: priority,
        label: PRIORITY_FILTER_LABELS[priority],
      }))
    case 'category':
      return filterOptions.category.map((value) => ({
        value,
        label: value,
      }))
    case 'technician': {
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
  }
}

export type FilterControlProps = {
  column: ColumnKey
  label: string
  columnFilters: RequestTableColumnFilters
  filterOptions: RequestTableColumnFilterOptions
  onColumnFiltersChange: (value: RequestTableColumnFilters) => void
}

export function FilterControl({
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
