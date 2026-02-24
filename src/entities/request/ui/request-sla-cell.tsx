import type { RequestStatus } from '@/entities/request/model'
import { SlaAlertIcon, SlaCheckIcon, SlaNeutralClockIcon } from '@/shared/assets/icons'
import { parseDurationToSeconds } from '@/shared/lib/parse-duration-to-seconds'
import { HStack, Text } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'

export type RequestSlaCellProps = {
  value: string | null
  kind: 'reaction' | 'resolution'
  status: RequestStatus
  createdAt: string
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

const SLA_THRESHOLD_SECONDS = {
  reaction: 30 * 60,
  resolution: 1 * 60 * 60,
} as const

function getEmptySlaView(): SlaView {
  return {
    displayValue: '—',
    icon: null,
    color: 'sla.empty',
    fontSize: 'xs',
    letterSpacing: 'slaEmpty',
  }
}

function getStaticSlaView({ value, kind }: Pick<RequestSlaCellProps, 'value' | 'kind'>): SlaView {
  if (!value) {
    return getEmptySlaView()
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

function isLiveMode({ kind, status }: Pick<RequestSlaCellProps, 'kind' | 'status'>): boolean {
  return (
    (kind === 'reaction' && status === 'new') || (kind === 'resolution' && status === 'inProgress')
  )
}

function formatToTimer(seconds: number): string {
  const safeSeconds = Math.max(0, seconds)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const remainderSeconds = safeSeconds % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
    remainderSeconds,
  ).padStart(2, '0')}`
}

function getTimestampMs(isoValue: string): number | null {
  const timestampMs = Date.parse(isoValue)

  if (Number.isNaN(timestampMs)) {
    return null
  }

  return timestampMs
}

function SlaIcon({ kind }: { kind: SlaIconKind }) {
  if (kind === 'ok') return <SlaCheckIcon boxSize="iconSm" color="sla.ok" />
  if (kind === 'breach') return <SlaAlertIcon boxSize="iconSm" color="sla.breach" />
  if (kind === 'neutral') return <SlaNeutralClockIcon boxSize="iconSm" color="sla.neutral" />
  return null
}

export function RequestSlaCell(props: RequestSlaCellProps) {
  const liveMode = isLiveMode(props)
  const createdAtMs = useMemo(() => getTimestampMs(props.createdAt), [props.createdAt])
  const [nowMs, setNowMs] = useState(() => Date.now())

  useEffect(() => {
    if (!liveMode || createdAtMs === null) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setNowMs(Date.now())
    }, 0)

    const intervalId = window.setInterval(() => {
      setNowMs(Date.now())
    }, 1000)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [createdAtMs, liveMode])

  const view = useMemo<SlaView>(() => {
    if (!liveMode) {
      return getStaticSlaView({ value: props.value, kind: props.kind })
    }

    if (createdAtMs === null) {
      return getEmptySlaView()
    }

    const elapsedSeconds = Math.max(0, Math.floor((nowMs - createdAtMs) / 1000))

    return {
      displayValue: formatToTimer(elapsedSeconds),
      icon: 'neutral',
      color: 'sla.neutral',
      fontSize: 'md',
      letterSpacing: 'compact',
    }
  }, [createdAtMs, liveMode, nowMs, props.kind, props.value])

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
