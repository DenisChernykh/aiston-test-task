import type { RequestPriority } from '@/entities/request/model'
import { DotDiamondIcon, DotDoubleChevronIcon, DotUpChevronIcon } from '@/shared/assets/icons'
import { getRequestPriorityVisual } from './request-priority-visual'

export type RequestPriorityIconProps = {
  priority: RequestPriority
}

export function RequestPriorityIcon({ priority }: RequestPriorityIconProps) {
  const meta = getRequestPriorityVisual(priority)

  if (meta.icon === 'critical') {
    return <DotDoubleChevronIcon boxSize="iconLg" color={meta.iconColorToken} />
  }

  if (meta.icon === 'high') {
    return <DotUpChevronIcon boxSize="iconLg" color={meta.iconColorToken} />
  }

  if (meta.icon === 'medium') {
    return <DotDiamondIcon boxSize="iconLg" color={meta.iconColorToken} />
  }

  return (
    <DotUpChevronIcon boxSize="iconLg" color={meta.iconColorToken} transform="rotate(180deg)" />
  )
}
