import {
  IMAGE_ACCEPT,
  type RequestCreateFilesFieldProps,
} from '@/features/request-create/ui/request-create-form.constants'
import { AddIcon } from '@/shared/assets/icons'
import { Box, FileUpload, HStack, Text, VStack } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

export function RequestCreateMobileAttachField({
  form,
  disabled = false,
}: RequestCreateFilesFieldProps) {
  return (
    <Controller
      name="attachments"
      control={form.control}
      render={({ field, fieldState }) => (
        <VStack align="stretch" gap="6">
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
              h="buttonMobile"
              px="20"
              borderRadius="xs"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="transparent"
              bg="bg.surface"
              _hover={{ bg: 'bg.surface' }}
              _focusVisible={{
                outline: 'none',
                boxShadow: '0 0 0 3px var(--chakra-colors-button-focusRing)',
              }}
            >
              <HStack gap="12">
                <AddIcon w="iconLg" h="iconLg" color="text.primary" />
                <Text fontSize="lg" lineHeight="md" fontWeight="medium" color="text.primary">
                  Прикрепить файлы
                </Text>
              </HStack>
            </FileUpload.Trigger>
          </FileUpload.Root>

          {field.value.length > 0 ? (
            <Box px="2">
              <Text fontSize="xs" lineHeight="tight" color="text.secondary">
                Выбрано изображений: {field.value.length}
              </Text>
            </Box>
          ) : null}

          {fieldState.error?.message ? (
            <Text fontSize="xs" lineHeight="tight" color="text.danger">
              {fieldState.error.message}
            </Text>
          ) : null}
        </VStack>
      )}
    />
  )
}
