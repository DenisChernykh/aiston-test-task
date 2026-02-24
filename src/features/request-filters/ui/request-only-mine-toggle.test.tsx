import { RequestOnlyMineToggle } from '@/features/request-filters/ui/request-only-mine-toggle'
import { renderWithProviders } from '@/test/render-with-providers'
import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('RequestOnlyMineToggle', () => {
  it('при value=false имеет aria-pressed=false и по клику вызывает onChange(true)', () => {
    const handleChange = vi.fn()

    renderWithProviders(<RequestOnlyMineToggle value={false} onChange={handleChange} />)

    const button = screen.getByRole('button', { name: 'Показать только мои' })
    expect(button.getAttribute('aria-pressed')).toBe('false')

    fireEvent.click(button)
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('при value=true имеет aria-pressed=true и по клику вызывает onChange(false)', () => {
    const handleChange = vi.fn()

    renderWithProviders(<RequestOnlyMineToggle value={true} onChange={handleChange} />)

    const button = screen.getByRole('button', { name: 'Показать только мои' })
    expect(button.getAttribute('aria-pressed')).toBe('true')

    fireEvent.click(button)
    expect(handleChange).toHaveBeenCalledWith(false)
  })
})
