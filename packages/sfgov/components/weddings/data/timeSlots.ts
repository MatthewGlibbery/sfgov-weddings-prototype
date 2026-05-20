import type { TimeSlot, LocationId } from '../types'

/**
 * Per-location fixed slot lists. The Mayor's Balcony and Fourth Floor Gallery
 * stagger their slot times so the two cards on a Mon-Fri view show different
 * times (matches the Figma).
 */
const SLOTS_BY_LOCATION: Record<LocationId, TimeSlot[]> = {
  'fourth-floor-gallery': [
    { time: '09:00', label: '9:00 am' },
    { time: '11:00', label: '11:00 am' },
    { time: '13:00', label: '1:00 pm' },
    { time: '15:00', label: '3:00 pm' }
  ],
  'mayors-balcony': [
    { time: '10:00', label: '10:00 am' },
    { time: '12:00', label: '12:00 pm' },
    { time: '14:00', label: '2:00 pm' }
  ],
  rotunda: [
    { time: '09:00', label: '9:00 am' },
    { time: '12:00', label: '12:00 pm' }
  ]
}

export function getTimeSlotsForLocation(location: LocationId): TimeSlot[] {
  return SLOTS_BY_LOCATION[location]
}
