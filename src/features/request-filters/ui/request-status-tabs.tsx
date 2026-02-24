import {
  MOBILE_REQUEST_STATUS_FILTER_SEQUENCE,
  REQUEST_STATUS_FILTER_OPTIONS,
  type RequestStatusFilterOption,
  type RequestStatusFilterValue,
} from '@/features/request-filters/model/request-filter-status'
import { AppButton } from '@/shared/ui/button'
import { Tabs, useBreakpointValue } from '@chakra-ui/react'

export type RequestStatusTabsProps = {
  value: RequestStatusFilterValue
  onChange: (value: RequestStatusFilterValue) => void
}

export function RequestStatusTabs({ value, onChange }: RequestStatusTabsProps) {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false

  const orderedOptions = isMobile
    ? MOBILE_REQUEST_STATUS_FILTER_SEQUENCE.map((value) =>
        REQUEST_STATUS_FILTER_OPTIONS.find((option) => option.value === value),
      ).filter((option): option is RequestStatusFilterOption => Boolean(option))
    : REQUEST_STATUS_FILTER_OPTIONS

  const tabButtonSize =
    useBreakpointValue<'filterTabMobile' | 'filterTabDesktop'>({
      base: 'filterTabMobile',
      md: 'filterTabDesktop',
    }) ?? 'filterTabDesktop'

  return (
    <Tabs.Root
      value={value}
      activationMode="manual"
      unstyled
      onValueChange={(details) => onChange(details.value as RequestStatusFilterValue)}
    >
      <Tabs.List
        gap={{ base: '8', md: '10' }}
        display="inline-flex"
        w="fit-content"
        flexWrap="nowrap"
      >
        {orderedOptions.map((option) => {
          const isSelected = value === option.value

          return (
            <Tabs.Trigger key={option.value} value={option.value} asChild>
              <AppButton
                variant={isSelected ? 'solid' : 'soft'}
                size={tabButtonSize}
                whiteSpace="nowrap"
                _focusVisible={{
                  outline: 'none',
                  boxShadow: '0 0 0 3px var(--chakra-colors-button-focusRing)',
                }}
              >
                {option.label}
              </AppButton>
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
    </Tabs.Root>
  )
}
