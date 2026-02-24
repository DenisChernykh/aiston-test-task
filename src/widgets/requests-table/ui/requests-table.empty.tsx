import { AppButton } from '@/shared/ui/button'
import { EmptyState, VStack } from '@chakra-ui/react'

export type RequestsTableEmptyMode = 'noData' | 'noMatches'

export type RequestsTableEmptyProps = {
  mode: RequestsTableEmptyMode
  onResetFilters?: () => void
}

const EMPTY_VIEW_BY_MODE: Record<
  RequestsTableEmptyMode,
  { title: string; description: string; showResetButton: boolean }
> = {
  noData: {
    title: 'Заявок пока нет',
    description: 'Попробуйте сменить источник данных или зайдите позже.',
    showResetButton: false,
  },
  noMatches: {
    title: 'По фильтрам ничего не найдено',
    description: 'Измените условия поиска или сбросьте фильтры.',
    showResetButton: true,
  },
}

export function RequestsTableEmpty({ mode, onResetFilters }: RequestsTableEmptyProps) {
  const view = EMPTY_VIEW_BY_MODE[mode]

  return (
    <VStack align="stretch" px={{ base: '16', md: '40' }} pb={{ base: '120', md: '0' }}>
      <EmptyState.Root size="lg" py={{ base: '32', md: '40' }} borderRadius="lg" bg="bg.canvas">
        <EmptyState.Content>
          <EmptyState.Title>{view.title}</EmptyState.Title>
          <EmptyState.Description>{view.description}</EmptyState.Description>
          {view.showResetButton && onResetFilters ? (
            <AppButton mt="16" variant="softBordered" size="desktop" onClick={onResetFilters}>
              Сбросить фильтры
            </AppButton>
          ) : null}
        </EmptyState.Content>
      </EmptyState.Root>
    </VStack>
  )
}
