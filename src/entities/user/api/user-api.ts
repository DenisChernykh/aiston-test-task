import { currentUserMock } from '@/entities/user/api/user-db.mock'
import type { CurrentUser } from '@/entities/user/model/types'
import { resolveWithDelay } from '@/shared/lib/fake-api'

export function getCurrentUser(): Promise<CurrentUser> {
  return resolveWithDelay(currentUserMock)
}
