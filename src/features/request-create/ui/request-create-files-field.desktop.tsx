import {
  IMAGE_ACCEPT,
  type RequestCreateFilesFieldProps,
} from '@/features/request-create/ui/request-create-form.constants'
import { UploadImageIcon } from '@/shared/assets/icons'
import { Field, FileUpload, Text, VStack } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

export function RequestCreateDesktopFilesField({
  form,
  disabled = false,
}: RequestCreateFilesFieldProps) {
  return (
    <Controller
      name="attachments"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field.Root invalid={fieldState.invalid} disabled={disabled}>
          <Field.Label fontSize="xs" lineHeight="tight" color="text.primary" mb="8">
            Прикрепите файлы
          </Field.Label>

          <FileUpload.Root
            acceptedFiles={field.value}
            onFileChange={(details) => field.onChange(details.acceptedFiles)}
            accept={IMAGE_ACCEPT}
            maxFiles={10}
            disabled={disabled}
          >
            <FileUpload.HiddenInput />

            <FileUpload.Trigger
              type="button"
              w="full"
              h="modalDropzone"
              borderWidth="1px"
              borderStyle="dashed"
              borderColor={fieldState.invalid ? 'border.error' : 'border.default'}
              borderRadius="xl"
              bg="bg.field"
              px="16"
              py="8"
              _hover={{ bg: 'bg.surface' }}
              _focusVisible={{
                outline: 'none',
                borderColor: 'border.strong',
                boxShadow: '0 0 0 1px var(--chakra-colors-border-strong)',
              }}
            >
              <VStack gap="8">
                <Text fontSize="md" lineHeight="sm" fontWeight="light" color="text.primary">
                  Выберите или перетащите фото
                </Text>
                <UploadImageIcon w="iconLg" h="iconLg" color="text.primary" />
              </VStack>
            </FileUpload.Trigger>
          </FileUpload.Root>

          {field.value.length > 0 ? (
            <VStack align="stretch" mt="8" gap="4">
              {field.value.map((file) => (
                <Text
                  key={`${file.name}-${file.lastModified}`}
                  fontSize="xs"
                  lineHeight="tight"
                  color="text.secondary"
                >
                  {file.name}
                </Text>
              ))}
            </VStack>
          ) : null}

          <Field.ErrorText fontSize="xs" lineHeight="tight">
            {fieldState.error?.message}
          </Field.ErrorText>
        </Field.Root>
      )}
    />
  )
}
