import { addDays } from 'date-fns'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { BodyText, Button, HeadingXlSans, HeadingXXl } from '@/design-system'
import type {
  EventType,
  LocationInfo,
  SlotState,
  WeddingFilters
} from './types'
import { useAvailability } from './hooks/useAvailability'
import { formatLongDate } from './lib/dateHelpers'
import { LOCATIONS, RESULT_LOCATION_ORDER } from './data/locations'
import { ResultCard } from './ResultCard'

export type ResultsListProps = {
  selectedDate: Date | null
  filters: WeddingFilters
  onJumpToDate: (date: Date) => void
}

type Match = { location: LocationInfo; eventType: EventType }

/**
 * For a given date + filters, returns the (location, eventType) pairs that
 * have any non-unavailable day state — these are the cards to render.
 */
function getMatches(
  date: Date,
  filters: WeddingFilters,
  dayStateForType: (date: Date, eventType: EventType) => string
): Match[] {
  const eventTypes: EventType[] = filters.eventTypes.length
    ? filters.eventTypes
    : ['1hr', '2hr']
  const allowedLocationIds = new Set(filters.locations)
  const filterLocations = filters.locations.length === 0

  const matches: Match[] = []
  for (const id of RESULT_LOCATION_ORDER) {
    const location = LOCATIONS[id]
    if (!filterLocations && !allowedLocationIds.has(id)) continue
    for (const eventType of location.eventTypes) {
      if (!eventTypes.includes(eventType)) continue
      const state = dayStateForType(date, eventType)
      if (state !== 'unavailable') {
        matches.push({ location, eventType })
      }
    }
  }
  return matches
}

export function ResultsList({
  selectedDate,
  filters,
  onJumpToDate
}: ResultsListProps) {
  const router = useRouter()
  const { today, dayStateForType, findNextAvailable } = useAvailability(filters)

  if (!selectedDate) {
    return (
      <section
        id="available-times"
        aria-labelledby="available-times-heading"
        className="flex flex-col gap-16 md:gap-28 lg:gap-[24px] scroll-mt-20"
      >
        <HeadingXXl
          as="h2"
          id="available-times-heading"
          className="!mb-0 lg:!leading-[40px]"
        >
          Available times
        </HeadingXXl>
        <BodyText className="text-neutral700">
          Select a date to see available times.
        </BodyText>
      </section>
    )
  }

  const matches = getMatches(selectedDate, filters, dayStateForType)
  const dayLabel = formatLongDate(selectedDate)

  if (matches.length === 0) {
    const next =
      findNextAvailable(addDays(selectedDate, 1)) ?? findNextAvailable(today)
    return (
      <section
        id="available-times"
        aria-labelledby="available-times-heading"
        className="flex flex-col gap-40 scroll-mt-20"
      >
        <div className="flex flex-col gap-16 md:gap-28 lg:gap-[24px]">
          <HeadingXXl
            as="h2"
            id="available-times-heading"
            className="!mb-0 lg:!leading-[40px]"
          >
            Available times
          </HeadingXXl>
          <HeadingXlSans as="h3" className="!mb-0 lg:!leading-[32px]">
            {dayLabel}
          </HeadingXlSans>
        </div>
        <div className="flex flex-col gap-40 items-start">
          <BodyText className="!mb-0 text-black">
            There are no available times on this date. Try selecting another
            date.
          </BodyText>
          {next ? (
            <Button
              block
              onClick={() => onJumpToDate(next)}
              className="h-40 py-[8px] !text-body md:!w-1/3 lg:!w-auto"
            >
              See next available date
            </Button>
          ) : null}
        </div>
      </section>
    )
  }

  const handleSelectSlot = (
    state: SlotState,
    slotTime: string,
    locationId: string
  ) => {
    const dateIso = selectedDate
      ? `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1
        ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
      : ''
    const params = new URLSearchParams()
    if (dateIso) params.set('date', dateIso)
    params.set('time', slotTime)
    params.set('location', locationId)
    if (filters.eventTypes.length)
      params.set('types', filters.eventTypes.join(','))
    if (filters.locations.length)
      params.set('locations', filters.locations.join(','))

    if (state === 'challenge') {
      window.open(
        'https://www.sf.gov/book-city-hall-for-your-wedding-or-event?preview=true&ts=20260601121208',
        '_blank',
        'noopener'
      )
    } else {
      router.push(`/weddings/book?${params.toString()}`)
    }
  }

  return (
    <section
      id="available-times"
      aria-labelledby="available-times-heading"
      className="flex flex-col gap-40 scroll-mt-20"
    >
      <div className="flex flex-col gap-16 md:gap-28 lg:gap-[24px]">
        <HeadingXXl
          as="h2"
          id="available-times-heading"
          className="!mb-0 lg:!leading-[40px]"
        >
          Available times
        </HeadingXXl>
        <HeadingXlSans as="h3" className="!mb-0 lg:!leading-[32px]">
          {dayLabel}
        </HeadingXlSans>
      </div>
      <ul className="flex flex-col gap-40 list-none p-0 m-0">
        {matches.map((match, i) => (
          <Fragment key={`${match.location.id}-${match.eventType}`}>
            {i > 0 ? (
              <hr className="border-0 border-t-1 border-neutral200 m-0 w-full" />
            ) : null}
            <li className="w-full">
              <ResultCard
                location={match.location}
                eventType={match.eventType}
                date={selectedDate}
                today={today}
                onSelectSlot={handleSelectSlot}
              />
            </li>
          </Fragment>
        ))}
      </ul>
    </section>
  )
}
