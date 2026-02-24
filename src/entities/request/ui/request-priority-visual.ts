import type { RequestPriority } from '@/entities/request/model'

export type RequestPriorityVisual = {
  label: string
  iconColorToken:
    | 'priorityIcon.critical'
    | 'priorityIcon.high'
    | 'priorityIcon.medium'
    | 'priorityIcon.low'
  icon: 'critical' | 'high' | 'medium' | 'low'
}

const REQUEST_PRIORITY_VISUAL: Record<RequestPriority, RequestPriorityVisual> = {
  critical: { label: 'Критич.', iconColorToken: 'priorityIcon.critical', icon: 'critical' },
  high: { label: 'Высокий', iconColorToken: 'priorityIcon.high', icon: 'high' },
  medium: { label: 'Средний', iconColorToken: 'priorityIcon.medium', icon: 'medium' },
  low: { label: 'Низкий', iconColorToken: 'priorityIcon.low', icon: 'low' },
}

export function getRequestPriorityVisual(priority: RequestPriority): RequestPriorityVisual {
  return REQUEST_PRIORITY_VISUAL[priority]
}
