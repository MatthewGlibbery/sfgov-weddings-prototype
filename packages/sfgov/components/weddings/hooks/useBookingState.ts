import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import type { EventType, LocationId, WeddingFilters } from '../types'
import { fromIsoDate, toIsoDate } from '../lib/dateHelpers'

const VALID_EVENT_TYPES: EventType[] = ['1hr', '2hr']
const VALID_LOCATIONS: LocationId[] = [
  'mayors-balcony',
  'fourth-floor-gallery',
  'rotunda'
]

function readQueryString(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}

function readEventTypes(value: string | string[] | undefined): EventType[] {
  return readQueryString(value)
    .split(',')
    .filter((v): v is EventType =>
      VALID_EVENT_TYPES.includes(v as EventType)
    )
}

function readLocations(value: string | string[] | undefined): LocationId[] {
  return readQueryString(value)
    .split(',')
    .filter((v): v is LocationId =>
      VALID_LOCATIONS.includes(v as LocationId)
    )
}

export type BookingState = {
  selectedDate: Date | null
  filters: WeddingFilters
  selectedTime: string | null
  selectedLocation: LocationId | null
  setSelectedDate: (date: Date | null) => void
  setFilters: (filters: WeddingFilters) => void
  setSelectedTime: (time: string | null, location: LocationId | null) => void
  resetFilters: () => void
}

/**
 * Single source of truth for prototype state. Everything lives in URL query
 * params so refresh + back/forward + sharing all work. Setters use shallow
 * routing so we don't trigger getServerSideProps re-runs.
 */
export function useBookingState(): BookingState {
  const router = useRouter()
  const { query, pathname } = router

  const selectedDate = useMemo(() => {
    const iso = readQueryString(query.date)
    return iso ? fromIsoDate(iso) : null
  }, [query.date])

  const filters = useMemo<WeddingFilters>(
    () => ({
      eventTypes: readEventTypes(query.types),
      locations: readLocations(query.locations)
    }),
    [query.types, query.locations]
  )

  const selectedTime = useMemo(() => {
    const t = readQueryString(query.time)
    return t || null
  }, [query.time])

  const selectedLocation = useMemo<LocationId | null>(() => {
    const locs = readLocations(query.location)
    return locs[0] ?? null
  }, [query.location])

  const updateQuery = useCallback(
    (next: Record<string, string | undefined>) => {
      const merged: Record<string, string> = {}
      for (const [k, v] of Object.entries(query)) {
        if (typeof v === 'string') merged[k] = v
      }
      for (const [k, v] of Object.entries(next)) {
        if (v === undefined || v === '') delete merged[k]
        else merged[k] = v
      }
      router.replace({ pathname, query: merged }, undefined, {
        shallow: true,
        scroll: false
      })
    },
    [query, pathname, router]
  )

  const setSelectedDate = useCallback(
    (date: Date | null) => {
      updateQuery({ date: date ? toIsoDate(date) : undefined })
    },
    [updateQuery]
  )

  const setFilters = useCallback(
    (next: WeddingFilters) => {
      updateQuery({
        types: next.eventTypes.length ? next.eventTypes.join(',') : undefined,
        locations: next.locations.length
          ? next.locations.join(',')
          : undefined
      })
    },
    [updateQuery]
  )

  const setSelectedTime = useCallback(
    (time: string | null, location: LocationId | null) => {
      updateQuery({
        time: time ?? undefined,
        location: location ?? undefined
      })
    },
    [updateQuery]
  )

  const resetFilters = useCallback(() => {
    updateQuery({ types: undefined, locations: undefined })
  }, [updateQuery])

  return {
    selectedDate,
    filters,
    selectedTime,
    selectedLocation,
    setSelectedDate,
    setFilters,
    setSelectedTime,
    resetFilters
  }
}
