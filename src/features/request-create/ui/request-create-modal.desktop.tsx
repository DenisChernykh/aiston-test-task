import type { CreateRequestFormOptions, RequestCreateFormValues } from '@/entities/request/model'
import type { RequestCreateOptionsState } from '@/features/request-create/model'
import {
  RequestCreateDesktopFilesField,
  RequestCreateIssueFields,
  RequestCreateLocationFields,
} from '@/features/request-create/ui/request-create-form-fields'
import { CloseSmallIcon } from '@/shared/assets/icons'
import { AppButton } from '@/shared/ui/button'
import { Dialog, HStack, IconButton, Spinner, Text, VStack } from '@chakra-ui/react'
import type { FormEventHandler } from 'react'
import type { UseFormReturn } from 'react-hook-form'

export type RequestCreateModalDesktopProps = {
  form: UseFormReturn<RequestCreateFormValues>
  options: CreateRequestFormOptions
  optionsState: RequestCreateOptionsState
  onSubmit: FormEventHandler<HTMLFormElement>
  onCancel: () => void
  onRetry: () => void
  isSubmitDisabled: boolean
}

function DesktopLoadingState() {
  return (
    <VStack gap="8" py="40">
      <Spinner size="sm" />
      <Text fontSize="md" lineHeight="sm" color="text.secondary">
        Загружаем данные формы...
      </Text>
    </VStack>
  )
}

function DesktopErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <VStack gap="12" py="40">
      <Text fontSize="md" lineHeight="sm" color="text.secondary">
        Не удалось загрузить данные формы
      </Text>
      <AppButton variant="softBordered" size="desktopModal" onClick={onRetry}>
        Повторить
      </AppButton>
    </VStack>
  )
}

function DesktopEmptyState() {
  return (
    <VStack gap="8" py="40">
      <Text fontSize="md" lineHeight="sm" color="text.secondary">
        Нет данных для заполнения формы
      </Text>
    </VStack>
  )
}

export function RequestCreateModalDesktop({
  form,
  options,
  optionsState,
  onSubmit,
  onCancel,
  onRetry,
  isSubmitDisabled,
}: RequestCreateModalDesktopProps) {
  return (
    <>
      <Dialog.Backdrop bg="bg.overlay" />

      <Dialog.Positioner p="6">
        <Dialog.Content
          w="modalDesktopWidth"
          maxW="calc(100vw - var(--chakra-spacing-12))"
          bg="bg.canvas"
          borderRadius="2xl"
          px="36"
          pt="30"
          pb="40"
          gap="32"
        >
          <Dialog.Header p="0">
            <HStack w="full" align="center" justify="space-between">
              <Dialog.Title fontSize="2xl" lineHeight="lg" fontWeight="medium" color="text.primary">
                Создание заявки
              </Dialog.Title>

              <Dialog.CloseTrigger asChild>
                <IconButton
                  aria-label="Закрыть"
                  variant="ghost"
                  minW="unset"
                  w="modalCloseIcon"
                  h="modalCloseIcon"
                  p="0"
                  color="text.secondary"
                  _hover={{ bg: 'transparent', color: 'text.primary' }}
                >
                  <CloseSmallIcon w="modalCloseIcon" h="modalCloseIcon" />
                </IconButton>
              </Dialog.CloseTrigger>
            </HStack>
          </Dialog.Header>

          <Dialog.Body p="0">
            {optionsState === 'loading' ? <DesktopLoadingState /> : null}
            {optionsState === 'error' ? <DesktopErrorState onRetry={onRetry} /> : null}
            {optionsState === 'empty' ? <DesktopEmptyState /> : null}

            {optionsState === 'ready' ? (
              <form onSubmit={onSubmit}>
                <HStack align="start" gap="32">
                  <VStack w="modalDesktopColumn" align="stretch" gap="46">
                    <RequestCreateLocationFields form={form} options={options} isDesktop />
                  </VStack>

                  <VStack w="modalDesktopColumn" align="stretch" gap="24">
                    <RequestCreateIssueFields form={form} options={options} isDesktop />
                    <RequestCreateDesktopFilesField form={form} />
                  </VStack>
                </HStack>

                <HStack mt="32" gap="17">
                  <AppButton
                    type="submit"
                    variant="solidMuted"
                    size="desktopModal"
                    disabled={isSubmitDisabled}
                  >
                    Создать заявку
                  </AppButton>

                  <AppButton type="button" variant="outline" size="desktopModal" onClick={onCancel}>
                    Отмена
                  </AppButton>
                </HStack>
              </form>
            ) : null}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  )
}
