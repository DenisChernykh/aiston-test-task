import { requestsMockDb } from '@/entities/request/api/request-db.mock'
import type { RequestItem } from '@/entities/request/model'
import { rejectWithDelay, resolveWithDelay } from '@/shared/lib/fake-api'

type RequestsState = 'filled' | 'empty' | 'error'

const DEFAULT_DELAY_MS = 350

function getRequestsState(): RequestsState {
  if (typeof window === 'undefined') {
    return 'filled'
  }

  const value = new URLSearchParams(window.location.search).get('requestsState')

  if (value === 'empty' || value === 'error' || value === 'filled') {
    return value
  }

  return 'filled'
}

export function getRequests(): Promise<RequestItem[]> {
  const state = getRequestsState()

  if (state === 'empty') {
    return resolveWithDelay([], DEFAULT_DELAY_MS)
  }

  if (state === 'error') {
    return rejectWithDelay(new Error('Не удалось загрузить заявки'), DEFAULT_DELAY_MS)
  }
  return resolveWithDelay(requestsMockDb, DEFAULT_DELAY_MS)
}
