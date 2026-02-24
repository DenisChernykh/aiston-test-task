export function parseDurationToSeconds(value: string): number | null {
  const input = value.trim()
  const parts = input.split(':')

  if (parts.length !== 2 && parts.length !== 3) {
    return null
  }

  const numbers = parts.map((part) => {
    if (!/^\d+$/.test(part)) {
      return NaN
    }

    return Number(part)
  })

  if (numbers.some((part) => Number.isNaN(part))) {
    return null
  }

  if (parts.length === 2) {
    const [minutes, seconds] = numbers

    if (seconds >= 60) {
      return null
    }

    return minutes * 60 + seconds
  }

  const [hours, minutes, seconds] = numbers

  if (minutes >= 60 || seconds >= 60) {
    return null
  }

  return hours * 3600 + minutes * 60 + seconds
}
