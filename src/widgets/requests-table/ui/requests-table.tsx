import { useRequestsTableViewModel } from '@/widgets/requests-table/model/use-requests-table-view-model'
import { RequestsTableDesktop } from '@/widgets/requests-table/ui/requests-table.desktop'
import { RequestsTableEmpty } from '@/widgets/requests-table/ui/requests-table.empty'
import { RequestsTableError } from '@/widgets/requests-table/ui/requests-table.error'
import { RequestsTableLoading } from '@/widgets/requests-table/ui/requests-table.loading'
import { RequestsTableMobile } from '@/widgets/requests-table/ui/requests-table.mobile'
import { useBreakpointValue } from '@chakra-ui/react'

export function RequestsTable() {
  const isDesktop = useBreakpointValue({ base: false, md: true }) ?? false
  const { requests, groupedRequests, isLoading, error, hasData, reload } =
    useRequestsTableViewModel()

  if (isLoading) {
    return <RequestsTableLoading />
  }

  if (error) {
    return <RequestsTableError message={error} onRetry={() => void reload()} />
  }

  if (!hasData) {
    return <RequestsTableEmpty />
  }

  if (isDesktop) {
    return <RequestsTableDesktop requests={requests} />
  }

  return <RequestsTableMobile groups={groupedRequests} />
}
