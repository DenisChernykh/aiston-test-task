import { PlusSmallIcon, SearchIcon } from '@/shared/assets/icons'
import { AppButton } from '@/shared/ui/button'
import { VStack } from '@chakra-ui/react'

export type RequestActionsMobileFloatingProps = {
  onSearchClick?: () => void
  onCreateClick?: () => void
}

export function RequestActionsMobileFloating({
  onSearchClick,
  onCreateClick,
}: RequestActionsMobileFloatingProps) {
  return (
    <VStack
      position="fixed"
      inset="0"
      h="100dvh"
      zIndex="overlay"
      pl="10"
      pr="16"
      pb="30"
      pt="30"
      gap="0"
      align="stretch"
      justify="flex-end"
      pointerEvents="none"
      bgImage="linear-gradient(180deg, transparent 76.923%, var(--chakra-colors-bg-mobile-floating) 100%)"
    >
      <VStack align="flex-end" gap="10" pointerEvents="auto">
        <AppButton
          variant="floatingOutline"
          size="floating"
          gap="7"
          fontWeight="medium"
          onClick={onSearchClick}
          leftIcon={<SearchIcon w="iconLg" h="iconLg" color="currentColor" />}
        >
          Поиск
        </AppButton>
        <AppButton
          variant="solidMuted"
          size="floating"
          gap="7"
          onClick={onCreateClick}
          leftIcon={<PlusSmallIcon w="iconSm" h="iconSm" color="currentColor" />}
        >
          Создать новую заявку
        </AppButton>
      </VStack>
    </VStack>
  )
}
