import type { CurrentUser } from '@/entities/user/model/types'

export const currentUserMock: CurrentUser = {
  id: 'u-1',
  displayName: 'Черных Денис',
  avatarUrl: '/src/shared/assets/images/current-user-avatar.png',
  unreadCount: 2,
}
