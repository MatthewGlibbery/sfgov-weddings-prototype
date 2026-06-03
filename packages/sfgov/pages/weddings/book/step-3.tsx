import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Callout,
  FormStepLayout,
  RadioGroup,
  useBookingState
} from '@/components/weddings'
import { TextField } from '@/components/weddings/TextField'
import {
  useFormStore,
  getFormValues
} from '@/components/weddings/hooks/useFormStore'
import { useBookingParams } from '@/components/weddings/hooks/useBookingParams'
import type { LocationId } from '@/components/weddings/types'

type YesNoUnsure = 'yes' | 'no' | 'unsure' | ''

type FormValues = {
  guestCount: string
  officiant: YesNoUnsure
  musicians: YesNoUnsure
  floral: YesNoUnsure
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unsure', label: "I'm not sure" }
]

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.guestCount.trim()) {
    errors.guestCount = 'This field is required'
  } else if (!/^\d+$/.test(values.guestCount.trim())) {
    errors.guestCount = 'Enter a number'
  }
  if (!values.officiant) errors.officiant = 'This field is required'
  if (!values.musicians) errors.musicians = 'This field is required'
  if (!values.floral) errors.floral = 'This field is required'
  return errors
}

/**
 * Form step 3 — "Your wedding"
 * Collects: guest count, officiant, musicians, floral plans.
 * Shows conditional callouts based on guest count + location and radio answers.
 */
export default function WeddingsBookStep3() {
  const router = useRouter()
  const { set: persist } = useFormStore()
  const { selectedLocation } = useBookingState()
  const { withParams } = useBookingParams()

  const locationId = selectedLocation as LocationId | null

  const [values, setValues] = useState<FormValues>(() => {
    const s = getFormValues()
    return {
      guestCount: s.guestCount ?? '',
      officiant: (s.officiant as YesNoUnsure) ?? '',
      musicians: (s.musicians as YesNoUnsure) ?? '',
      floral: (s.floral as YesNoUnsure) ?? ''
    }
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = useCallback(
    (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValues((prev) => {
        const next = { ...prev, [field]: newValue }
        persist(next)
        return next
      })
      setErrors((prev) => {
        if (!prev[field]) return prev
        const next = { ...prev }
        delete next[field]
        return next
      })
    },
    [persist]
  )

  const handleRadioChange = useCallback(
    (field: keyof FormValues) => (value: string) => {
      setValues((prev) => {
        const next = { ...prev, [field]: value }
        persist(next)
        return next
      })
      setErrors((prev) => {
        if (!prev[field]) return prev
        const next = { ...prev }
        delete next[field]
        return next
      })
    },
    [persist]
  )

  // Guest count alerts logic
  const guestNum = parseInt(values.guestCount, 10) || 0
  const showBalconyLimit = locationId === 'mayors-balcony' && guestNum > 100
  const showGalleryLimit =
    locationId === 'fourth-floor-gallery' && guestNum > 100
  const showRotundaWarning = locationId === 'rotunda' && guestNum > 200
  const showClerkInfo = guestNum > 0 && guestNum < 7
  const hasBlockingGuestError = showBalconyLimit || showGalleryLimit

  // Conditional callouts for radio answers
  const showOfficiantCallout =
    values.officiant === 'yes' || values.officiant === 'unsure'
  const showMusiciansCallout =
    values.musicians === 'yes' || values.musicians === 'unsure'
  const showFloralCallout =
    values.floral === 'yes' || values.floral === 'unsure'

  const handleNext = useCallback(() => {
    const errs = validate(values)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (hasBlockingGuestError) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    router.push(withParams('/weddings/book/confirmation'))
  }, [values, router, hasBlockingGuestError, withParams])

  return (
    <FormStepLayout
      title="Your wedding — Book a City Hall wedding"
      heading="Your wedding"
      pageLabel="BOOK A CITY HALL WEDDING"
      subtitle={null}
      backHref={withParams('/weddings/book/step-2')}
      backLabel="Back"
      nextLabel="Submit"
      onNext={handleNext}
    >
      {/* Section indicator */}
      <p className="font-body text-heading-lg-li lg:text-desktop-heading-md text-black m-0">
        Section 3 of 3
      </p>

      {/* Guest count */}
      <TextField
        label="Approximate number of guests"
        name="guestCount"
        inputMode="numeric"
        pattern="[0-9]*"
        required
        value={values.guestCount}
        onChange={handleChange('guestCount')}
        error={errors.guestCount}
      />

      {/* Guest count conditional alerts */}
      {showBalconyLimit ? (
        <Callout variant="danger" title="You're above the guest limit">
          <p className="m-0">
            The Mayor&apos;s Balcony only allows up to 100 guests.
          </p>
        </Callout>
      ) : null}

      {showGalleryLimit ? (
        <Callout variant="danger" title="You're above the guest limit">
          <p className="m-0">
            The Fourth Floor Gallery only allows up to 100 guests.
          </p>
        </Callout>
      ) : null}

      {showRotundaWarning ? (
        <Callout
          variant="warning"
          title="You're above the included guest limit"
        >
          <p className="m-0">
            Two hour weddings include up to 200 guests. Each guest over 200 is
            $4.
          </p>
        </Callout>
      ) : null}

      {showClerkInfo ? (
        <Callout variant="info" title="Marriages with the County Clerk">
          <p className="m-0">
            Weddings with 6 or fewer guests may do a civil ceremony with the
            County Clerk. Learn more about a{' '}
            <a
              href="https://www.sf.gov/have-civil-marriage-or-domestic-partnership-ceremony-city-hall"
              className="text-primary600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              civil ceremony with the County Clerk
            </a>
            .
          </p>
        </Callout>
      ) : null}

      {/* Officiant */}
      <RadioGroup
        label="Do you plan to use an officiant?"
        name="officiant"
        options={YES_NO_OPTIONS}
        value={values.officiant}
        onChange={handleRadioChange('officiant')}
        required
        error={errors.officiant}
      />

      {showOfficiantCallout ? (
        <Callout variant="info" title="Officiant guidelines">
          <p className="m-0">
            Your officiant must comply with the{' '}
            <a
              href="https://www.cdph.ca.gov/Programs/CHSI/Pages/Marriage-Officiant-Frequently-Asked-Questions.aspx"
              className="text-primary600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              State of California&apos;s marriage officiant guidelines
            </a>
            .
          </p>
        </Callout>
      ) : null}

      {/* Musicians */}
      <RadioGroup
        label="Do you plan to hire musicians?"
        name="musicians"
        options={YES_NO_OPTIONS}
        value={values.musicians}
        onChange={handleRadioChange('musicians')}
        required
        error={errors.musicians}
      />

      {showMusiciansCallout ? (
        <Callout variant="info" title="Approved vendors list">
          <p className="m-0">
            Your music provider must be on{' '}
            <a
              href="https://sfcityhallevents.org/vendors/"
              className="text-primary600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              the city&apos;s approved vendor list
            </a>{' '}
            and you must notify the city ahead of time.
          </p>
        </Callout>
      ) : null}

      {/* Floral */}
      <RadioGroup
        label="Do you plan to bring floral arrangements?"
        name="floral"
        options={YES_NO_OPTIONS}
        value={values.floral}
        onChange={handleRadioChange('floral')}
        required
        error={errors.floral}
      />

      {showFloralCallout ? (
        <Callout variant="info" title="Approved vendors list">
          <p className="m-0">
            Your flower provider must be on{' '}
            <a
              href="https://sfcityhallevents.org/vendors/"
              className="text-primary600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              the city&apos;s approved vendor list
            </a>{' '}
            and you must notify the city ahead of time.
          </p>
        </Callout>
      ) : null}
    </FormStepLayout>
  )
}
