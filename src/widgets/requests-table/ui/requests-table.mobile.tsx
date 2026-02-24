import { RequestPriorityIcon, type RequestItem } from '@/entities/request/model'
import { RequestCodePill } from '@/entities/request/ui/request-code-pill'
import { RequestSlaCell } from '@/entities/request/ui/request-sla-cell'
import { RequestStatusBadge } from '@/entities/request/ui/request-status-badge'
import type { RequestsDateGroup } from '@/widgets/requests-table/model/group-requests-by-date'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'

export type RequestsTableMobileProps = {
  groups: RequestsDateGroup[]
}

export type MobileRequestCardProps = {
  item: RequestItem
}

function MobileRequestCard({ item }: MobileRequestCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderStyle="solid"
      borderColor="border.muted"
      borderRadius="lg"
      px="14"
      py="15"
      bg="bg.canvas"
    >
      <HStack justify="space-between" align="center" gap="8" minH="mobileTableRow">
        <Box minW="0" flex="1" pr="8">
          <Text
            fontSize="md"
            lineHeight="md"
            fontWeight="regular"
            color="text.primary"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {item.topic}
          </Text>
        </Box>

        <HStack gap="4" align="center" flexShrink={0}>
          <RequestPriorityIcon priority={item.priority} />
          <RequestStatusBadge status={item.status} context="mobileTable" />
        </HStack>
      </HStack>

      <HStack justify="space-between" align="center" gap="8" mt="16" minH="mobileTableRow">
        <HStack gap="6" align="center" minW="0" flex="1">
          <RequestCodePill value={item.number} context="mobileTable" />

          <HStack gap="5" align="center" minW="0" flex="1">
            <Text
              fontSize="xs"
              lineHeight="sm"
              fontWeight="medium"
              color="text.mobileTableSecondary"
              whiteSpace="nowrap"
              flexShrink={0}
            >
              {item.pharmacyCity}
            </Text>
            <Text
              fontSize="xs"
              lineHeight="sm"
              fontWeight="regular"
              color="text.mobileTableSecondary"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {item.pharmacyAddress}
            </Text>
          </HStack>
        </HStack>

        <Box flexShrink={0}>
          <RequestSlaCell
            value={item.resolutionTime}
            kind="resolution"
            status={item.status}
            createdAt={item.createdAt}
          />
        </Box>
      </HStack>
    </Box>
  )
}

type MobileGroupSectionProps = {
  group: RequestsDateGroup
}

function RequestsTableMobileGroupSection({ group }: MobileGroupSectionProps) {
  return (
    <VStack align="stretch" gap="12">
      <Text
        fontSize="md"
        lineHeight="md"
        fontWeight="semibold"
        color="text.primary"
        textTransform="uppercase"
        letterSpacing="codeTag"
      >
        {group.label}
      </Text>

      {group.items.map((item) => (
        <MobileRequestCard key={item.id} item={item} />
      ))}
    </VStack>
  )
}

export function RequestsTableMobile({ groups }: RequestsTableMobileProps) {
  return (
    <VStack align="stretch" px="15" pb="130" gap="12" bg="bg.mobileTableList">
      {groups.map((group) => (
        <RequestsTableMobileGroupSection key={group.key} group={group} />
      ))}
    </VStack>
  )
}
