import { format } from 'date-fns'

/** Stable YYYY-MM-DD key for a date, no timezone surprises. */
export function toIsoDate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

/** Parse a YYYY-MM-DD string as a local-midnight Date. */
export function fromIsoDate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return null
  const [, y, m, d] = match
  const date = new Date(Number(y), Number(m) - 1, Number(d))
  if (Number.isNaN(date.getTime())) return null
  return date
}

export function formatLongDate(date: Date): string {
  return format(date, 'EEEE, MMMM d, yyyy')
}

export function formatMonthYear(date: Date): string {
  return format(date, 'MMMM yyyy')
}
