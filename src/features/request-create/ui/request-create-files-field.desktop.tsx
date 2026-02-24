import {
  ATTACHMENTS_ACCEPT,
  ATTACHMENTS_MAX_FILES,
  getAttachmentRejectionMessage,
  type RequestCreateFilesFieldProps,
} from '@/features/request-create/ui/request-create-form.constants'
import { UploadImageIcon } from '@/shared/assets/icons'
import { Box, Field, FileUpload, HStack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

const ATTACHMENT_PREVIEW_SIZE = '40px'

function isImageAttachment(file: File): boolean {
  return file.type.startsWith('image/')
}

function AttachmentPreview({ file }: { file: File }) {
  const isImage = isImageAttachment(file)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!isImage) return

    const reader = new FileReader()
    let isCancelled = false

    reader.onload = () => {
      if (isCancelled) return
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result)
      }
    }

    reader.readAsDataURL(file)

    return () => {
      isCancelled = true
      if (reader.readyState === FileReader.LOADING) {
        reader.abort()
      }
    }
  }, [file, isImage])

  return (
    <HStack align="center" gap="8">
      {isImage && imageUrl ? (
        <Box
          as="img"
          src={imageUrl}
          alt={file.name}
          w={ATTACHMENT_PREVIEW_SIZE}
          h={ATTACHMENT_PREVIEW_SIZE}
          borderRadius="sm"
          objectFit="cover"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="border.subtle"
          flexShrink={0}
        />
      ) : (
        <Box
          w={ATTACHMENT_PREVIEW_SIZE}
          h={ATTACHMENT_PREVIEW_SIZE}
          borderRadius="sm"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="border.subtle"
          bg="bg.surface"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Text fontSize="xs" lineHeight="tight" fontWeight="medium" color="text.secondary">
            PDF
          </Text>
        </Box>
      )}

      <Text fontSize="xs" lineHeight="tight" color="text.secondary" minW="0" wordBreak="break-all">
        {file.name}
      </Text>
    </HStack>
  )
}

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
            onFileChange={(details) => {
              field.onChange(details.acceptedFiles)

              const rejectionMessage = getAttachmentRejectionMessage(details.rejectedFiles)

              if (rejectionMessage) {
                form.setError('attachments', { type: 'manual', message: rejectionMessage })
                return
              }

              form.clearErrors('attachments')
            }}
            accept={ATTACHMENTS_ACCEPT}
            maxFiles={ATTACHMENTS_MAX_FILES}
            disabled={disabled}
          >
            <FileUpload.HiddenInput />

            <FileUpload.Dropzone
              w="full"
              h="modalDropzone"
              minH="modalDropzone"
              maxH="modalDropzone"
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
              css={{
                '&[data-dragging]': {
                  borderColor: 'var(--chakra-colors-border-strong)',
                  backgroundColor: 'var(--chakra-colors-bg-surface)',
                },
              }}
            >
              <VStack gap="8">
                <Text fontSize="md" lineHeight="sm" fontWeight="light" color="text.primary">
                  Выберите или перетащите фото или файл
                </Text>
                <UploadImageIcon w="iconLg" h="iconLg" color="text.primary" />
              </VStack>
            </FileUpload.Dropzone>
          </FileUpload.Root>

          {field.value.length > 0 ? (
            <VStack align="stretch" mt="8" gap="4">
              {field.value.map((file) => (
                <AttachmentPreview key={`${file.name}-${file.lastModified}`} file={file} />
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
