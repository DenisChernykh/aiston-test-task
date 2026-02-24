import { z } from 'zod'

const formFileSchema = z.custom<File>(
  (value) => typeof File !== 'undefined' && value instanceof File,
  'Некорректный файл',
)

const imageFileSchema = formFileSchema.refine(
  (file) => file.type.startsWith('image/'),
  'Разрешены только изображения',
)

export const createRequestFormSchema = z.object({
  pharmacyId: z.string().min(1, 'Выберите аптеку'),
  categoryId: z.string().min(1, 'Выберите категорию'),
  topic: z.string().trim().min(3, 'Введите тему заявки'),
  priority: z.enum(['critical', 'high', 'medium', 'low']),
  description: z.string().trim().min(3, 'Введите описание проблемы'),
  isWarranty: z.boolean(),
  attachments: z.array(imageFileSchema).max(10, 'Можно прикрепить не более 10 изображений'),
})

export type CreateRequestFormValues = z.infer<typeof createRequestFormSchema>
