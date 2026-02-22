import { ExportIcon, PlusIcon } from '@/shared/assets/icons'
import { AppButton } from '@/shared/ui/button'
import { HStack } from '@chakra-ui/react'

export type RequestActionsDesktopProps = {
  onExportClick?: () => void
  onCreateClick?: () => void
}

export function RequestActionsDesktop({
  onExportClick,
  onCreateClick,
}: RequestActionsDesktopProps) {
  return (
    <HStack gap="13">
      <AppButton
        variant="softBordered"
        size="desktopCompact"
        onClick={onExportClick}
        leftIcon={<ExportIcon boxSize="15px" />}
      >
        Экспорт
      </AppButton>
      <AppButton
        variant="solidMuted"
        size="desktop"
        gap="10"
        onClick={onCreateClick}
        leftIcon={<PlusIcon w="14px" h="24px" />}
      >
        Создать новую заявку
      </AppButton>
    </HStack>
  )
}
