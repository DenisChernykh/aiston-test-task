import { RequestActionsDesktop, RequestActionsMobileFloating } from '@/features/request-actions'
import { RequestCreateModal } from '@/features/request-create'
import {
  RequestFiltersRow,
  type RequestStatusFilterValue,
} from '@/features/request-filters'
import { RequestSearchField } from '@/features/request-search'
import { AppButton } from '@/shared/ui/button'
import { Box, HStack, useBreakpointValue } from '@chakra-ui/react'
import { useState } from 'react'

const noop = () => undefined

export type RequestsToolbarProps = {
  searchValue: string
  statusFilter: RequestStatusFilterValue
  onlyMine: boolean
  onSearchChange: (value: string) => void
  onStatusChange: (value: RequestStatusFilterValue) => void
  onOnlyMineChange: (value: boolean) => void
}

export function RequestsToolbar({
  searchValue,
  statusFilter,
  onlyMine,
  onSearchChange,
  onStatusChange,
  onOnlyMineChange,
}: RequestsToolbarProps) {
  const isDesktop = useBreakpointValue({ base: false, md: true }) ?? false
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  function handleCreateClick() {
    setMobileSearchOpen(false)
    setCreateModalOpen(true)
  }

  if (isDesktop) {
    return (
      <>
        <Box mt="21" px="40">
          <HStack gap="13" align="center">
            <Box flex="1" minW="0">
              <RequestSearchField value={searchValue} onChange={onSearchChange} />
            </Box>
            <RequestActionsDesktop onExportClick={noop} onCreateClick={handleCreateClick} />
          </HStack>

          <RequestFiltersRow
            status={statusFilter}
            onlyMine={onlyMine}
            onStatusChange={onStatusChange}
            onOnlyMineChange={onOnlyMineChange}
          />
        </Box>

        <RequestCreateModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
      </>
    )
  }

  return (
    <>
      <RequestFiltersRow
        status={statusFilter}
        onlyMine={onlyMine}
        onStatusChange={onStatusChange}
        onOnlyMineChange={onOnlyMineChange}
      />

      <Box
        opacity={mobileSearchOpen ? 0 : 1}
        transitionProperty="opacity"
        transitionDuration="normal"
        transitionTimingFunction="easings.standard"
        pointerEvents={mobileSearchOpen ? 'none' : 'auto'}
      >
        <RequestActionsMobileFloating
          onSearchClick={() => setMobileSearchOpen(true)}
          onCreateClick={handleCreateClick}
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
          <RequestSearchField value={searchValue} onChange={onSearchChange} />
          <AppButton
            variant="softBordered"
            size="floating"
            onClick={() => setMobileSearchOpen(false)}
          >
            Отмена
          </AppButton>
        </HStack>
      </Box>

      <RequestCreateModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </>
  )
}
