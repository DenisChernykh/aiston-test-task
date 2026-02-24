import type { CurrentUser } from '@/entities/user'
import { ChevronDownIcon } from '@/shared/assets/icons'
import { UserBlock } from '@/widgets/header/ui/user-block'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'

type HeaderMobileProps = {
  user: CurrentUser | null
  isLoading: boolean
}

export function HeaderMobile({ user, isLoading }: HeaderMobileProps) {
  return (
    <Flex
      h="headerMobile"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderColor="border.muted"
      px="16"
      py="16"
      align="center"
      justify="space-between"
    >
      <HStack gap="2" align="center">
        <Text
          color="text.mobilePrimary"
          fontSize="xl"
          lineHeight="md"
          fontWeight="semibold"
          letterSpacing="titleMobile"
        >
          Заявки
        </Text>

        <Box
          as="span"
          w="24px"
          h="24px"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <ChevronDownIcon w="7px" h="5px" color="text.mobilePrimary" />
        </Box>
      </HStack>
      <Box h="40" display="flex" alignItems="center" justifyContent="flex-end">
        <UserBlock user={user} isLoading={isLoading} />
      </Box>
    </Flex>
  )
}
