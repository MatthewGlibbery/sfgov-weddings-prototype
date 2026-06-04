import { useMemo } from 'react'
import { format } from 'date-fns'
import {
  Container,
  DisplayXXXl,
  IconEmail,
  IconInfo,
  IconPhone,
  Link,
  PageLabel
} from '@/design-system'
import {
  FeedbackSurvey,
  LocationSummaryCard,
  PrototypeLayout,
  useBookingState
} from '@/components/weddings'
import { LOCATIONS } from '@/components/weddings/data/locations'

/**
 * Form confirmation page — `/weddings/book/confirmation`
 *
 * Shows after successful form submission. Displays the booking
 * summary, next steps, feedback survey, and contact info.
 */
export default function WeddingsBookConfirmation() {
  const { selectedDate, selectedTime, selectedLocation } = useBookingState()

  const location = selectedLocation ? LOCATIONS[selectedLocation] : null

  const dateTimeLabel = useMemo(() => {
    if (!selectedDate) return null
    const timePart = selectedTime ? ` at ${formatTime(selectedTime)}` : ''
    return `${format(selectedDate, 'EEEE, MMMM d, yyyy')}${timePart}`
  }, [selectedDate, selectedTime])

  return (
    <PrototypeLayout title="We received your request — Book a City Hall wedding">
      {/* Page header */}
      <Container as="section" className="pt-[24px] lg:pt-[32px] pb-28 lg:pb-60">
        <PageLabel label="BOOK A CITY HALL WEDDING" />
        <DisplayXXXl as="h1" className="!mb-12 lg:!mb-16 mt-12">
          We received your request
        </DisplayXXXl>
        <Link
          href="https://web-training.dev.sf.gov/department-san-francisco-city-hall-events"
          className="text-primary500 underline text-body leading-24"
        >
          San Francisco City Hall Events Office
        </Link>
      </Container>

      {/* Content */}
      <Container as="section" className="pb-60 lg:pb-80">
        <div className="flex flex-col gap-40 lg:w-[623px]">
          {/* Page-level alert */}
          <div className="flex w-full lg:w-[1088px]">
            <div className="bg-[#0046c2] w-8 shrink-0 self-stretch" />
            <div className="flex-1 bg-[#e5f1ff] flex gap-12 items-start py-28 pl-20 pr-28">
              <IconInfo
                width={24}
                height={24}
                className="shrink-0 text-[#0046c2]"
                aria-hidden
              />
              <div className="flex flex-col gap-8">
                <p className="font-body font-bold text-body leading-24 text-neutral900 m-0">
                  Your booking is not finalized yet.
                </p>
                <p className="text-body text-black leading-24 m-0">
                  You&apos;ll receive an email confirming this hold within 48
                  hours. To fully secure your date, reply to that email to
                  request a contract, then sign and pay the deposit.
                </p>
              </div>
            </div>
          </div>

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

          {/* Thank you copy */}
          <div className="flex flex-col gap-20">
            <p className="text-body text-neutral900 leading-24 m-0">
              Thank you for submitting a request for a City Hall wedding.
            </p>
            <p className="text-body font-bold text-black leading-24 m-0">
              Your date isn&apos;t fully secured until you&apos;ve signed a
              contract and paid the deposit.
            </p>
          </div>

          {/* Next steps */}
          <div className="flex flex-col gap-8">
            <p className="font-body font-bold text-body text-black leading-24 m-0">
              Next steps
            </p>
            <ul className="list-disc pl-[24px] m-0 text-body text-black leading-24 flex flex-col gap-0">
              <li>
                You&apos;ll receive an email in the next 48 hours that confirms
                this hold.
              </li>
              <li>
                You have 30 days from that point to request a contract by email,
                or your hold will be released.
              </li>
            </ul>
          </div>

          {/* Process link */}
          <p className="text-body text-black leading-24 m-0">
            You can review the full{' '}
            <Link
              href="https://www.sf.gov/book-city-hall-for-your-wedding-or-event?preview=true&ts=20260601121208"
              className="text-primary600 underline"
            >
              process for booking a City Hall wedding
            </Link>
            .
          </p>

          {/* Feedback survey */}
          <FeedbackSurvey />

          {/* Contact us */}
          <div className="flex flex-col gap-[24px]">
            <h2 className="font-slab font-semibold text-[32px] leading-[44px] text-neutral900 m-0">
              Contact us
            </h2>
            <div className="flex flex-col md:flex-row gap-[32px] md:gap-28 md:items-center">
              <div className="flex flex-col gap-16 md:w-[316px]">
                <IconPhone
                  width={20}
                  height={20}
                  className="text-black"
                  aria-hidden
                />
                <p className="font-slab font-medium text-[24px] leading-[32px] text-neutral900 m-0">
                  Phone
                </p>
                <Link
                  href="tel:6286526079"
                  className="text-primary500 underline text-body leading-24"
                >
                  628-652-6079
                </Link>
              </div>
              <div className="hidden md:flex flex-row items-center self-stretch">
                <div className="w-[1px] h-full bg-[#d9d9d9]" />
              </div>
              <div className="flex flex-col gap-16 md:w-[316px]">
                <IconEmail
                  width={20}
                  height={20}
                  className="text-black"
                  aria-hidden
                />
                <p className="font-slab font-medium text-[24px] leading-[32px] text-neutral900 m-0">
                  Email
                </p>
                <Link
                  href="mailto:cityhall.events@sfgov.org"
                  className="text-primary500 underline text-body leading-24"
                >
                  cityhall.events@sfgov.org
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </PrototypeLayout>
  )
}

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  const hour12 = h % 12 || 12
  return `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`
}
