import { getCreateRequestFormOptions } from '@/entities/request/api'
import type { CreateRequestFormOptions } from '@/entities/request/model'
import { useEffect, useRef, useState } from 'react'

type UseRequestCreateFormOptionsParams = {
  open: boolean
}

type UseRequestCreateFormOptionsResult = {
  options: CreateRequestFormOptions | null
  isLoading: boolean
  error: string | null
  reload: () => Promise<void>
}

export function useRequestCreateFormOptions({
  open,
}: UseRequestCreateFormOptionsParams): UseRequestCreateFormOptionsResult {
  const [options, setOptions] = useState<CreateRequestFormOptions | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const wasOpenRef = useRef(false)

  async function load() {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getCreateRequestFormOptions()
      setOptions(data)
    } catch {
      setOptions(null)
      setError('Не удалось загрузить данные формы')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (open && !wasOpenRef.current) {
      wasOpenRef.current = true
      void load()
      return
    }

    if (!open) {
      wasOpenRef.current = false
    }
  }, [open])

  return { options, isLoading, error, reload: load }
}
