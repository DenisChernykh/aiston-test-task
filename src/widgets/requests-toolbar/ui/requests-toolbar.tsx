import { RequestActionsDesktop, RequestActionsMobileFloating } from '@/features/request-actions'
import {
  DEFAULT_REQUEST_STATUS_FILTER,
  RequestFiltersRow,
  type RequestStatusFilterValue,
} from '@/features/request-filters'
import { RequestSearchField } from '@/features/request-search'
import { AppButton } from '@/shared/ui/button'
import { Box, HStack, useBreakpointValue } from '@chakra-ui/react'
import { useState } from 'react'

const noop = () => undefined

export function RequestsToolbar() {
  const isDesktop = useBreakpointValue({ base: false, md: true }) ?? false
  const [searchValue, setSearchValue] = useState('')
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<RequestStatusFilterValue>(
    DEFAULT_REQUEST_STATUS_FILTER,
  )
  const [onlyMine, setOnlyMine] = useState(false)

  if (isDesktop) {
    return (
      <Box mt="21" px="40">
        <HStack gap="13" align="stretch">
          <RequestSearchField value={searchValue} onChange={setSearchValue} />
          <RequestActionsDesktop onExportClick={noop} onCreateClick={noop} />
        </HStack>

        <RequestFiltersRow
          status={statusFilter}
          onlyMine={onlyMine}
          onStatusChange={setStatusFilter}
          onOnlyMineChange={setOnlyMine}
        />
      </Box>
    )
  }

  return (
    <>
      <Box pl="16">
        <RequestFiltersRow
          status={statusFilter}
          onlyMine={onlyMine}
          onStatusChange={setStatusFilter}
          onOnlyMineChange={setOnlyMine}
        />
      </Box>
      <Box
        opacity={mobileSearchOpen ? 0 : 1}
        transitionProperty="opacity"
        transitionDuration="normal"
        transitionTimingFunction="easings.standard"
        pointerEvents={mobileSearchOpen ? 'none' : 'auto'}
      >
        <RequestActionsMobileFloating
          onSearchClick={() => setMobileSearchOpen(true)}
          onCreateClick={noop}
        />
      </Box>

      <Box
        position="fixed"
        insetX="0"
        bottom="0"
        zIndex="overlay"
        pl="10"
        pr="16"
        pb="30"
        pt="30"
        opacity={mobileSearchOpen ? 1 : 0}
        transform={mobileSearchOpen ? 'translateY(0)' : 'translateY(var(--chakra-spacing-8))'}
        transitionProperty="opacity, transform"
        transitionDuration="normal"
        transitionTimingFunction="easings.standard"
        pointerEvents={mobileSearchOpen ? 'auto' : 'none'}
        bgImage="linear-gradient(180deg, transparent 76.923%, var(--chakra-colors-bg-mobile-floating) 100%)"
      >
        <HStack align="center" gap="10">
          <RequestSearchField value={searchValue} onChange={setSearchValue} />
          <AppButton
            variant="softBordered"
            size="floating"
            onClick={() => setMobileSearchOpen(false)}
          >
            Отмена
          </AppButton>
        </HStack>
      </Box>
    </>
  )
}
