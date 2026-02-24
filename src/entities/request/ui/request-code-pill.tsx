import { Box, Text } from '@chakra-ui/react'

export type RequestCodePillContext = 'default' | 'mobileTable'

export type RequestCodePillProps = {
  value: string
  context?: RequestCodePillContext
}

export function RequestCodePill({ value, context = 'default' }: RequestCodePillProps) {
  const isMobileTable = context === 'mobileTable'

  return (
    <Box
      bg={isMobileTable ? 'mobileTable.codePillBg' : 'bg.surface'}
      borderRadius="xs"
      px={isMobileTable ? '5' : { base: '5', md: '3' }}
      py={isMobileTable ? '3' : { base: '3', md: '1' }}
      minW="fit-content"
      h={isMobileTable ? 'mobileCodePill' : undefined}
      minH={isMobileTable ? 'mobileCodePill' : undefined}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        fontFamily="code"
        fontSize={isMobileTable ? 'md' : { base: 'md', md: 'xs' }}
        lineHeight={isMobileTable ? 'normal' : { base: 'sm', md: 'md' }}
        fontWeight={isMobileTable ? 'medium' : 'semibold'}
        letterSpacing={isMobileTable ? 'codePillMobile' : { base: 'normal', md: 'codeTag' }}
        color="text.primary"
        textAlign="center"
      >
        {value}
      </Text>
    </Box>
  )
}
