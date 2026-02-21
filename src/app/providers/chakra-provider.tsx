import { system } from '@/shared/config/theme/system'
import { ChakraProvider } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

export function AppChakraProvider({ children }: PropsWithChildren) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>
}
