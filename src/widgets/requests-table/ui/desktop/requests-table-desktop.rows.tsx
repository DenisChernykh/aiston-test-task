import type { RequestItem } from '@/entities/request/model'
import { RequestCodePill } from '@/entities/request/ui/request-code-pill'
import { RequestPriorityCell } from '@/entities/request/ui/request-priority-cell'
import { RequestSlaCell } from '@/entities/request/ui/request-sla-cell'
import { RequestStatusBadge } from '@/entities/request/ui/request-status-badge'
import { COLUMNS } from '@/widgets/requests-table/ui/desktop/requests-table-desktop.columns'
import { HStack, Skeleton, Table, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'

function CreatedAtCell({ createdAt }: { createdAt: string }) {
  const date = parseISO(createdAt)

  return (
    <HStack gap="6" align="center">
      <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
        {format(date, 'dd.MM.yyyy')}
      </Text>
      <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary" opacity={0.3}>
        {format(date, 'HH:mm:ss')}
      </Text>
    </HStack>
  )
}

function PharmacyCell({
  number,
  city,
  address,
}: {
  number: string
  city: string
  address: string
}) {
  return (
    <HStack gap="10" align="center">
      <RequestCodePill value={number} />
      <HStack gap="6" align="center">
        <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
          {city}
        </Text>
        <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
          {address}
        </Text>
      </HStack>
    </HStack>
  )
}

export type RequestsTableRowsSkeletonProps = {
  rowsCount: number
}

export function RequestsTableRowsSkeleton({ rowsCount }: RequestsTableRowsSkeletonProps) {
  return Array.from({ length: rowsCount }).map((_, index) => (
    <Table.Row key={`rows-loading-${index}`} h="tableRow">
      {COLUMNS.map((column) => (
        <Table.Cell
          key={`${column.key}-loading-${index}`}
          px="10"
          py="8"
          borderBottomWidth="1px"
          borderColor="border.subtle"
        >
          <Skeleton h="12px" w="80%" />
        </Table.Cell>
      ))}
    </Table.Row>
  ))
}

export type RequestsTableRowsProps = {
  requests: RequestItem[]
}

export function RequestsTableRows({ requests }: RequestsTableRowsProps) {
  return requests.map((request) => (
    <Table.Row key={request.id} h="tableRow">
      <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
        <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
          {request.number}
        </Text>
      </Table.Cell>
      <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
        <PharmacyCell
          number={request.pharmacyCode}
          city={request.pharmacyCity}
          address={request.pharmacyAddress}
        />
      </Table.Cell>

      <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
        <CreatedAtCell createdAt={request.createdAt} />
      </Table.Cell>

      <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
        <RequestPriorityCell priority={request.priority} />
      </Table.Cell>

      <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
        <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
          {request.topic}
        </Text>
      </Table.Cell>

      <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
        <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
          {request.category}
        </Text>
      </Table.Cell>
      <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
        <Text
          fontSize="md"
          lineHeight="md"
          fontWeight="regular"
          color={request.technician ? 'text.primary' : 'sla.empty'}
        >
          {request.technician ?? '—'}
        </Text>
      </Table.Cell>

      <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
        <RequestSlaCell
          value={request.reactionTime}
          kind="reaction"
          status={request.status}
          createdAt={request.createdAt}
        />
      </Table.Cell>

      <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
        <RequestSlaCell
          value={request.resolutionTime}
          kind="resolution"
          status={request.status}
          createdAt={request.createdAt}
        />
      </Table.Cell>

      <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
        <RequestStatusBadge status={request.status} />
      </Table.Cell>
    </Table.Row>
  ))
}
