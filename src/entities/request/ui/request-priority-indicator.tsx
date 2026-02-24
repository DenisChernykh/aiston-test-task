import type { RequestPriority } from '@/entities/request/model'
import { DotDiamondIcon, DotDoubleChevronIcon, DotUpChevronIcon } from '@/shared/assets/icons'
import { getRequestPriorityVisual } from './request-priority-visual'

export type RequestPriorityIconProps = {
  priority: RequestPriority
  boxSize?: string
}

export function RequestPriorityIcon({ priority, boxSize = 'iconSm' }: RequestPriorityIconProps) {
  const meta = getRequestPriorityVisual(priority)

  if (meta.icon === 'critical') {
    return <DotDoubleChevronIcon boxSize={boxSize} color={meta.iconColorToken} />
  }

  if (meta.icon === 'high') {
    return <DotUpChevronIcon boxSize={boxSize} color={meta.iconColorToken} />
  }

  if (meta.icon === 'medium') {
    return <DotDiamondIcon boxSize={boxSize} color={meta.iconColorToken} />
  }

  return (
    <DotUpChevronIcon boxSize={boxSize} color={meta.iconColorToken} transform="rotate(180deg)" />
  )
}
