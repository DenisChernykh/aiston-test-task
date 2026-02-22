import { requestsMockDb } from '@/entities/request/api/request-db.mock'
import type { RequestItem } from '@/entities/request/model'
import { resolveWithDelay } from '@/shared/lib/fake-api'

export function getRequests(): Promise<RequestItem[]> {
  return resolveWithDelay(requestsMockDb)
}
