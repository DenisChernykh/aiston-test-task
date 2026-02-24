import type { CreateRequestFormOptions, RequestCreateFormValues } from '@/entities/request/model'
import type { RequestCreateOptionsState } from '@/features/request-create/model'
import {
  RequestCreateIssueFields,
  RequestCreateLocationFields,
  RequestCreateMobileAttachField,
} from '@/features/request-create/ui/request-create-form-fields'
import { ArrowBackIcon } from '@/shared/assets/icons'
import { AppButton } from '@/shared/ui/button'
import { Dialog, HStack, IconButton, Spinner, Text, VStack } from '@chakra-ui/react'
import type { FormEventHandler } from 'react'
import type { UseFormReturn } from 'react-hook-form'

const MOBILE_FORM_ID = 'request-create-mobile-form'

export type RequestCreateModalMobileProps = {
  form: UseFormReturn<RequestCreateFormValues>
  options: CreateRequestFormOptions
  optionsState: RequestCreateOptionsState
  onSubmit: FormEventHandler<HTMLFormElement>
  onRetry: () => void
  isSubmitDisabled: boolean
}

function MobileLoadingState() {
  return (
    <VStack gap="8" py="40">
      <Spinner size="sm" />
      <Text fontSize="md" lineHeight="sm" color="text.secondary">
        Загружаем данные формы...
      </Text>
    </VStack>
  )
}

function MobileErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <VStack gap="12" py="40" px="16">
      <Text fontSize="md" lineHeight="sm" color="text.secondary" textAlign="center">
        Не удалось загрузить данные формы
      </Text>
      <AppButton variant="softBordered" size="mobile" w="full" onClick={onRetry}>
        Повторить
      </AppButton>
    </VStack>
  )
}

function MobileEmptyState() {
  return (
    <VStack gap="8" py="40" px="16">
      <Text fontSize="md" lineHeight="sm" color="text.secondary" textAlign="center">
        Нет данных для заполнения формы
      </Text>
    </VStack>
  )
}

export function RequestCreateModalMobile({
  form,
  options,
  optionsState,
  onSubmit,
  onRetry,
  isSubmitDisabled,
}: RequestCreateModalMobileProps) {
  return (
    <>
      <Dialog.Backdrop bg="bg.overlay" />

      <Dialog.Positioner p="0">
        <Dialog.Content
          w="100vw"
          h="100dvh"
          maxH="100dvh"
          borderRadius="0"
          bg="bg.canvas"
          overflow="hidden"
          display="flex"
          flexDirection="column"
        >
          <Dialog.Header
            h="headerMobile"
            px="16"
            py="24"
            borderBottomWidth="1px"
            borderColor="border.muted"
          >
            <HStack w="full" align="center" gap="10">
              <Dialog.CloseTrigger asChild>
                <IconButton
                  aria-label="Назад"
                  variant="ghost"
                  minW="unset"
                  w="iconLg"
                  h="iconLg"
                  p="0"
                  color="text.primary"
                  _hover={{ bg: 'transparent' }}
                >
                  <ArrowBackIcon w="iconLg" h="iconLg" />
                </IconButton>
              </Dialog.CloseTrigger>

              <Dialog.Title
                fontSize="xl"
                lineHeight="md"
                fontWeight="semibold"
                letterSpacing="titleMobile"
                color="text.mobilePrimary"
              >
                Создание заявки
              </Dialog.Title>
            </HStack>
          </Dialog.Header>

          <Dialog.Body p="0" flex="1" overflowY="auto">
            {optionsState === 'loading' ? <MobileLoadingState /> : null}
            {optionsState === 'error' ? <MobileErrorState onRetry={onRetry} /> : null}
            {optionsState === 'empty' ? <MobileEmptyState /> : null}

            {optionsState === 'ready' ? (
              <form id={MOBILE_FORM_ID} onSubmit={onSubmit}>
                <VStack
                  align="stretch"
                  w="modalMobileContent"
                  maxW="100%"
                  mx="auto"
                  px="16"
                  pt="24"
                  pb="130"
                  gap="24"
                >
                  <RequestCreateLocationFields form={form} options={options} isDesktop={false} />
                  <RequestCreateIssueFields form={form} options={options} isDesktop={false} />
                </VStack>
              </form>
            ) : null}
          </Dialog.Body>

          {optionsState === 'ready' ? (
            <Dialog.Footer p="10" px="16" bg="bg.canvas" borderTopWidth="0" flexShrink={0}>
              <VStack w="full" gap="10">
                <RequestCreateMobileAttachField form={form} />
                <AppButton
                  type="submit"
                  form={MOBILE_FORM_ID}
                  variant="solidMuted"
                  size="mobile"
                  w="full"
                  disabled={isSubmitDisabled}
                >
                  Создать заявку
                </AppButton>
              </VStack>
            </Dialog.Footer>
          ) : null}
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  )
}
