import type { CreateRequestFormOptions, RequestCreateFormValues } from '@/entities/request/model'
import { useRequestCreateFormOptions } from '@/features/request-create/model/use-request-create-form-options'
import {
  createRequestFormDefaultValues,
  useRequestCreateForm,
} from '@/features/request-create/model/use-request-create-form'
import { toaster } from '@/shared/ui/toaster'
import type { BaseSyntheticEvent } from 'react'

const EMPTY_OPTIONS: CreateRequestFormOptions = {
  pharmacies: [],
  categories: [],
  priorities: [],
}

export type RequestCreateOptionsState = 'loading' | 'error' | 'empty' | 'ready'

export type UseRequestCreateModalControllerParams = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type OpenChangeDetails = {
  open: boolean
}

export type UseRequestCreateModalControllerResult = {
  form: ReturnType<typeof useRequestCreateForm>
  options: CreateRequestFormOptions
  optionsState: RequestCreateOptionsState
  isSubmitDisabled: boolean
  handleDialogOpenChange: (details: OpenChangeDetails) => void
  handleCancel: () => void
  handleRetry: () => void
  handleSubmit: (event?: BaseSyntheticEvent) => Promise<void>
}

function getOptionsState(params: {
  isLoading: boolean
  error: string | null
  options: CreateRequestFormOptions
}): RequestCreateOptionsState {
  if (params.isLoading) return 'loading'
  if (params.error) return 'error'

  const hasNoOptions =
    params.options.pharmacies.length === 0 &&
    params.options.categories.length === 0 &&
    params.options.priorities.length === 0

  if (hasNoOptions) return 'empty'
  return 'ready'
}

function logCreateRequestFormValues(values: RequestCreateFormValues) {
  console.log('createRequestDraft', {
    ...values,
    attachments: values.attachments.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    })),
  })
}

export function useRequestCreateModalController({
  open,
  onOpenChange,
}: UseRequestCreateModalControllerParams): UseRequestCreateModalControllerResult {
  const form = useRequestCreateForm()
  const { options, isLoading, error, reload } = useRequestCreateFormOptions({ open })

  const resolvedOptions = options ?? EMPTY_OPTIONS
  const optionsState = getOptionsState({ isLoading, error, options: resolvedOptions })

  function resetForm() {
    form.reset(createRequestFormDefaultValues)
  }

  function closeAndReset() {
    resetForm()
    onOpenChange(false)
  }

  function handleDialogOpenChange(details: OpenChangeDetails) {
    if (!details.open) {
      resetForm()
    }

    onOpenChange(details.open)
  }

  function handleRetry() {
    void reload()
  }

  const handleSubmit = form.handleSubmit(async (values) => {
    logCreateRequestFormValues(values)

    toaster.success({
      title: 'Заявка создана',
      description: 'Данные заявки выведены в консоль',
      closable: true,
    })

    closeAndReset()
  })

  return {
    form,
    options: resolvedOptions,
    optionsState,
    isSubmitDisabled: !form.formState.isValid || optionsState !== 'ready',
    handleDialogOpenChange,
    handleCancel: closeAndReset,
    handleRetry,
    handleSubmit,
  }
}
