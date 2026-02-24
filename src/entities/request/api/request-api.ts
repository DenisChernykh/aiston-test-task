import {
  requestCreateFormOptionsEmptyMock,
  requestCreateFormOptionsMock,
  requestsMockDb,
} from '@/entities/request/api/request-db.mock'
import type { CreateRequestFormOptions, RequestItem } from '@/entities/request/model'
import { rejectWithDelay, resolveWithDelay } from '@/shared/lib/fake-api'

type RequestsState = 'filled' | 'empty' | 'error'
type CreateRequestState = 'filled' | 'empty' | 'error'

const DEFAULT_DELAY_MS = 350
const CREATE_FORM_DELAY_MS = 450

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

function getCreateRequestState(): CreateRequestState {
  if (typeof window === 'undefined') {
    return 'filled'
  }

  const value = new URLSearchParams(window.location.search).get('createRequestState')
  if (value === 'empty' || value === 'error' || value === 'filled') return value

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

export function getCreateRequestFormOptions(): Promise<CreateRequestFormOptions> {
  const state = getCreateRequestState()

  if (state === 'empty') {
    return resolveWithDelay(requestCreateFormOptionsEmptyMock, CREATE_FORM_DELAY_MS)
  }
  if (state === 'error') {
    return rejectWithDelay(
      new Error('Не удалось загрузить данные формы создания заявки'),
      CREATE_FORM_DELAY_MS,
    )
  }
  return resolveWithDelay(requestCreateFormOptionsMock, CREATE_FORM_DELAY_MS)
}
