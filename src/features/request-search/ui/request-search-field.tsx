import { SearchIcon } from '@/shared/assets/icons'
import { Input, InputGroup } from '@chakra-ui/react'
import type { ChangeEvent } from 'react'

export type RequestSearchFieldProps = {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export function RequestSearchField({
  value,
  onChange,
  placeholder = 'Поиск по номеру или теме заявки',
}: RequestSearchFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }

  return (
    <InputGroup
      startElement={
        <SearchIcon w="iconLg" h="iconLg" color="text.muted" startOffset="47" flex="1" />
      }
    >
      <Input
        value={value ?? ''}
        onChange={handleChange}
        placeholder={placeholder}
        h="buttonDesktop"
        borderRadius="xs"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="border.subtle"
        bg="bg.field"
        color="text.primary"
        fontSize="lg"
        lineHeight="md"
        fontWeight="regular"
        px="10"
        _placeholder={{ color: 'text.secondary' }}
        _hover={{ borderColor: 'border.subtle' }}
        _focusVisible={{
          borderColor: 'border.subtle',
          boxShadow: 'none',
        }}
      />
    </InputGroup>
  )
}
