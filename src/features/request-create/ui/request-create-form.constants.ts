import type { CreateRequestFormOptions, RequestCreateFormValues } from '@/entities/request/model'
import type { UseFormReturn } from 'react-hook-form'

export const IMAGE_ACCEPT: Record<string, string[]> = { 'image/*': [] }

export const TOPIC_PLACEHOLDER =
  'Дайте заявке краткое название: например, сломался холодильник или не работает кондиционер'

export const DESCRIPTION_PLACEHOLDER = [
  'Кратко опишите проблему:',
  '',
  '• что случилось?',
  '• дата и время произошедшего?',
  '• сколько длится проблема?',
  '• насколько она влияет на вашу работу?',
].join('\n')

export type RequestCreateFormFieldsSharedProps = {
  form: UseFormReturn<RequestCreateFormValues>
  options: CreateRequestFormOptions
  isDesktop: boolean
  disabled?: boolean
}

export type RequestCreateFilesFieldProps = {
  form: UseFormReturn<RequestCreateFormValues>
  disabled?: boolean
}
