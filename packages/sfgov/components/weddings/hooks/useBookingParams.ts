import { useMemo } from 'react'
import { useRouter } from 'next/router'

/**
 * Extracts the booking-related query params (date, time, location, types,
 * locations) from the current URL and provides helpers to build hrefs
 * that carry them forward between form steps.
 */
export function useBookingParams() {
  const { query } = useRouter()

  const qs = useMemo(() => {
    const params = new URLSearchParams()
    if (query.date) params.set('date', String(query.date))
    if (query.time) params.set('time', String(query.time))
    if (query.location) params.set('location', String(query.location))
    if (query.types) params.set('types', String(query.types))
    if (query.locations) params.set('locations', String(query.locations))
    return params.toString()
  }, [query.date, query.time, query.location, query.types, query.locations])

  /** Append booking params to a path */
  const withParams = (path: string) => (qs ? `${path}?${qs}` : path)

  return { qs, withParams }
}
