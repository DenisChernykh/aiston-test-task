import type { RequestStatus } from '@/entities/request/model'
import { Badge } from '@chakra-ui/react'

export type RequestStatusBadgeContext = 'default' | 'mobileTable'
export type RequestStatusBadgeProps = {
  status: RequestStatus
  context?: RequestStatusBadgeContext
}

type StatusMeta = {
  label: string
  bg: string
  fontWeight: 'regular' | 'medium'
  borderColor?: string
}

const DEFAULT_STATUS_META: Record<RequestStatus, StatusMeta> = {
  new: { label: 'Новая', bg: 'status.newBg', fontWeight: 'regular' },
  inProgress: { label: 'В работе', bg: 'status.inProgressBg', fontWeight: 'regular' },
  ready: { label: 'Готово', bg: 'status.doneBg', fontWeight: 'regular' },
  closed: { label: 'Закрыто', bg: 'status.closedBg', fontWeight: 'regular' },
  paused: {
    label: 'На паузе',
    bg: 'bg.canvas',
    borderColor: 'border.strong',
    fontWeight: 'regular',
  },
  awaitingParts: { label: 'Ожидание ЗЧ', bg: 'status.closedBg', fontWeight: 'regular' },
}

const MOBILE_TABLE_STATUS_META: Record<RequestStatus, StatusMeta> = {
  new: { label: 'Новая', bg: 'status.newBg', fontWeight: 'regular' },
  inProgress: {
    label: 'В работе',
    bg: 'status.mobileTableInProgressBg',
    fontWeight: 'medium',
  },
  ready: {
    label: 'Готово',
    bg: 'status.mobileTableReadyBg',
    fontWeight: 'medium',
  },
  closed: { label: 'Закрыто', bg: 'status.mobileTableMutedBg', fontWeight: 'regular' },
  paused: {
    label: 'На паузе',
    bg: 'bg.canvas',
    borderColor: 'border.strong',
    fontWeight: 'regular',
  },
  awaitingParts: {
    label: 'Ожидание ЗЧ',
    bg: 'status.mobileTableMutedBg',
    fontWeight: 'regular',
  },
}

export function RequestStatusBadge({ status, context = 'default' }: RequestStatusBadgeProps) {
  const meta =
    context === 'mobileTable' ? MOBILE_TABLE_STATUS_META[status] : DEFAULT_STATUS_META[status]

  return (
    <Badge
      px="6"
      py="2"
      borderRadius="xs"
      fontSize="md"
      lineHeight="sm"
      fontWeight={meta.fontWeight}
      color="status.fg"
      bg={meta.bg}
      borderWidth={meta.borderColor ? '1px' : '0px'}
      borderStyle="solid"
      borderColor={meta.borderColor ?? 'transparent'}
      textTransform="none"
    >
      {meta.label}
    </Badge>
  )
}
