import {
  addDays,
  endOfMonth,
  isSameMonth,
  startOfMonth,
  startOfWeek
} from 'date-fns'

export type MonthGridCell = {
  date: Date
  inMonth: boolean
}

/**
 * Returns a 6×7 grid of dates covering the supplied month, padded with
 * neighbouring-month dates so weeks always start on Sunday.
 */
export function useMonthGrid(month: Date): MonthGridCell[][] {
  const firstOfMonth = startOfMonth(month)
  const gridStart = startOfWeek(firstOfMonth, { weekStartsOn: 0 })

  const weeks: MonthGridCell[][] = []
  let cursor = gridStart
  const lastOfMonth = endOfMonth(month)

  // 6 weeks max — covers every possible month layout.
  for (let w = 0; w < 6; w++) {
    const week: MonthGridCell[] = []
    for (let d = 0; d < 7; d++) {
      week.push({ date: cursor, inMonth: isSameMonth(cursor, firstOfMonth) })
      cursor = addDays(cursor, 1)
    }
    weeks.push(week)
    // Stop early if we've fully covered the month and aren't mid-week.
    if (cursor > lastOfMonth && weeks.length >= 5) break
  }

  return weeks
}
