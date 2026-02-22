import type { CurrentUser } from '@/entities/user'
import { LogoutIcon } from '@/shared/assets/icons'
import { AppButton } from '@/shared/ui/button'
import { DesktopNav } from '@/widgets/header/ui/desktop-nav'
import { UserBlock } from '@/widgets/header/ui/user-block'
import { Flex, HStack } from '@chakra-ui/react'

type HeaderDesktopProps = {
  user: CurrentUser | null
  isLoading: boolean
  onLogout: () => void
}

export function HeaderDesktop({ user, isLoading, onLogout }: HeaderDesktopProps) {
  return (
    <Flex
      h="headerDesktop"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderColor="border.subtle"
      align="center"
      justify="space-between"
      pl="130"
      pr="34"
    >
      <DesktopNav />
      <HStack gap="27">
        <UserBlock user={user} isLoading={isLoading} />
        <AppButton
          variant="softBordered"
          size="desktop"
          onClick={onLogout}
          minW="exitButtonDesktop"
          gap="4"
          px="20"
          leftIcon={<LogoutIcon w="iconLg" h="iconLg" />}
        >
          Выйти
        </AppButton>
      </HStack>
    </Flex>
  )
}
