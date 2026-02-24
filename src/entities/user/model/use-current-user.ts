import { getCurrentUser } from '@/entities/user/api/user-api'
import type { CurrentUser } from '@/entities/user/model/types'
import { useEffect, useRef, useState } from 'react'

type UseCurrentUserResult = {
  data: CurrentUser | null
  isLoading: boolean
  error: string | null
  reload: () => Promise<void>
}

export function useCurrentUser(): UseCurrentUserResult {
  const [data, setData] = useState<CurrentUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const initialLoadDoneRef = useRef(false)

  async function load() {
    setIsLoading(true)
    setError(null)

    try {
      const userData = await getCurrentUser()
      setData(userData)
    } catch {
      setError('Не удалось загрузить данные о пользователе')
      setData(null)
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

  return { data, isLoading, error, reload: load }
}
