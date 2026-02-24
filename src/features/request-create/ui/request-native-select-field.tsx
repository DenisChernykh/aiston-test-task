import { ChevronDownIcon, ChevronDownStrokeIcon } from '@/shared/assets/icons'
import { Field, NativeSelect, Portal, Select, Text, createListCollection } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type BaseOption<TValue extends string = string> = {
  value: TValue
  label: string
}

type RequestSelectFieldProps<TValue extends string, TOption extends BaseOption<TValue>> = {
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
  renderDesktopValue?: (option: TOption) => ReactNode
  renderDesktopOption?: (option: TOption) => ReactNode
}

function getOptionLabel<TValue extends string, TOption extends BaseOption<TValue>>(
  option: TOption,
  renderOptionLabel?: (option: TOption) => string,
): string {
  return renderOptionLabel ? renderOptionLabel(option) : option.label
}

export function RequestDesktopSelectField<
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
  renderDesktopValue,
  renderDesktopOption,
}: RequestSelectFieldProps<TValue, TOption>) {
  const collection = createListCollection<TOption>({
    items: options,
    itemToValue: (item) => item.value,
    itemToString: (item) => getOptionLabel(item, renderOptionLabel),
  })

  const selectedOption = options.find((option) => option.value === value)

  return (
    <Field.Root invalid={invalid} disabled={disabled}>
      <Field.Label fontSize="xs" lineHeight="tight" color="text.primary" mb="8">
        {label}
      </Field.Label>

      <Select.Root
        collection={collection}
        value={value ? [value] : []}
        disabled={disabled}
        invalid={invalid}
        positioning={{ sameWidth: true }}
        onValueChange={(details) => {
          const nextValue = details.value[0]
          if (nextValue) {
            onChange(nextValue as TValue)
          }
        }}
        onOpenChange={(details) => {
          if (!details.open) {
            onBlur()
          }
        }}
      >
        <Select.HiddenSelect name={name} />
        <Select.Control>
          <Select.Trigger
            h={h}
            px="16"
            pr="40"
            borderWidth="1px"
            borderStyle="solid"
            borderColor={invalid ? 'border.error' : 'border.default'}
            borderRadius={radius}
            bg="bg.field"
            fontSize={fontSize}
            lineHeight={lineHeight}
            textAlign="left"
            _focusVisible={{
              borderColor: 'border.strong',
              boxShadow: '0 0 0 1px var(--chakra-colors-border-strong)',
            }}
            _disabled={{
              color: 'text.muted',
              cursor: 'not-allowed',
            }}
            onBlur={onBlur}
          >
            {selectedOption ? (
              renderDesktopValue ? (
                renderDesktopValue(selectedOption)
              ) : (
                <Text
                  flex="1"
                  minW="0"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  color="text.primary"
                >
                  {getOptionLabel(selectedOption, renderOptionLabel)}
                </Text>
              )
            ) : (
              <Text
                flex="1"
                minW="0"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                color="text.muted"
              >
                {placeholder}
              </Text>
            )}
          </Select.Trigger>

          <Select.IndicatorGroup>
            <Select.Indicator insetEnd="16" color="text.primary">
              <ChevronDownStrokeIcon w="24px" h="24px" />
            </Select.Indicator>
          </Select.IndicatorGroup>
        </Select.Control>

        <Portal>
          <Select.Context>
            {(selectApi) =>
              selectApi.open ? (
                <Select.Positioner zIndex="1700">
                  <Select.Content
                    bg="bg.field"
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="border.default"
                    borderRadius={radius}
                    overflow="hidden"
                    boxShadow="0 8px 18px rgba(28, 28, 28, 0.12)"
                    maxH="280px"
                    overflowY="auto"
                  >
                    {options.map((option) => (
                      <Select.Item
                        key={option.value}
                        item={option}
                        px="16"
                        py="8"
                        cursor="pointer"
                        _highlighted={{ bg: 'bg.surface' }}
                        _selected={{ bg: 'bg.surface' }}
                      >
                        <Select.ItemText w="full">
                          {renderDesktopOption ? (
                            renderDesktopOption(option)
                          ) : (
                            <Text
                              color="text.primary"
                              fontSize={fontSize}
                              lineHeight={lineHeight}
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                            >
                              {getOptionLabel(option, renderOptionLabel)}
                            </Text>
                          )}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              ) : null
            }
          </Select.Context>
        </Portal>
      </Select.Root>

      {errorText ? (
        <Field.ErrorText fontSize="xs" lineHeight="tight">
          {errorText}
        </Field.ErrorText>
      ) : null}
    </Field.Root>
  )
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
}: RequestSelectFieldProps<TValue, TOption>) {
  return (
    <Field.Root invalid={invalid} disabled={disabled}>
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
              {getOptionLabel(option, renderOptionLabel)}
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
