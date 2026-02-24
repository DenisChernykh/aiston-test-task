import {
  DEFAULT_REQUEST_STATUS_FILTER,
  type RequestStatusFilterValue,
} from '@/features/request-filters'
import { Header } from '@/widgets/header'
import { RequestsTable } from '@/widgets/requests-table'
import { RequestsToolbar } from '@/widgets/requests-toolbar'
import { Box, VStack } from '@chakra-ui/react'
import { useState } from 'react'

export function RequestsPage() {
  const [statusFilter, setStatusFilter] = useState<RequestStatusFilterValue>(
    DEFAULT_REQUEST_STATUS_FILTER,
  )
  const [onlyMine, setOnlyMine] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  function resetFilters() {
    setStatusFilter(DEFAULT_REQUEST_STATUS_FILTER)
    setOnlyMine(false)
    setSearchValue('')
  }

  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: '130', md: '0' }}>
      <Header />
      <VStack align="stretch" gap={{ base: '12', md: '0' }}>
        <RequestsToolbar
          searchValue={searchValue}
          statusFilter={statusFilter}
          onlyMine={onlyMine}
          onSearchChange={setSearchValue}
          onStatusChange={setStatusFilter}
          onOnlyMineChange={setOnlyMine}
        />
        <Box display={{ base: 'none', md: 'block' }} h="1px" bg="border.subtle" />
        <Box mt={{ base: '0', md: '31px' }}>
          <RequestsTable
            filters={{
              status: statusFilter,
              onlyMine,
              search: searchValue,
            }}
            onResetFilters={resetFilters}
          />
        </Box>
      </VStack>
    </Box>
  )
}
