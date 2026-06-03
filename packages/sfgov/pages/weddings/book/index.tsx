import { useMemo } from 'react'
import { format } from 'date-fns'
import {
  FormStepLayout,
  LocationSummaryCard,
  useBookingState
} from '@/components/weddings'
import { LOCATIONS } from '@/components/weddings/data/locations'
import { toIsoDate } from '@/components/weddings/lib/dateHelpers'
import { useBookingParams } from '@/components/weddings/hooks/useBookingParams'

/**
 * Form intro page — `/weddings/book`
 *
 * Shows the user's selected time/location and outlines what the form will ask.
 * "Get started" advances to step 1. "Back" returns to the calendar.
 */
export default function WeddingsBookPage() {
  const { selectedDate, selectedTime, selectedLocation, filters } =
    useBookingState()
  const { withParams } = useBookingParams()

  // Resolve location info
  const location = selectedLocation ? LOCATIONS[selectedLocation] : null

  // Format date + time for display
  const dateTimeLabel = useMemo(() => {
    if (!selectedDate) return null
    const timePart = selectedTime ? ` at ${formatTime(selectedTime)}` : ''
    return `${format(selectedDate, 'EEEE, MMMM d, yyyy')}${timePart}`
  }, [selectedDate, selectedTime])

  // Build the back link preserving calendar state (date + filters)
  const backHref = useMemo(() => {
    const params = new URLSearchParams()
    if (selectedDate) params.set('date', toIsoDate(selectedDate))
    if (filters.eventTypes.length)
      params.set('types', filters.eventTypes.join(','))
    if (filters.locations.length)
      params.set('locations', filters.locations.join(','))
    const qs = params.toString()
    return qs ? `/weddings?${qs}` : '/weddings'
  }, [selectedDate, filters])

  return (
    <FormStepLayout
      title="Book a City Hall wedding"
      backHref={backHref}
      backLabel="Back"
      nextHref={withParams('/weddings/book/step-1')}
      nextLabel="Get started"
    >
      {/* Selected time and location */}
      <div className="flex flex-col gap-40">
        <div className="flex flex-col gap-8">
          <h2 className="font-body text-heading-lg-li lg:text-desktop-heading-md text-black m-0">
            Your selected time and location
          </h2>
          {dateTimeLabel ? (
            <p className="text-body text-black leading-24 m-0">
              {dateTimeLabel}
            </p>
          ) : null}
        </div>

        {location ? <LocationSummaryCard location={location} /> : null}
      </div>

      {/* Things we will ask you */}
      <div className="flex flex-col gap-8 lg:gap-12">
        <h2 className="font-body text-heading-lg-li lg:text-desktop-heading-md text-black m-0">
          Things we will ask you
        </h2>
        <ul className="list-disc pl-[24px] m-0 text-body text-black leading-24 flex flex-col gap-0">
          <li>Information about you and your partner</li>
          <li>The approximate number of guests</li>
          <li>Initial plans for your wedding</li>
        </ul>
      </div>

      {/* Time estimate */}
      <p className="text-body text-black leading-24 m-0">
        It will take about 5 minutes to complete this form.
      </p>
    </FormStepLayout>
  )
}

/** Convert "HH:mm" to "h:mm am/pm" display. */
function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  const hour12 = h % 12 || 12
  return `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`
}
