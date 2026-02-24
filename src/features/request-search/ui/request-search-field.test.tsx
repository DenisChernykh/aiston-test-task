import { RequestSearchField } from '@/features/request-search/ui/request-search-field'
import { renderWithProviders } from '@/test/render-with-providers'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'

describe('RequestSearchField', () => {
  it('рендерит плейсхолдер по умолчанию', () => {
    renderWithProviders(<RequestSearchField />)

    expect(screen.getByPlaceholderText('Поиск по номеру или теме заявки')).toBeTruthy()
  })

  it('вызывает onChange с введенным значением', () => {
    const handleChange = vi.fn()

    renderWithProviders(<RequestSearchField onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'A-1024' } })

    expect(handleChange).toHaveBeenCalledWith('A-1024')
  })
})

