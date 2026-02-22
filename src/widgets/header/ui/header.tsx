import { useCurrentUser } from '@/entities/user'
import { HeaderDesktop } from '@/widgets/header/ui/header.desktop'
import { HeaderMobile } from '@/widgets/header/ui/header.mobile'
import { useBreakpointValue } from '@chakra-ui/react'

export function Header() {
  const { data, isLoading } = useCurrentUser()
  const isDesktop = useBreakpointValue({ base: false, lg: true }) ?? false

  const handleLogout = () => {
    console.log('[header] logout clicked', { userId: data?.id ?? null })
  }

  if (isDesktop) {
    return <HeaderDesktop user={data} isLoading={isLoading} onLogout={handleLogout} />
  }

  return <HeaderMobile user={data} isLoading={isLoading} />
}
