import type { ButtonProps } from '@chakra-ui/react'
import type { ReactNode } from 'react'

export type AppButtonProps = Omit<ButtonProps, 'leftIcon'> & {
  leftIcon?: ReactNode
}
