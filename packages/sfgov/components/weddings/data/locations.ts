import type { LocationInfo, LocationId } from '../types'

export const LOCATIONS: Record<LocationId, LocationInfo> = {
  'mayors-balcony': {
    id: 'mayors-balcony',
    name: "The Mayor's Balcony",
    eventTypes: ['1hr'],
    durationLabel: '1 hour weddings',
    daysLabel: 'Monday - Friday',
    capacityLabel: 'Up to 100 people',
    priceLabel: '$1,200',
    imageSrc: '/weddings/locations/mayors-balcony.png',
    imageAlt: "Interior view of City Hall's Mayor's Balcony"
  },
  'fourth-floor-gallery': {
    id: 'fourth-floor-gallery',
    name: 'Fourth Floor Gallery',
    eventTypes: ['1hr'],
    durationLabel: '1 hour weddings',
    daysLabel: 'Monday - Friday',
    capacityLabel: 'Up to 100 people',
    priceLabel: '$1,200',
    imageSrc: '/weddings/locations/fourth-floor-gallery.png',
    imageAlt: "Arched window in City Hall's Fourth Floor Gallery"
  },
  rotunda: {
    id: 'rotunda',
    name: 'The Rotunda',
    eventTypes: ['2hr'],
    durationLabel: '2 hour weddings',
    daysLabel: 'Saturdays only',
    capacityLabel: 'Up to 200 people',
    priceLabel: '$5,000',
    imageSrc: '/weddings/locations/mayors-balcony.png',
    imageAlt: "City Hall Rotunda"
  }
}

export const LOCATION_LIST: LocationInfo[] = [
  LOCATIONS['mayors-balcony'],
  LOCATIONS['fourth-floor-gallery'],
  LOCATIONS.rotunda
]

/** Order used in the results list (matches Figma — Gallery first). */
export const RESULT_LOCATION_ORDER: LocationId[] = [
  'fourth-floor-gallery',
  'mayors-balcony',
  'rotunda'
]
