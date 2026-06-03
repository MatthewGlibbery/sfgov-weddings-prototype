import {
  BodyText,
  Container,
  DisplayXXXl,
  Link,
  PageLabel
} from '@/design-system'
import { startOfDay } from 'date-fns'
import { useCallback, useMemo } from 'react'
import {
  Calendar,
  FilterPanel,
  FilterPills,
  PrototypeLayout,
  ResultsList,
  useBookingState
} from '@/components/weddings'

export default function WeddingsLandingPage() {
  const { selectedDate, filters, setSelectedDate, setFilters, resetFilters } =
    useBookingState()

  const handleDateSelect = useCallback(
    (date: Date) => {
      setSelectedDate(date)
    },
    [setSelectedDate]
  )

  // Default visible selection to today so the calendar lands focused on
  // a date and the results section can show the jump-to-next CTA.
  const today = useMemo(() => startOfDay(new Date()), [])
  const effectiveSelectedDate = selectedDate ?? today

  return (
    <PrototypeLayout title="Book a City Hall wedding">
      <Container as="section" className="pt-32 pb-60">
        <PageLabel label="CALENDAR" />
        <DisplayXXXl as="h1" className="!mb-16 mt-12">
          Book a City Hall wedding
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
        {/* Desktop pills: above the two-column layout, full width */}
        <FilterPills
          filters={filters}
          onRemove={setFilters}
          onReset={resetFilters}
          className="hidden lg:flex mb-40"
        />

        <div className="flex flex-col lg:flex-row lg:gap-x-[121px]">
          {/* Filter panel: full-width stacked on mobile/tablet,
              right sidebar on desktop */}
          <aside className="order-1 lg:order-2 lg:w-[344px] lg:shrink-0">
            <FilterPanel
              filters={filters}
              onApply={setFilters}
              onReset={resetFilters}
            />
          </aside>

          {/* Mobile/tablet pills: between filter panel and calendar */}
          <FilterPills
            filters={filters}
            onRemove={setFilters}
            onReset={resetFilters}
            className="flex lg:hidden order-2 mt-60"
          />

          <div className="flex flex-col order-3 lg:order-1 lg:w-[623px] lg:shrink-0 mt-40 lg:mt-0">
            <Calendar
              selectedDate={effectiveSelectedDate}
              filters={filters}
              onSelect={handleDateSelect}
            />
            <hr className="border-0 border-t-1 border-neutral200 my-40 lg:my-80" />
            <ResultsList
              selectedDate={effectiveSelectedDate}
              filters={filters}
              onJumpToDate={setSelectedDate}
            />
          </div>
        </div>
      </Container>
    </PrototypeLayout>
  )
}
