import type { CurrentUser } from '@/entities/user/model/types'
import currentUserAvatar from '@/assets/images/current-user-avatar.png'

export const currentUserMock: CurrentUser = {
  id: 'u-1',
  displayName: 'Федоровский Н.',
  avatarUrl: currentUserAvatar,
  unreadCount: 2,
}
