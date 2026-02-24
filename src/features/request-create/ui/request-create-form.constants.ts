import type { CreateRequestFormOptions, RequestCreateFormValues } from '@/entities/request/model'
import type { UseFormReturn } from 'react-hook-form'

export const ATTACHMENTS_MAX_FILES = 10

export const ATTACHMENTS_ACCEPT: Record<string, string[]> = {
  'image/*': [],
  'application/pdf': [],
}

export const ATTACHMENTS_INVALID_TYPE_ERROR = 'Разрешены только изображения и PDF'
export const ATTACHMENTS_MAX_FILES_ERROR = `Можно прикрепить не более ${ATTACHMENTS_MAX_FILES} файлов`
export const ATTACHMENTS_REJECTED_ERROR = 'Некоторые файлы не удалось добавить'

type RejectedAttachment = {
  errors: readonly string[]
}

export function getAttachmentRejectionMessage(
  rejectedFiles: readonly RejectedAttachment[],
): string | null {
  const errorCodes = rejectedFiles.flatMap((file) => file.errors)

  if (errorCodes.includes('TOO_MANY_FILES')) {
    return ATTACHMENTS_MAX_FILES_ERROR
  }

  if (errorCodes.includes('FILE_INVALID_TYPE')) {
    return ATTACHMENTS_INVALID_TYPE_ERROR
  }

  if (errorCodes.length > 0) {
    return ATTACHMENTS_REJECTED_ERROR
  }

  return null
}

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
