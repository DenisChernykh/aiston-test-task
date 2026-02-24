import type { PriorityOption } from '@/entities/request/model'
import { RequestPriorityIcon } from '@/entities/request/ui/request-priority-indicator'
import {
  DESCRIPTION_PLACEHOLDER,
  TOPIC_PLACEHOLDER,
  type RequestCreateFormFieldsSharedProps,
} from '@/features/request-create/ui/request-create-form.constants'
import { RequestDesktopSelectField } from '@/features/request-create/ui/request-native-select-field'
import { RequestTextareaField } from '@/features/request-create/ui/request-textarea-field'
import { HStack, Text, VStack } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

function PriorityOptionContent({ option }: { option: PriorityOption }) {
  return (
    <HStack gap="8" align="center" minW="0">
      <RequestPriorityIcon priority={option.value} />
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

function PriorityOptionMobileContent({ option }: { option: PriorityOption }) {
  return (
    <HStack gap="8" align="center" minW="0" w="full">
      <RequestPriorityIcon priority={option.value} boxSize="iconSm" />
      <VStack align="start" justify="center" gap="0" minW="0" flex="1">
        <Text
          fontSize="xs"
          lineHeight="tight"
          color="text.primary"
          fontWeight="medium"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          w="full"
        >
          {option.label}:
        </Text>
        <Text
          fontSize="xs"
          lineHeight="tight"
          color="text.secondary"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          w="full"
        >
          {option.hint}
        </Text>
      </VStack>
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
            h={isDesktop ? 'fieldPriorityDesktop' : 'fieldPriorityMobile'}
            radius={radius}
            fontSize="xs"
            lineHeight="tight"
            renderDesktopValue={(option) =>
              isDesktop ? (
                <PriorityOptionContent option={option} />
              ) : (
                <PriorityOptionMobileContent option={option} />
              )
            }
            renderDesktopOption={(option) =>
              isDesktop ? (
                <PriorityOptionContent option={option} />
              ) : (
                <PriorityOptionMobileContent option={option} />
              )
            }
          />
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
