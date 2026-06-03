import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { FormStepLayout } from '@/components/weddings'
import { TextField } from '@/components/weddings/TextField'
import {
  useFormStore,
  getFormValues
} from '@/components/weddings/hooks/useFormStore'
import { useBookingParams } from '@/components/weddings/hooks/useBookingParams'

type FormValues = {
  partnerFirstName: string
  partnerLastName: string
  partnerEmail: string
  partnerPhone: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\d{3}-?\d{3}-?\d{4}$/

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.partnerFirstName.trim())
    errors.partnerFirstName = 'This field is required'
  if (!values.partnerLastName.trim())
    errors.partnerLastName = 'This field is required'
  if (!values.partnerEmail.trim()) {
    errors.partnerEmail = 'This field is required'
  } else if (!EMAIL_RE.test(values.partnerEmail.trim())) {
    errors.partnerEmail = 'Enter a valid email address'
  }
  if (!values.partnerPhone.trim()) {
    errors.partnerPhone = 'This field is required'
  } else if (!PHONE_RE.test(values.partnerPhone.trim().replace(/\s/g, ''))) {
    errors.partnerPhone = 'Enter a valid phone number (e.g. 415-555-1234)'
  }
  return errors
}

/**
 * Form step 2 — "About your partner"
 * Collects: partner's first name, last name, email, phone.
 */
export default function WeddingsBookStep2() {
  const router = useRouter()
  const { set: persist } = useFormStore()
  const { withParams } = useBookingParams()

  const [values, setValues] = useState<FormValues>(() => {
    const s = getFormValues()
    return {
      partnerFirstName: s.partnerFirstName ?? '',
      partnerLastName: s.partnerLastName ?? '',
      partnerEmail: s.partnerEmail ?? '',
      partnerPhone: s.partnerPhone ?? ''
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

  const handleNext = useCallback(() => {
    const errs = validate(values)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    router.push(withParams('/weddings/book/step-3'))
  }, [values, router, withParams])

  return (
    <FormStepLayout
      title="About your partner — Book a City Hall wedding"
      heading="About your partner"
      pageLabel="BOOK A CITY HALL WEDDING"
      subtitle={null}
      backHref={withParams('/weddings/book/step-1')}
      backLabel="Back"
      nextLabel="Next"
      onNext={handleNext}
    >
      {/* Section indicator */}
      <p className="font-body text-heading-lg-li lg:text-desktop-heading-md text-black m-0">
        Section 2 of 3
      </p>

      {/* Fields */}
      <div className="flex flex-col gap-40">
        <TextField
          label="Your partner's first name"
          name="partnerFirstName"
          required
          value={values.partnerFirstName}
          onChange={handleChange('partnerFirstName')}
          error={errors.partnerFirstName}
        />
        <TextField
          label="Your partner's last name"
          name="partnerLastName"
          required
          value={values.partnerLastName}
          onChange={handleChange('partnerLastName')}
          error={errors.partnerLastName}
        />
        <TextField
          label="Your partner's email address"
          name="partnerEmail"
          type="email"
          required
          value={values.partnerEmail}
          onChange={handleChange('partnerEmail')}
          error={errors.partnerEmail}
        />
        <TextField
          label="Your partner's phone number"
          name="partnerPhone"
          type="tel"
          placeholder="_ _ _ - _ _ _ - _ _ _ _"
          required
          value={values.partnerPhone}
          onChange={handleChange('partnerPhone')}
          error={errors.partnerPhone}
        />
      </div>
    </FormStepLayout>
  )
}
