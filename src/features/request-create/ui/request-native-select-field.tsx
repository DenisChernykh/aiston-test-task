import { ChevronDownIcon } from '@/shared/assets/icons'
import { Field, NativeSelect } from '@chakra-ui/react'

type BaseOption<TValue extends string = string> = {
  value: TValue
  label: string
}

type RequestNativeSelectFieldProps<TValue extends string, TOption extends BaseOption<TValue>> = {
  label: string
  name: string
  value: TValue | ''
  onChange: (value: TValue) => void
  onBlur: () => void
  options: TOption[]
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  errorText?: string
  h: string
  radius: string
  fontSize: string
  lineHeight: string
  renderOptionLabel?: (option: TOption) => string
}

export function RequestNativeSelectField<
  TValue extends string,
  TOption extends BaseOption<TValue>,
>({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  disabled = false,
  invalid = false,
  errorText,
  h,
  radius,
  fontSize,
  lineHeight,
  renderOptionLabel,
}: RequestNativeSelectFieldProps<TValue, TOption>) {
  return (
    <Field.Root invalid={invalid}>
      <Field.Label fontSize="xs" lineHeight="tight" color="text.primary" mb="8">
        {label}
      </Field.Label>
      <NativeSelect.Root disabled={disabled} invalid={invalid}>
        <NativeSelect.Field
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={(event) => onChange(event.currentTarget.value as TValue)}
          h={h}
          px="16"
          pr="40"
          borderWidth="1px"
          borderStyle="solid"
          borderColor={invalid ? 'border.error' : 'border.default'}
          borderRadius={radius}
          bg="bg.field"
          color={value ? 'text.primary' : 'text.muted'}
          fontSize={fontSize}
          lineHeight={lineHeight}
          appearance="none"
          _focusVisible={{
            borderColor: 'border.strong',
            boxShadow: '0 0 0 1px var(--chakra-colors-border-strong)',
          }}
          _disabled={{
            color: 'text.muted',
            cursor: 'not-allowed',
          }}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {renderOptionLabel ? renderOptionLabel(option) : option.label}
            </option>
          ))}
        </NativeSelect.Field>

        <NativeSelect.Indicator insetEnd="16" color="text.primary">
          <ChevronDownIcon w="10" h="7" />
        </NativeSelect.Indicator>
      </NativeSelect.Root>

      {errorText ? (
        <Field.ErrorText fontSize="xs" lineHeight="tight">
          {errorText}
        </Field.ErrorText>
      ) : null}
    </Field.Root>
  )
}
