export type RequestStatusFilterValue =
  | 'new'
  | 'rejected'
  | 'onReview'
  | 'inProgress'
  | 'awaitingParts'
  | 'ready'
  | 'closed'
  | 'all'

export type RequestStatusFilterOption = {
  value: RequestStatusFilterValue
  label: string
}

export const REQUEST_STATUS_FILTER_OPTIONS: RequestStatusFilterOption[] = [
  { value: 'new', label: 'Новые' },
  { value: 'rejected', label: 'Отклонены' },
  { value: 'onReview', label: 'На рассмотрении' },
  { value: 'inProgress', label: 'В работе' },
  { value: 'awaitingParts', label: 'Ожидают запчасти' },
  { value: 'ready', label: 'Готовы' },
  { value: 'closed', label: 'Закрыты' },
  { value: 'all', label: 'Все статусы' },
]
export const MOBILE_REQUEST_STATUS_FILTER_SEQUENCE: RequestStatusFilterValue[] = [
  'all',
  'new',
  'onReview',
  'inProgress',
  'awaitingParts',
  'ready',
  'rejected',
  'closed',
]

export const DEFAULT_REQUEST_STATUS_FILTER: RequestStatusFilterValue = 'all'
