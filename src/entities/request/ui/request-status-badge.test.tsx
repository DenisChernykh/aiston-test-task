import { RequestStatusBadge } from '@/entities/request/ui/request-status-badge'
import type { RequestStatus } from '@/entities/request/model'
import { renderWithProviders } from '@/test/render-with-providers'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('RequestStatusBadge', () => {
  it.each([
    ['new', 'Новая'],
    ['onReview', 'На рассмотрении'],
    ['inProgress', 'В работе'],
    ['awaitingParts', 'Ожидание ЗЧ'],
    ['ready', 'Готово'],
    ['rejected', 'Отклонена'],
    ['closed', 'Закрыто'],
    ['paused', 'На паузе'],
  ] as const)('для статуса %s отображает текст "%s"', (status, label) => {
    renderWithProviders(<RequestStatusBadge status={status as RequestStatus} />)

    expect(screen.getByText(label)).toBeTruthy()
  })
})
