import { FilterAltIcon } from '@/shared/assets/icons'
import { AppButton } from '@/shared/ui/button'
import { useBreakpointValue } from '@chakra-ui/react'

export type RequestOnlyMineToggleProps = { value: boolean; onChange: (value: boolean) => void }

export function RequestOnlyMineToggle({ value, onChange }: RequestOnlyMineToggleProps) {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false
  const variant = value ? 'solid' : 'soft'

  if (isMobile) {
    return (
      <AppButton
        type="button"
        variant={variant}
        size="filterIconMobile"
        onClick={() => onChange(!value)}
        aria-pressed={value}
        aria-label="Показать только мои"
      >
        <FilterAltIcon w="iconXs" h="iconXs" color="currentColor" />
      </AppButton>
    )
  }

  return (
    <AppButton
      type="button"
      variant={variant}
      size="filterToggleDesktop"
      w="223px"
      gap="10"
      onClick={() => onChange(!value)}
      aria-pressed={value}
      whiteSpace="nowrap"
      leftIcon={<FilterAltIcon w="iconXs" h="iconXs" color="currentColor" />}
    >
      Показать только мои
    </AppButton>
  )
}
