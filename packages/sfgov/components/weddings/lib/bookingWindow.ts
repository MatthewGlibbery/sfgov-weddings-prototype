import { addMonths, addYears, isAfter, isBefore, startOfDay } from 'date-fns'
import type { EventType } from '../types'

const MAX_YEARS_OUT = 2
const MIN_MONTHS_1HR = 1
const MIN_MONTHS_2HR = 3

export function getMinBookingDate(
  eventType: EventType,
  today: Date = new Date()
): Date {
  const months = eventType === '1hr' ? MIN_MONTHS_1HR : MIN_MONTHS_2HR
  return addMonths(startOfDay(today), months)
}

export function getMaxBookingDate(today: Date = new Date()): Date {
  return addYears(startOfDay(today), MAX_YEARS_OUT)
}

export function isWithinBookingWindow(
  date: Date,
  eventType: EventType,
  today: Date = new Date()
): boolean {
  const min = getMinBookingDate(eventType, today)
  const max = getMaxBookingDate(today)
  const day = startOfDay(date)
  return !isBefore(day, min) && !isAfter(day, max)
}

/**
 * For a set of selected event types, return true if the date is within the
 * booking window of *any* selected type. If no event types are selected,
 * default to checking against both.
 */
export function isWithinAnyBookingWindow(
  date: Date,
  eventTypes: EventType[],
  today: Date = new Date()
): boolean {
  const types = eventTypes.length ? eventTypes : (['1hr', '2hr'] as EventType[])
  return types.some((t) => isWithinBookingWindow(date, t, today))
}
