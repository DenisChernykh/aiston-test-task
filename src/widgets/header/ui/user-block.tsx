import type { CurrentUser } from '@/entities/user'
import { UserCircleIcon } from '@/shared/assets/icons'
import { Avatar, Badge, Box, Image, SkeletonCircle } from '@chakra-ui/react'

type DesktopUserBlockProps = {
  user: CurrentUser | null
  isLoading: boolean
}

export function UserBlock({ user, isLoading }: DesktopUserBlockProps) {
  if (isLoading) {
    return (
      <Box position="relative" w="avatarMd" h="avatarMd">
        <SkeletonCircle boxSize="avatarMd" />
      </Box>
    )
  }

  const viewUser: CurrentUser = user ?? {
    id: 'fallback',
    displayName: 'Пользователь',
    unreadCount: 0,
    avatarUrl: null,
  }

  return (
    <Box position="relative" w="avatarMd" h="avatarMd">
      <Avatar.Root w="avatarMd" h="avatarMd">
        {renderAvatarContent(viewUser.displayName, viewUser.avatarUrl)}
      </Avatar.Root>
      {renderUnreadBadge(viewUser.unreadCount)}
    </Box>
  )
}

function renderAvatarContent(userName: string, avatarUrl: string | null) {
  if (avatarUrl) {
    return (
      <Avatar.Image asChild>
        <Image src={avatarUrl} alt={userName} />
      </Avatar.Image>
    )
  }
  return (
    <Avatar.Fallback>
      <UserCircleIcon w="iconLg" h="iconLg" color="text.muted" />
    </Avatar.Fallback>
  )
}

function renderUnreadBadge(unreadCount: number) {
  if (unreadCount <= 0) return null

  return (
    <Badge
      position="absolute"
      right="-9"
      bottom="-4"
      minW="badgeSm"
      h="badgeSm"
      px="0"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
      bg="notification.unreadBg"
      color="notification.unreadFg"
      fontSize="sm"
      lineHeight="xs"
      fontWeight={{ base: 'bold', lg: 'semibold' }}
    >
      {unreadCount}
    </Badge>
  )
}
