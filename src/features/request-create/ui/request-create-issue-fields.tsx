import type { PriorityOption } from '@/entities/request/model'
import { RequestPriorityIcon } from '@/entities/request/ui/request-priority-indicator'
import {
  DESCRIPTION_PLACEHOLDER,
  TOPIC_PLACEHOLDER,
  type RequestCreateFormFieldsSharedProps,
} from '@/features/request-create/ui/request-create-form.constants'
import {
  RequestDesktopSelectField,
  RequestNativeSelectField,
} from '@/features/request-create/ui/request-native-select-field'
import { RequestTextareaField } from '@/features/request-create/ui/request-textarea-field'
import { HStack, Text, VStack } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

function PriorityOptionContent({ option }: { option: PriorityOption }) {
  return (
    <HStack gap="8" align="center" minW="0">
      <RequestPriorityIcon priority={option.value} boxSize="24px" />
      <Text
        fontSize="xs"
        lineHeight="tight"
        minW="0"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        <Text as="span" fontWeight="medium" color="text.primary">
          {option.label}:
        </Text>{' '}
        <Text as="span" color="text.secondary">
          {option.hint}
        </Text>
      </Text>
    </HStack>
  )
}

export function RequestCreateIssueFields({
  form,
  options,
  isDesktop,
  disabled = false,
}: RequestCreateFormFieldsSharedProps) {
  const fieldFontSize = isDesktop ? 'md' : 'xs'
  const fieldLineHeight = isDesktop ? 'sm' : 'xs'
  const radius = isDesktop ? 'lg' : 'md'

  return (
    <VStack align="stretch" gap="24">
      <Controller
        name="topic"
        control={form.control}
        render={({ field, fieldState }) => (
          <RequestTextareaField
            label="Тема заявки"
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            placeholder={TOPIC_PLACEHOLDER}
            disabled={disabled}
            invalid={fieldState.invalid}
            errorText={fieldState.error?.message}
            h="modalTopicField"
            radius={radius}
            fontSize={fieldFontSize}
            lineHeight={fieldLineHeight}
          />
        )}
      />

      <Controller
        name="priority"
        control={form.control}
        render={({ field, fieldState }) => (
          isDesktop ? (
            <RequestDesktopSelectField
              label="Приоритет"
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              options={options.priorities}
              disabled={disabled}
              invalid={fieldState.invalid}
              errorText={fieldState.error?.message}
              h="fieldPriorityDesktop"
              radius={radius}
              fontSize="xs"
              lineHeight="tight"
              renderDesktopValue={(option) => <PriorityOptionContent option={option} />}
              renderDesktopOption={(option) => <PriorityOptionContent option={option} />}
            />
          ) : (
            <RequestNativeSelectField
              label="Приоритет"
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              options={options.priorities}
              disabled={disabled}
              invalid={fieldState.invalid}
              errorText={fieldState.error?.message}
              h="fieldPriorityMobile"
              radius={radius}
              fontSize="xs"
              lineHeight="tight"
              renderOptionLabel={(item) => `◇ ${item.label}: ${item.hint}`}
            />
          )
        )}
      />

      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <RequestTextareaField
            label="Описание проблемы"
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            placeholder={DESCRIPTION_PLACEHOLDER}
            disabled={disabled}
            invalid={fieldState.invalid}
            errorText={fieldState.error?.message}
            h="modalDescriptionField"
            radius={radius}
            fontSize={fieldFontSize}
            lineHeight={fieldLineHeight}
            placeholderWhiteSpace="pre-wrap"
          />
        )}
      />
    </VStack>
  )
}
