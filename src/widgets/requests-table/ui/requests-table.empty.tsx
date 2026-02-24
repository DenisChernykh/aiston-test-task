import { EmptyState, VStack } from '@chakra-ui/react'

export function RequestsTableEmpty() {
  return (
    <VStack align="stretch" px={{ base: '16', md: '40' }} pb={{ base: '120', md: '0' }}>
      <EmptyState.Root size="lg" py={{ base: '32', md: '40' }} borderRadius="lg" bg="bg.canvas">
        <EmptyState.Content>
          <EmptyState.Title>Заявок пока нет</EmptyState.Title>
          <EmptyState.Description>
            Попробуйте сменить источник данных или зайдите позже.
          </EmptyState.Description>
        </EmptyState.Content>
      </EmptyState.Root>
    </VStack>
  )
}
