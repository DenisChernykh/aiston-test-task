import { ChevronDownIcon } from '@/shared/assets/icons'
import { Box, HStack, Text } from '@chakra-ui/react'

export function DesktopNav() {
  return (
    <HStack gap="35">
      <HStack gap="14">
        <Text color="text.primary" fontSize="lg" lineHeight="md" fontWeight="regular">
          Заявки
        </Text>
        <Text color="text.muted" fontSize="lg" lineHeight="md" fontWeight="regular">
          Отчеты
        </Text>
      </HStack>

      <HStack gap="4">
        <Text color="text.muted" fontSize="lg" lineHeight="md" fontWeight="regular">
          Справочники
        </Text>
        <Box as="span" display="inline-flex" alignItems="center" justifyContent="center" mt="2">
          <ChevronDownIcon w="7px" h="5px" color="text.primary" />
        </Box>
      </HStack>
    </HStack>
  )
}
