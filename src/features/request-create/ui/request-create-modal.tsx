import { useRequestCreateModalController } from '@/features/request-create/model'
import { RequestCreateModalDesktop } from '@/features/request-create/ui/request-create-modal.desktop'
import { RequestCreateModalMobile } from '@/features/request-create/ui/request-create-modal.mobile'
import { Dialog, Drawer, useBreakpointValue } from '@chakra-ui/react'
import type { FormEventHandler } from 'react'

export type RequestCreateModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RequestCreateModal({ open, onOpenChange }: RequestCreateModalProps) {
  const isDesktop = useBreakpointValue({ base: false, md: true }) ?? false
  const controller = useRequestCreateModalController({ open, onOpenChange })

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    void controller.handleSubmit(event)
  }

  if (isDesktop) {
    return (
      <Dialog.Root open={open} onOpenChange={controller.handleDialogOpenChange}>
        <RequestCreateModalDesktop
          form={controller.form}
          options={controller.options}
          optionsState={controller.optionsState}
          onSubmit={handleFormSubmit}
          onCancel={controller.handleCancel}
          onRetry={controller.handleRetry}
          isSubmitDisabled={controller.isSubmitDisabled}
        />
      </Dialog.Root>
    )
  }

  return (
    <Drawer.Root
      open={open}
      placement="bottom"
      size="full"
      onOpenChange={controller.handleDialogOpenChange}
    >
      <RequestCreateModalMobile
        form={controller.form}
        options={controller.options}
        optionsState={controller.optionsState}
        onSubmit={handleFormSubmit}
        onRetry={controller.handleRetry}
        isSubmitDisabled={controller.isSubmitDisabled}
      />
    </Drawer.Root>
  )
}
