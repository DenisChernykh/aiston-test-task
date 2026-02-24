import { Header } from '@/widgets/header'
import { RequestsTable } from '@/widgets/requests-table'
import { RequestsToolbar } from '@/widgets/requests-toolbar'
import { Box, VStack } from '@chakra-ui/react'

export function RequestsPage() {
  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: '130', md: '0' }}>
      <Header />
      <VStack align="stretch" gap={{ base: '12', md: '0' }}>
        <RequestsToolbar />
        <RequestsTable />
      </VStack>
    </Box>
  )
}
