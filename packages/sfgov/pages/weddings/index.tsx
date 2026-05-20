import {
  BodyText,
  Container,
  DisplayXXXl,
  Link,
  PageLabel
} from '@/design-system'
import { startOfDay } from 'date-fns'
import { useMemo } from 'react'
import {
  Calendar,
  FilterPanel,
  PrototypeLayout,
  ResultsList,
  useBookingState
} from '@/components/weddings'

export default function WeddingsLandingPage() {
  const {
    selectedDate,
    filters,
    setSelectedDate,
    setFilters,
    resetFilters
  } = useBookingState()

  // Default visible selection to today so the calendar lands focused on
  // a date and the results section can show the jump-to-next CTA.
  const today = useMemo(() => startOfDay(new Date()), [])
  const effectiveSelectedDate = selectedDate ?? today

  return (
    <PrototypeLayout title="Booking a City Hall wedding">
      <Container as="section" className="pt-32 pb-60">
        <PageLabel label="CALENDAR" />
        <DisplayXXXl as="h1" className="!mb-16 mt-12">
          Booking a City Hall wedding
        </DisplayXXXl>
        <BodyText
          as="p"
          className="text-desktop-display-lg text-neutral700 max-w-[902px] !mb-16"
        >
          Use this calendar to check the available dates for one-hour and
          two-hour weddings. Select an available time to request a booking.
        </BodyText>
        <Link href="#" className="underline">
          San Francisco City Hall Events Office
        </Link>
      </Container>

      <Container as="section" className="pb-80 !max-w-[1088px]">
        <div className="flex flex-col gap-y-40 lg:flex-row lg:gap-x-[121px]">
          <div className="flex flex-col lg:w-[623px] lg:shrink-0">
            <Calendar
              selectedDate={effectiveSelectedDate}
              filters={filters}
              onSelect={setSelectedDate}
            />
            <hr className="border-0 border-t-1 border-neutral200 my-80" />
            <ResultsList
              selectedDate={effectiveSelectedDate}
              filters={filters}
              onJumpToDate={setSelectedDate}
            />
          </div>
          <aside className="lg:w-[344px] lg:shrink-0">
            <FilterPanel
              filters={filters}
              onApply={setFilters}
              onReset={resetFilters}
            />
          </aside>
        </div>
      </Container>
    </PrototypeLayout>
  )
}
