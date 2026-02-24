import { AppChakraProvider } from '@/app/providers/chakra-provider'
import { render, type RenderOptions } from '@testing-library/react'
import { createElement, type PropsWithChildren, type ReactElement } from 'react'

type WrapperProps = PropsWithChildren<unknown>

const wrapper: RenderOptions['wrapper'] = ({ children }: WrapperProps) => {
  return createElement(AppChakraProvider, null, children)
}

export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper, ...options })
}
