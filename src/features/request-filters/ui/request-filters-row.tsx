import type { RequestStatusFilterValue } from '@/features/request-filters/model/request-filter-status'
import { RequestOnlyMineToggle } from '@/features/request-filters/ui/request-only-mine-toggle'
import { RequestStatusTabs } from '@/features/request-filters/ui/request-status-tabs'
import { Box, HStack, useBreakpointValue } from '@chakra-ui/react'

export type RequestFiltersRowProps = {
  status: RequestStatusFilterValue
  onlyMine: boolean
  onStatusChange: (value: RequestStatusFilterValue) => void
  onOnlyMineChange: (value: boolean) => void
}

export function RequestFiltersRow({
  status,
  onlyMine,
  onStatusChange,
  onOnlyMineChange,
}: RequestFiltersRowProps) {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false

  return (
    <Box
      overflowX={{ base: 'auto', md: 'visible' }}
      overflowY="hidden"
      css={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <HStack
        px={{ base: '16', md: '0' }}
        w={{ base: 'max-content', md: 'fit-content' }}
        gap={{ base: '8', md: '0' }}
        align="center"
        py={{ base: '10', md: '21' }}
      >
        {isMobile ? (
          <>
            <RequestOnlyMineToggle value={onlyMine} onChange={onOnlyMineChange} />
            <RequestStatusTabs value={status} onChange={onStatusChange} />
          </>
        ) : (
          <>
            <RequestStatusTabs value={status} onChange={onStatusChange} />
            <Box
              ml="27"
              mr="24"
              w="filterDivider"
              h="buttonDesktop"
              bg="border.subtle"
              borderRadius="xs"
              flexShrink={0}
              aria-hidden
            />
            <RequestOnlyMineToggle value={onlyMine} onChange={onOnlyMineChange} />
          </>
        )}
      </HStack>
    </Box>
  )
}
