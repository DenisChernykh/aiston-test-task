import { type RequestItem } from '@/entities/request/model'
import { RequestCodePill } from '@/entities/request/ui/request-code-pill'
import { RequestPriorityCell } from '@/entities/request/ui/request-priority-cell'
import { RequestSlaCell } from '@/entities/request/ui/request-sla-cell'
import { RequestStatusBadge } from '@/entities/request/ui/request-status-badge'
import { FilterAltIcon } from '@/shared/assets/icons'
import { Box, HStack, Table, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'

export type RequestsTableDesktopProps = {
  requests: RequestItem[]
}

type ColumnDef = {
  key: string
  label: string
  width: string
}
const COLUMNS: ColumnDef[] = [
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

function HeaderCell({ label }: { label: string }) {
  return (
    <HStack justify="space-between" align="center" w="full">
      <Text fontSize="md" lineHeight="md" fontWeight="regular" color="text.primary">
        {label}
      </Text>
      <Box as="span" pointerEvents="none" aria-hidden>
        <FilterAltIcon boxSize="iconXs" color="text.muted" />
      </Box>
    </HStack>
  )
}

export function RequestsTableDesktop({ requests }: RequestsTableDesktopProps) {
  return (
    <Box px="40">
      <Table.ScrollArea borderRadius="lg">
        <Table.Root minW="1840px" unstyled tableLayout="fixed">
          <Table.ColumnGroup>
            {COLUMNS.map((column) => (
              <Table.Column key={column.key} width={column.width} />
            ))}
          </Table.ColumnGroup>

          <Table.Header>
            <Table.Row h="tableRow" bg="bg.surface">
              {COLUMNS.map((column) => (
                <Table.ColumnHeader
                  px={column.key === 'number' ? '11' : '10'}
                  py="8"
                  borderBottomWidth="1px"
                  borderColor="border.subtle"
                >
                  <HeaderCell label={column.label} />
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {requests.map((request) => (
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
                  />
                </Table.Cell>

                <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
                  <RequestSlaCell
                    value={request.resolutionTime}
                    kind="resolution"
                    status={request.status}
                  />
                </Table.Cell>

                <Table.Cell px="10" py="8" borderBottomWidth="1px" borderColor="border.subtle">
                  <RequestStatusBadge status={request.status} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  )
}
