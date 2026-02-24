import type { CurrentUser } from '@/entities/user/model/types'

export const currentUserMock: CurrentUser = {
  id: 'u-1',
  displayName: 'Федоровский Н.',
  avatarUrl: '/src/shared/assets/images/current-user-avatar.png',
  unreadCount: 2,
}
