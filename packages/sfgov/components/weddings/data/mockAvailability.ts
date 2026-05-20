import { isSaturday, isWeekend } from 'date-fns'
import type { DayState, EventType, LocationId, SlotState } from '../types'
import { isWithinBookingWindow } from '../lib/bookingWindow'
import { toIsoDate } from '../lib/dateHelpers'
import { LOCATIONS } from './locations'

/** xmur3 string hash → uint32 generator. Deterministic and well-distributed. */
function hashString(str: string): number {
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507)
  h = Math.imul(h ^ (h >>> 13), 3266489909)
  return (h ^= h >>> 16) >>> 0
}

/** Returns a deterministic float in [0, 1) for a string seed. */
function hashFloat(seed: string): number {
  return hashString(seed) / 2 ** 32
}

const AVAILABLE_THRESHOLD = 0.7
const CHALLENGE_THRESHOLD = 0.85

/**
 * Returns the day's state for a single event type, ignoring location filters.
 * - Outside booking window → 'unavailable'
 * - Wrong day-of-week (1hr requires weekday, 2hr requires Saturday) → 'unavailable'
 * - Otherwise: deterministic hash buckets ~70% available, ~15% challenge, ~15% unavailable
 */
export function getDayAvailabilityForType(
  date: Date,
  eventType: EventType,
  today: Date = new Date()
): DayState {
  if (!isWithinBookingWindow(date, eventType, today)) return 'unavailable'

  if (eventType === '1hr') {
    if (isWeekend(date)) return 'unavailable'
  } else if (eventType === '2hr') {
    if (!isSaturday(date)) return 'unavailable'
  }

  const r = hashFloat(`${toIsoDate(date)}|${eventType}`)
  if (r < AVAILABLE_THRESHOLD) return 'available'
  if (r < CHALLENGE_THRESHOLD) return 'challenge'
  return 'unavailable'
}

/**
 * Aggregates day state across selected event types and locations.
 * Best status across the matrix wins (available > challenge > unavailable).
 * Empty filters mean "all" for that dimension.
 */
export function getDayAvailability(
  date: Date,
  filters: { eventTypes: EventType[]; locations: LocationId[] },
  today: Date = new Date()
): DayState {
  const eventTypes: EventType[] = filters.eventTypes.length
    ? filters.eventTypes
    : ['1hr', '2hr']
  const locationIds: LocationId[] = filters.locations.length
    ? filters.locations
    : (Object.keys(LOCATIONS) as LocationId[])

  let best: DayState = 'unavailable'

  for (const eventType of eventTypes) {
    const validLocations = locationIds.filter((id) =>
      LOCATIONS[id].eventTypes.includes(eventType)
    )
    if (!validLocations.length) continue

    const dayState = getDayAvailabilityForType(date, eventType, today)
    if (dayState === 'available') return 'available'
    if (dayState === 'challenge' && best === 'unavailable') best = 'challenge'
  }

  return best
}

/**
 * Slot state for a specific time slot. Currently mirrors day availability,
 * with per-slot variation via a second hash so individual slots can differ
 * (some slots taken on an otherwise-available day).
 */
export function getSlotState(
  date: Date,
  eventType: EventType,
  location: LocationId,
  time: string,
  today: Date = new Date()
): SlotState {
  const dayState = getDayAvailabilityForType(date, eventType, today)
  if (dayState === 'unavailable') return 'unavailable'

  const r = hashFloat(`${toIsoDate(date)}|${eventType}|${location}|${time}`)
  if (dayState === 'challenge') {
    return r < 0.5 ? 'challenge' : 'unavailable'
  }
  if (r < 0.6) return 'available'
  if (r < 0.85) return 'challenge'
  return 'unavailable'
}
