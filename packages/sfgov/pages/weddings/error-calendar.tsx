import { Link } from '@/design-system'
import { ErrorPage } from '@/components/weddings/ErrorPage'

/**
 * Error page: Calendar unavailable
 * Route: /weddings/error-calendar
 *
 * Shown when the system that holds availability data is unreachable
 * and the calendar cannot be loaded.
 */
export default function ErrorCalendarPage() {
  return (
    <ErrorPage
      title="We couldn't reach the calendar"
      heading="We couldn't reach the calendar"
      alertContent={
        <>
          <p className="mb-20">
            Use the &lsquo;Retry&rsquo; button to try again.
          </p>
          <p className="m-0">
            If you continue experiencing issues, please reach out to{' '}
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
    />
  )
}
