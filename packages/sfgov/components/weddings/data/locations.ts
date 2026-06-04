import type { LocationInfo, LocationId } from '../types'

export const LOCATIONS: Record<LocationId, LocationInfo> = {
  'mayors-balcony': {
    id: 'mayors-balcony',
    name: "The Mayor's Balcony",
    href: 'https://www.sf.gov/city-hall-venues-the-mayors-balcony?preview=true&ts=20260223133741',
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
    href: 'https://www.sf.gov/city-hall-venues-fourth-floor?preview=true&ts=20260223135311',
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
    href: 'https://www.sf.gov/city-hall-venues-the-rotunda?preview=true&ts=20260223134813',
    eventTypes: ['2hr'],
    durationLabel: '2 hour weddings',
    daysLabel: 'Saturdays only',
    capacityLabel: 'Up to 200 people',
    priceLabel: '$5,000',
    imageSrc: '/weddings/locations/rotunda.jpg',
    imageAlt: 'City Hall Rotunda grand staircase interior'
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
