import type { AppButtonProps } from '@/shared/ui/button/button.types'
import { Box, Button } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type LeftIconProps = {
  icon?: ReactNode
}

function LeftIcon({ icon }: LeftIconProps) {
  if (!icon) return null

  return (
    <Box as="span" display="inline-flex" alignItems="center" justifyContent="center" aria-hidden>
      {icon}
    </Box>
  )
}

export function AppButton({
  variant = 'soft',
  size = 'desktop',
  leftIcon,
  children,
  ...buttonProps
}: AppButtonProps) {
  return (
    <Button type="button" variant={variant} size={size} {...buttonProps}>
      <LeftIcon icon={leftIcon} />
      <Box as="span" display="inline-flex" alignItems="center" lineHeight="inherit">
        {children}
      </Box>
    </Button>
  )
}
