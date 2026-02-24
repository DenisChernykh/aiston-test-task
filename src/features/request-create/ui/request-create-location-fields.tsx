import type { RequestCreateFormFieldsSharedProps } from '@/features/request-create/ui/request-create-form.constants'
import { RequestNativeSelectField } from '@/features/request-create/ui/request-native-select-field'
import { Checkbox, VStack } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

export function RequestCreateLocationFields({
  form,
  options,
  isDesktop,
  disabled = false,
}: RequestCreateFormFieldsSharedProps) {
  const fontSize = isDesktop ? 'md' : 'xs'
  const lineHeight = isDesktop ? 'sm' : 'xs'
  const radius = isDesktop ? 'lg' : 'md'

  return (
    <VStack align="stretch" gap="16">
      <Controller
        name="pharmacyId"
        control={form.control}
        render={({ field, fieldState }) => (
          <RequestNativeSelectField
            label="Аптека"
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            options={options.pharmacies}
            placeholder="Выберите аптеку от которой исходит заявка"
            disabled={disabled}
            invalid={fieldState.invalid}
            errorText={fieldState.error?.message}
            h={isDesktop ? 'fieldDesktop' : 'fieldMobile'}
            radius={radius}
            fontSize={fontSize}
            lineHeight={lineHeight}
          />
        )}
      />

      <VStack align="stretch" gap="16">
        <Controller
          name="categoryId"
          control={form.control}
          render={({ field, fieldState }) => (
            <RequestNativeSelectField
              label="Категория заявки"
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              options={options.categories}
              placeholder="Холодильники, кондиционеры или другое"
              disabled={disabled}
              invalid={fieldState.invalid}
              errorText={fieldState.error?.message}
              h={isDesktop ? 'fieldCategoryDesktop' : 'fieldMobile'}
              radius={radius}
              fontSize={fontSize}
              lineHeight={lineHeight}
            />
          )}
        />

        <Controller
          name="isWarranty"
          control={form.control}
          render={({ field }) => (
            <Checkbox.Root
              checked={field.value}
              onCheckedChange={(details) => field.onChange(details.checked === true)}
              disabled={disabled}
              gap="8"
              alignItems="center"
            >
              <Checkbox.HiddenInput name={field.name} onBlur={field.onBlur} />
              <Checkbox.Control
                w="20px"
                h="20px"
                borderWidth="1px"
                borderColor="border.default"
                borderRadius="sm"
                bg="bg.field"
              />
              <Checkbox.Label
                fontSize={isDesktop ? 'md' : 'lg'}
                lineHeight="sm"
                color="text.primary"
              >
                Гарантийный случай?
              </Checkbox.Label>
            </Checkbox.Root>
          )}
        />
      </VStack>
    </VStack>
  )
}
