import { getRequests } from '@/entities/request/api'
import type { RequestItem } from '@/entities/request/model/types'
import { useCallback, useEffect, useState } from 'react'

type UseRequestsResult = {
  requests: RequestItem[]
  isLoading: boolean
  error: string | null
  reload: () => Promise<void>
}

export function useRequests(): UseRequestsResult {
  const [requests, setRequests] = useState<RequestItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getRequests()
      setRequests(data)
    } catch {
      setError('Не удалось загрузить заявки')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return { requests, isLoading, error, reload: load }
}
