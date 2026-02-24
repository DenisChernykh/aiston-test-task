import { z } from 'zod'

const ATTACHMENTS_MAX_FILES = 10

const formFileSchema = z.custom<File>(
  (value) => typeof File !== 'undefined' && value instanceof File,
  'Некорректный файл',
)

const attachmentFileSchema = formFileSchema.refine(
  (file) => file.type.startsWith('image/') || file.type === 'application/pdf',
  'Разрешены только изображения и PDF',
)

export const createRequestFormSchema = z.object({
  pharmacyId: z.string().min(1, 'Выберите аптеку'),
  categoryId: z.string().min(1, 'Выберите категорию'),
  topic: z.string().trim().min(3, 'Введите тему заявки'),
  priority: z.enum(['critical', 'high', 'medium', 'low']),
  description: z.string().trim().min(3, 'Введите описание проблемы'),
  isWarranty: z.boolean(),
  attachments: z
    .array(attachmentFileSchema)
    .max(ATTACHMENTS_MAX_FILES, `Можно прикрепить не более ${ATTACHMENTS_MAX_FILES} файлов`),
})

export type CreateRequestFormValues = z.infer<typeof createRequestFormSchema>
