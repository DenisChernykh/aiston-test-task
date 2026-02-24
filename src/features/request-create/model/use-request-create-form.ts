import type { RequestCreateFormValues } from '@/entities/request/model'
import {
  createRequestFormSchema,
  type CreateRequestFormValues,
} from '@/features/request-create/model/create-request-form.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const createRequestFormDefaultValues: CreateRequestFormValues = {
  pharmacyId: '',
  categoryId: '',
  topic: '',
  priority: 'medium',
  description: '',
  isWarranty: false,
  attachments: [],
}

export function useRequestCreateForm(overrides?: Partial<RequestCreateFormValues>) {
  return useForm<RequestCreateFormValues>({
    resolver: zodResolver(createRequestFormSchema),
    defaultValues: { ...createRequestFormDefaultValues, ...overrides },
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
}
