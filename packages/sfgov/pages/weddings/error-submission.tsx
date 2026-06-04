import { Link } from '@/design-system'
import { ErrorPage } from '@/components/weddings/ErrorPage'

/**
 * Error page: Integration failure / couldn't confirm booking
 * Route: /weddings/error-submission
 *
 * Shown when a user submits the form but there is an issue capturing
 * the submission (integration failure).
 */
export default function ErrorSubmissionPage() {
  return (
    <ErrorPage
      title="We couldn't confirm your booking"
      heading="We couldn&#x2019;t confirm your booking"
      alertContent={
        <>
          <p className="m-0 mb-20">Please submit the form again.</p>
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
      backLabel="Back to calendar"
      backHref="/weddings"
      primaryLabel="Retry"
    />
  )
}
