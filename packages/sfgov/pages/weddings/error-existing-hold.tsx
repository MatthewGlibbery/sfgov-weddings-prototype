import { Link } from '@/design-system'
import { ErrorPage } from '@/components/weddings/ErrorPage'

/**
 * Error page: Existing hold
 * Route: /weddings/error-existing-hold
 *
 * Shown when a user clicks 'next' on the about you / partner forms
 * but they already have an active hold for a City Hall wedding.
 */
export default function ErrorExistingHoldPage() {
  return (
    <ErrorPage
      title="You can only have one hold at a time"
      heading="You can only have one hold at a time"
      alertContent={
        <>
          <p className="m-0 mb-20 font-bold">
            You already have an active hold for a wedding at City Hall.
          </p>
          <p className="m-0">
            If you&apos;d like to cancel that hold, or if you believe this is
            incorrect, please email{' '}
            <Link
              href="mailto:cityhall.events@sfgov.org"
              className="text-primary600 font-bold underline"
            >
              cityhall.events@sfgov.org
            </Link>
            .
          </p>
        </>
      }
      backLabel="Back to San Francisco City Hall Events"
      backHref="https://web-training.dev.sf.gov/department-san-francisco-city-hall-events"
      hidePrimary
    />
  )
}
