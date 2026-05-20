export type EventType = '1hr' | '2hr'

export type LocationId = 'mayors-balcony' | 'fourth-floor-gallery' | 'rotunda'

export type DayState = 'available' | 'challenge' | 'unavailable'

export type SlotState = 'available' | 'challenge' | 'unavailable'

export type TimeSlot = {
  /** ISO time string in 24h format, e.g. "09:00" */
  time: string
  /** Display label, e.g. "9:00 am" */
  label: string
}

export type LocationInfo = {
  id: LocationId
  name: string
  /** Allowed event types for this location */
  eventTypes: EventType[]
  /** Display copy for the result card stats column */
  durationLabel: string
  daysLabel: string
  capacityLabel: string
  priceLabel: string
  /** Photo for the result card; relative to `/public`. */
  imageSrc: string
  imageAlt: string
}

export type WeddingFilters = {
  eventTypes: EventType[]
  locations: LocationId[]
}
