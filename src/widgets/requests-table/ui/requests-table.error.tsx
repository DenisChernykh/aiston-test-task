import { AppButton } from '@/shared/ui/button'
import { EmptyState, VStack } from '@chakra-ui/react'

export type RequestsTableErrorProps = {
  message: string
  onRetry: () => void
}

export function RequestsTableError({ message, onRetry }: RequestsTableErrorProps) {
  return (
    <VStack align="stretch" px={{ base: '16', md: '40' }} pb={{ base: '120', md: '0' }}>
      <EmptyState.Root size="lg" py={{ base: '32', md: '40' }} borderRadius="lg" bg="bg.canvas">
        <EmptyState.Content>
          <EmptyState.Title>Ошибка загрузки</EmptyState.Title>
          <EmptyState.Description>{message}</EmptyState.Description>
          <AppButton mt="16" variant="softBordered" size="desktop" onClick={onRetry}>
            Повторить
          </AppButton>
        </EmptyState.Content>
      </EmptyState.Root>
    </VStack>
  )
}
