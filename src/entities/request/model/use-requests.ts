import { getRequests } from '@/entities/request/api'
import type { RequestItem } from '@/entities/request/model/types'
import { useEffect, useRef, useState } from 'react'

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
  const initialLoadDoneRef = useRef(false)

  async function load() {
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
  }

  useEffect(() => {
    if (initialLoadDoneRef.current) {
      return
    }

    initialLoadDoneRef.current = true
    void load()
  })

  return { requests, isLoading, error, reload: load }
}
