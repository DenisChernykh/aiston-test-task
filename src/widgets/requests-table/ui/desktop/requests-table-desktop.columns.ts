import type { RequestTableFilterableColumn } from '@/widgets/requests-table/model/request-table-column-filters'
import type {
  RequestTableSortState,
  RequestTableSortableColumn,
} from '@/widgets/requests-table/model/request-table-sorting'

export type ColumnKey =
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

export type ColumnDef = {
  key: ColumnKey
  label: string
  width: string
}

export const COLUMNS: ColumnDef[] = [
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

export function isSortableColumn(key: ColumnKey): key is RequestTableSortableColumn {
  return key === 'createdAt' || key === 'priority' || key === 'status'
}

export function isFilterableColumn(key: ColumnKey): key is RequestTableFilterableColumn {
  return key === 'priority' || key === 'category' || key === 'technician'
}

export function getColumnAriaSort(
  key: ColumnKey,
  sortState: RequestTableSortState,
): 'none' | 'ascending' | 'descending' | undefined {
  if (!isSortableColumn(key)) {
    return undefined
  }

  if (!sortState || sortState.column !== key) {
    return 'none'
  }

  if (sortState.direction === 'asc') {
    return 'ascending'
  }

  return 'descending'
}
