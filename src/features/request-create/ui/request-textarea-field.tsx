import { Field, Textarea } from '@chakra-ui/react'
import type { ChangeEventHandler, FocusEventHandler } from 'react'

type RequestTextareaFieldProps = {
  label: string
  name: string
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  onBlur: FocusEventHandler<HTMLTextAreaElement>
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  errorText?: string
  h: string
  radius: string
  fontSize: string
  lineHeight: string
  placeholderWhiteSpace?: 'normal' | 'pre-wrap'
}

export function RequestTextareaField({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled = false,
  invalid = false,
  errorText,
  h,
  radius,
  fontSize,
  lineHeight,
  placeholderWhiteSpace = 'normal',
}: RequestTextareaFieldProps) {
  return (
    <Field.Root invalid={invalid}>
      <Field.Label fontSize="xs" lineHeight="tight" color="text.primary" mb="8">
        {label}
      </Field.Label>

      <Textarea
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
        h={h}
        px="16"
        py="13"
        resize="none"
        borderWidth="1px"
        borderStyle="solid"
        borderColor={invalid ? 'border.error' : 'border.default'}
        borderRadius={radius}
        bg="bg.field"
        color="text.primary"
        fontSize={fontSize}
        lineHeight={lineHeight}
        placeholder={placeholder}
        _placeholder={{ color: 'text.muted', whiteSpace: placeholderWhiteSpace }}
        _focusVisible={{
          borderColor: 'border.strong',
          boxShadow: '0 0 0 1px var(--chakra-colors-border-strong)',
        }}
      />

      {errorText ? (
        <Field.ErrorText fontSize="xs" lineHeight="tight">
          {errorText}
        </Field.ErrorText>
      ) : null}
    </Field.Root>
  )
}
