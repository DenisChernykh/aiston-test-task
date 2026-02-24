import type { RequestPriority } from '@/entities/request/model'
import type {
  RequestTableColumnFilters,
  RequestTableFilterableColumn,
} from '@/widgets/requests-table/model/request-table-column-filters'

function toggleArrayValue<T extends string>(values: T[], value: T, checked: boolean): T[] {
  if (checked) {
    if (values.includes(value)) {
      return values
    }

    return [...values, value]
  }

  return values.filter((currentValue) => currentValue !== value)
}

export function getColumnSelectedValues(
  columnFilters: RequestTableColumnFilters,
  column: RequestTableFilterableColumn,
): string[] {
  switch (column) {
    case 'priority':
      return columnFilters.priority
    case 'category':
      return columnFilters.category
    case 'technician':
      return columnFilters.technician
  }
}

export function clearColumnFilter(
  columnFilters: RequestTableColumnFilters,
  column: RequestTableFilterableColumn,
): RequestTableColumnFilters {
  switch (column) {
    case 'priority':
      return {
        ...columnFilters,
        priority: [],
      }
    case 'category':
      return {
        ...columnFilters,
        category: [],
      }
    case 'technician':
      return {
        ...columnFilters,
        technician: [],
      }
  }
}

export function toggleColumnFilterValue(
  columnFilters: RequestTableColumnFilters,
  column: RequestTableFilterableColumn,
  value: string,
  checked: boolean,
): RequestTableColumnFilters {
  switch (column) {
    case 'priority': {
      const typedValue = value as RequestPriority
      return {
        ...columnFilters,
        priority: toggleArrayValue(columnFilters.priority, typedValue, checked),
      }
    }
    case 'category':
      return {
        ...columnFilters,
        category: toggleArrayValue(columnFilters.category, value, checked),
      }
    case 'technician':
      return {
        ...columnFilters,
        technician: toggleArrayValue(columnFilters.technician, value, checked),
      }
  }
}
