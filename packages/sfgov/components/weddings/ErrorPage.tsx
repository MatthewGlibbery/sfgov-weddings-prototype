import {
  Button,
  Container,
  DisplayXXXl,
  Link,
  PageLabel
} from '@/design-system'
import type { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { PrototypeLayout } from './PrototypeLayout'
import { PageAlert } from './PageAlert'
import type { PageAlertVariant } from './PageAlert'

export type ErrorPageProps = {
  /** The page <title> (used in the browser tab) */
  title: string
  /** The large heading displayed below the page label */
  heading: string
  /** Alert variant (defaults to danger) */
  alertVariant?: PageAlertVariant
  /** Content inside the page-level alert */
  alertContent: ReactNode
  /** Label for the secondary (back) button. Defaults to "Back to City Hall Events" */
  backLabel?: string
  /** href for the back button. Defaults to "#" */
  backHref?: string
  /** Label for the primary action button. Defaults to "Retry" */
  primaryLabel?: string
  /** Handler for the primary action button. Defaults to router.reload() */
  onPrimaryAction?: () => void
  /** If true, hide the primary action button */
  hidePrimary?: boolean
}

/**
 * Shared error page layout for the wedding-booking prototype.
 *
 * All error pages share the same structure:
 * - Common page header with page label + heading
 * - Page-level alert
 * - Two action buttons (back + retry/primary)
 *
 * Responsive:
 * - Mobile: 28px gap between top-level sections, buttons full-width stacked
 * - Desktop: 60px gap, buttons inline with space-between in a constrained width
 */
export function ErrorPage({
  title,
  heading,
  alertVariant = 'danger',
  alertContent,
  backLabel = 'Back to City Hall Events',
  backHref = '#',
  primaryLabel = 'Retry',
  onPrimaryAction,
  hidePrimary = false
}: ErrorPageProps) {
  const router = useRouter()

  const handleRetry = () => {
    if (onPrimaryAction) {
      onPrimaryAction()
    } else {
      router.reload()
    }
  }

  return (
    <PrototypeLayout title={`${title} — Book a City Hall wedding`}>
      {/* Page header */}
      <Container as="section" className="pt-[24px] lg:pt-[32px] pb-28 lg:pb-60">
        <PageLabel label="BOOK A CITY HALL WEDDING" />
        <DisplayXXXl as="h1" className="!mb-0 mt-12 lg:mt-[24px]">
          {heading}
        </DisplayXXXl>
      </Container>

      {/* Alert + actions */}
      <Container as="section" className="pb-60 lg:pb-80">
        <div className="flex flex-col gap-28 lg:gap-60">
          {/* Page-level alert */}
          <div className="w-full lg:w-[1088px]">
            <PageAlert variant={alertVariant}>{alertContent}</PageAlert>
          </div>

          {/* Action buttons */}
          <div className="flex items-start justify-between w-full lg:w-[623px]">
            <Button
              as="a"
              href={backHref}
              variant="secondary"
              className="!h-40"
            >
              {backLabel}
            </Button>
            {!hidePrimary ? (
              <Button variant="primary" onClick={handleRetry} className="!h-40">
                {primaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </PrototypeLayout>
  )
}
