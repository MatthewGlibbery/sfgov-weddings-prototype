import { addDays, isAfter, startOfDay } from 'date-fns'
import { useCallback, useMemo, useRef } from 'react'
import type { DayState, EventType, WeddingFilters } from '../types'
import {
  getDayAvailability,
  getDayAvailabilityForType
} from '../data/mockAvailability'
import { getMaxBookingDate } from '../lib/bookingWindow'

/**
 * Wraps mockAvailability with a stable "today" reference so the calendar
 * paints consistently across re-renders within a session.
 */
export function useAvailability(filters: WeddingFilters) {
  const todayRef = useRef<Date>()
  if (!todayRef.current) todayRef.current = startOfDay(new Date())
  const today = todayRef.current

  const dayState = useCallback(
    (date: Date): DayState => getDayAvailability(date, filters, today),
    [filters, today]
  )

  const dayStateForType = useCallback(
    (date: Date, eventType: EventType): DayState =>
      getDayAvailabilityForType(date, eventType, today),
    [today]
  )

  const findNextAvailable = useCallback(
    (from: Date): Date | null => {
      const max = getMaxBookingDate(today)
      let cursor = startOfDay(from)
      while (!isAfter(cursor, max)) {
        const state = getDayAvailability(cursor, filters, today)
        if (state === 'available' || state === 'challenge') return cursor
        cursor = addDays(cursor, 1)
      }
      return null
    },
    [filters, today]
  )

  return useMemo(
    () => ({ today, dayState, dayStateForType, findNextAvailable }),
    [today, dayState, dayStateForType, findNextAvailable]
  )
}
