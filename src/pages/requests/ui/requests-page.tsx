import { Header } from '@/widgets/header'
import { RequestsToolbar } from '@/widgets/requests-toolbar'
import { Box } from '@chakra-ui/react'

export function RequestsPage() {
  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: '130', md: '0' }}>
      <Header />
      <RequestsToolbar />
    </Box>
  )
}
