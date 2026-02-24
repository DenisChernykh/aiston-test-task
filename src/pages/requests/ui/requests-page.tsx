import { useRequestsPageController } from '@/pages/requests/model'
import { Header } from '@/widgets/header'
import { RequestsTable } from '@/widgets/requests-table'
import { RequestsToolbar } from '@/widgets/requests-toolbar'
import { Box, VStack } from '@chakra-ui/react'

export function RequestsPage() {
  const { toolbarProps, tableProps } = useRequestsPageController()

  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: '130', md: '0' }}>
      <Header />
      <VStack align="stretch" gap={{ base: '12', md: '0' }}>
        <RequestsToolbar {...toolbarProps} />
        <Box display={{ base: 'none', md: 'block' }} h="1px" bg="border.subtle" />
        <Box mt={{ base: '0', md: '31px' }}>
          <RequestsTable {...tableProps} />
        </Box>
      </VStack>
    </Box>
  )
}
