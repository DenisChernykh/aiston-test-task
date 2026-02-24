import type { RequestItem, RequestPriority, RequestStatus } from '@/entities/request/model'
import { format, parseISO } from 'date-fns'

const CSV_DELIMITER = ';'
const CSV_UTF8_BOM = '\uFEFF'

const CSV_HEADERS = [
  '№',
  'Код аптеки',
  'Город',
  'Адрес',
  'Создана',
  'Приоритет',
  'Тема',
  'Категория',
  'Техник',
  'Реакция',
  'Решение',
  'Статус',
] as const

const PRIORITY_LABELS: Record<RequestPriority, string> = {
  critical: 'Критический',
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
}

const STATUS_LABELS: Record<RequestStatus, string> = {
  new: 'Новая',
  onReview: 'На рассмотрении',
  inProgress: 'В работе',
  awaitingParts: 'Ожидание ЗЧ',
  ready: 'Готово',
  rejected: 'Отклонена',
  closed: 'Закрыто',
  paused: 'На паузе',
}

function escapeCsvCell(value: string): string {
  const normalized = value.replaceAll('"', '""')

  if (/[;"\n\r]/u.test(value)) {
    return `"${normalized}"`
  }

  return normalized
}

function formatCreatedAt(createdAt: string): string {
  try {
    return format(parseISO(createdAt), 'dd.MM.yyyy HH:mm:ss')
  } catch {
    return createdAt
  }
}

function mapRequestToCsvRow(item: RequestItem): string[] {
  return [
    item.number,
    item.pharmacyCode,
    item.pharmacyCity,
    item.pharmacyAddress,
    formatCreatedAt(item.createdAt),
    PRIORITY_LABELS[item.priority],
    item.topic,
    item.category,
    item.technician ?? '—',
    item.reactionTime ?? '—',
    item.resolutionTime ?? '—',
    STATUS_LABELS[item.status],
  ]
}

function buildCsvContent(items: RequestItem[]): string {
  const headerLine = CSV_HEADERS.map((value) => escapeCsvCell(value)).join(CSV_DELIMITER)
  const rowLines = items.map((item) =>
    mapRequestToCsvRow(item)
      .map((value) => escapeCsvCell(value))
      .join(CSV_DELIMITER),
  )

  return [headerLine, ...rowLines].join('\n')
}

function formatPart(value: number): string {
  return String(value).padStart(2, '0')
}

function createExportFileName(date = new Date()): string {
  const year = date.getFullYear()
  const month = formatPart(date.getMonth() + 1)
  const day = formatPart(date.getDate())
  const hours = formatPart(date.getHours())
  const minutes = formatPart(date.getMinutes())

  return `requests_${year}-${month}-${day}_${hours}-${minutes}.csv`
}

function triggerCsvDownload(content: string, fileName: string): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  const blob = new Blob([CSV_UTF8_BOM, content], { type: 'text/csv;charset=utf-8;' })
  const downloadUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = downloadUrl
  anchor.download = fileName
  anchor.style.display = 'none'
  document.body.append(anchor)
  anchor.click()
  anchor.remove()

  URL.revokeObjectURL(downloadUrl)
}

export type ExportRequestsToCsvResult = {
  fileName: string
  count: number
}

export function exportRequestsToCsv(items: RequestItem[]): ExportRequestsToCsvResult {
  const csvContent = buildCsvContent(items)
  const fileName = createExportFileName()
  triggerCsvDownload(csvContent, fileName)

  return {
    fileName,
    count: items.length,
  }
}
