import { ErrorPage } from '@/components/weddings/ErrorPage'
import { useBookingParams } from '@/components/weddings/hooks/useBookingParams'

/**
 * Error page: Time no longer available
 * Route: /weddings/error-unavailable
 *
 * Shown when a user clicks a timeslot on the calendar or submits a form,
 * but the selected time is no longer available.
 */
export default function ErrorUnavailablePage() {
  const { withParams } = useBookingParams()

  return (
    <ErrorPage
      title="Your selected time is no longer available"
      heading="Your selected time is no longer available"
      alertContent={
        <p className="m-0">
          The time you selected is no longer available. Return to the calendar
          to find another available time.
        </p>
      }
      backLabel="Back to calendar"
      backHref={withParams('/weddings')}
      hidePrimary
    />
  )
}
