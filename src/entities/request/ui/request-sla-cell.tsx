import type { RequestStatus } from '@/entities/request/model'
import { SlaAlertIcon, SlaCheckIcon, SlaNeutralClockIcon } from '@/shared/assets/icons'
import { parseDurationToSeconds } from '@/shared/lib/parse-duration-to-seconds'
import { HStack, Text } from '@chakra-ui/react'

export type RequestSlaCellProps = {
  value: string | null
  kind: 'reaction' | 'resolution'
  status: RequestStatus
}

type SlaColorToken = 'sla.ok' | 'sla.breach' | 'sla.neutral' | 'sla.empty'
type SlaIconKind = 'ok' | 'breach' | 'neutral' | null

type SlaView = {
  displayValue: string
  icon: SlaIconKind
  color: SlaColorToken
  fontSize: 'md' | 'xs'
  letterSpacing: 'compact' | 'slaEmpty'
}

const REACTION_PROCESS_PLACEHOLDER = '02:48'
const SLA_THRESHOLD_SECONDS = {
  reaction: 30 * 60,
  resolution: 1 * 60 * 60,
} as const

function getSlaView({ value, kind, status }: RequestSlaCellProps): SlaView {
  const reactionInProgress = kind === 'reaction' && status === 'new'
  const resolutionInProgress = kind === 'resolution' && status === 'inProgress' && Boolean(value)

  if (reactionInProgress) {
    return {
      displayValue: value ?? REACTION_PROCESS_PLACEHOLDER,
      icon: 'neutral',
      color: 'sla.neutral',
      fontSize: 'md',
      letterSpacing: 'compact',
    }
  }

  if (resolutionInProgress) {
    return {
      displayValue: value as string,
      icon: 'neutral',
      color: 'sla.neutral',
      fontSize: 'md',
      letterSpacing: 'compact',
    }
  }

  if (!value) {
    return {
      displayValue: '—',
      icon: null,
      color: 'sla.empty',
      fontSize: 'xs',
      letterSpacing: 'slaEmpty',
    }
  }

  const seconds = parseDurationToSeconds(value)
  const isBreach = seconds !== null && seconds > SLA_THRESHOLD_SECONDS[kind]

  if (isBreach) {
    return {
      displayValue: value,
      icon: 'breach',
      color: 'sla.breach',
      fontSize: 'md',
      letterSpacing: 'compact',
    }
  }

  return {
    displayValue: value,
    icon: 'ok',
    color: 'sla.ok',
    fontSize: 'md',
    letterSpacing: 'compact',
  }
}

function SlaIcon({ kind }: { kind: SlaIconKind }) {
  if (kind === 'ok') return <SlaCheckIcon boxSize="iconSm" color="sla.ok" />
  if (kind === 'breach') return <SlaAlertIcon boxSize="iconSm" color="sla.breach" />
  if (kind === 'neutral') return <SlaNeutralClockIcon boxSize="iconSm" color="sla.neutral" />
  return null
}

export function RequestSlaCell(props: RequestSlaCellProps) {
  const view = getSlaView(props)

  return (
    <HStack gap="4" align="center">
      <SlaIcon kind={view.icon} />
      <Text
        fontSize={view.fontSize}
        lineHeight="sm"
        fontWeight="regular"
        letterSpacing={view.letterSpacing}
        color={view.color}
      >
        {view.displayValue}
      </Text>
    </HStack>
  )
}
