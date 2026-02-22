import { getCurrentUser } from '@/entities/user/api/user-api'
import type { CurrentUser } from '@/entities/user/model/types'
import { useCallback, useEffect, useState } from 'react'

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

  const load = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return { data, isLoading, error, reload: load }
}
