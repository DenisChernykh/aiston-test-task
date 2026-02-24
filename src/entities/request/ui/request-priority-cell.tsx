import type { RequestPriority } from '@/entities/request/model'
import { RequestPriorityIcon } from '@/entities/request/ui/request-priority-indicator'
import { getRequestPriorityVisual } from '@/entities/request/ui/request-priority-visual'
import { HStack, Text } from '@chakra-ui/react'

export type RequestPriorityCellProps = {
  priority: RequestPriority
}

const PRIORITY_LABEL_OPACITY: Record<RequestPriority, number> = {
  critical: 0.4,
  high: 0.4,
  medium: 0.5,
  low: 0.5,
}

export function RequestPriorityCell({ priority }: RequestPriorityCellProps) {
  const meta = getRequestPriorityVisual(priority)

  return (
    <HStack gap="6" align="center">
      <RequestPriorityIcon priority={priority} />
      <Text
        fontSize="xs"
        lineHeight="md"
        fontWeight="medium"
        color="text.primary"
        opacity={PRIORITY_LABEL_OPACITY[priority]}
      >
        {meta.label}
      </Text>
    </HStack>
  )
}
