import type { ReactNode } from 'react'
import {
  Button,
  Container,
  DisplayXXXl,
  IconArrowLeft,
  IconArrowRight,
  PageLabel
} from '@/design-system'
import { PrototypeLayout } from './PrototypeLayout'

export type FormStepLayoutProps = {
  /** Page <title> suffix */
  title?: string
  /** Visible page heading (DisplayXXXl) */
  heading?: string
  /** Page label above the heading */
  pageLabel?: string
  /** Subtitle below heading (null to hide) */
  subtitle?: string | null
  /** Back button href (null hides the button) */
  backHref?: string | null
  /** Back button label */
  backLabel?: string
  /** Next button href — used as a plain link when onNext is not provided */
  nextHref?: string | null
  /** Next button label */
  nextLabel?: string
  /**
   * Called when Next is clicked. If provided, the next button becomes a
   * <button> that calls this handler instead of navigating directly.
   * The handler should validate and programmatically navigate on success.
   */
  onNext?: () => void
  /** Content above the button bar */
  children: ReactNode
}

/**
 * Shared chrome for the multi-step wedding booking form.
 * Renders the page header (label + title + optional subtitle), content slot,
 * and a back/next button bar at the bottom.
 */
export function FormStepLayout({
  title = 'Book a City Hall wedding',
  heading = 'Book a City Hall Wedding',
  pageLabel = 'FORM',
  subtitle = 'Use this form to submit a booking request for a one-hour or two-hour City Hall wedding.',
  backHref = '/weddings',
  backLabel = 'Back',
  nextHref,
  nextLabel = 'Next',
  onNext,
  children
}: FormStepLayoutProps) {
  const showNext = Boolean(nextHref) || Boolean(onNext)

  return (
    <PrototypeLayout title={title}>
      {/* Page header */}
      <Container as="section" className="pt-[24px] lg:pt-[32px] pb-28 lg:pb-60">
        <PageLabel label={pageLabel} />
        <DisplayXXXl as="h1" className="!mb-12 lg:!mb-16 mt-12">
          {heading}
        </DisplayXXXl>
        {subtitle ? (
          <p className="font-body text-display-lg lg:text-desktop-display-lg text-neutral700 max-w-[902px] mb-0">
            {subtitle}
          </p>
        ) : null}
      </Container>

      {/* Form content */}
      <Container as="section" className="pb-60 lg:pb-80">
        <div className="flex flex-col lg:flex-row lg:gap-x-[121px]">
          <div className="flex flex-col gap-28 lg:w-[623px] lg:shrink-0">
            {children}

            {/* Button bar — extra spacing on desktop */}
            <div className="flex items-center justify-between w-full pt-12 lg:pt-[32px]">
              {backHref ? (
                <Button
                  as="a"
                  href={backHref}
                  variant="secondary"
                  className="h-40 gap-4"
                >
                  <IconArrowLeft width={20} height={20} aria-hidden />
                  {backLabel}
                </Button>
              ) : (
                <span />
              )}
              {showNext ? (
                onNext ? (
                  <Button onClick={onNext} className="h-40 gap-4">
                    {nextLabel}
                    <IconArrowRight width={20} height={20} aria-hidden />
                  </Button>
                ) : (
                  <Button as="a" href={nextHref!} className="h-40 gap-4">
                    {nextLabel}
                    <IconArrowRight width={20} height={20} aria-hidden />
                  </Button>
                )
              ) : (
                <span />
              )}
            </div>
          </div>

          {/* Right column spacer (matches desktop Figma layout) */}
          <div className="hidden lg:block lg:w-[344px] lg:shrink-0" />
        </div>
      </Container>
    </PrototypeLayout>
  )
}
