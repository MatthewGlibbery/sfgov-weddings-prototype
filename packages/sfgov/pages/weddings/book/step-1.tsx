import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { FormStepLayout } from '@/components/weddings'
import { TextField } from '@/components/weddings/TextField'
import { SelectField } from '@/components/weddings/SelectField'
import {
  useFormStore,
  getFormValues
} from '@/components/weddings/hooks/useFormStore'
import { useBookingParams } from '@/components/weddings/hooks/useBookingParams'

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
]

type FormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const REQUIRED_MESSAGE = 'This field is required'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\d{3}-?\d{3}-?\d{4}$/

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.firstName.trim()) errors.firstName = REQUIRED_MESSAGE
  if (!values.lastName.trim()) errors.lastName = REQUIRED_MESSAGE
  if (!values.email.trim()) {
    errors.email = REQUIRED_MESSAGE
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Enter a valid email address'
  }
  if (!values.phone.trim()) {
    errors.phone = REQUIRED_MESSAGE
  } else if (!PHONE_RE.test(values.phone.trim().replace(/\s/g, ''))) {
    errors.phone = 'Enter a valid phone number (e.g. 415-555-1234)'
  }
  if (!values.address.trim()) errors.address = REQUIRED_MESSAGE
  if (!values.city.trim()) errors.city = REQUIRED_MESSAGE
  if (!values.state) errors.state = REQUIRED_MESSAGE
  if (!values.zipCode.trim()) errors.zipCode = REQUIRED_MESSAGE
  return errors
}

/**
 * Form step 1 — "About you"
 * Collects: first name, last name, email, phone, address, city, state, zip.
 * Validates all required fields before allowing navigation to step 2.
 */
export default function WeddingsBookStep1() {
  const router = useRouter()
  const { set: persist } = useFormStore()
  const { withParams } = useBookingParams()

  const [values, setValues] = useState<FormValues>(() => {
    const s = getFormValues()
    return {
      firstName: s.firstName ?? '',
      lastName: s.lastName ?? '',
      email: s.email ?? '',
      phone: s.phone ?? '',
      address: s.address ?? '',
      city: s.city ?? '',
      state: s.state ?? '',
      zipCode: s.zipCode ?? ''
    }
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = useCallback(
    (field: keyof FormValues) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    router.push(withParams('/weddings/book/step-2'))
  }, [values, router, withParams])

  return (
    <FormStepLayout
      title="About you — Book a City Hall wedding"
      heading="About you"
      pageLabel="BOOK A CITY HALL WEDDING"
      subtitle={null}
      backHref={withParams('/weddings/book')}
      backLabel="Back"
      nextLabel="Next"
      onNext={handleNext}
    >
      {/* Section indicator */}
      <p className="font-body text-heading-lg-li lg:text-desktop-heading-md text-black m-0">
        Section 1 of 3
      </p>

      {/* Fields */}
      <div className="flex flex-col gap-40">
        <TextField
          label="Your first name"
          name="firstName"
          required
          value={values.firstName}
          onChange={handleChange('firstName')}
          error={errors.firstName}
        />
        <TextField
          label="Your last name"
          name="lastName"
          required
          value={values.lastName}
          onChange={handleChange('lastName')}
          error={errors.lastName}
        />
        <TextField
          label="Your email address"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={handleChange('email')}
          error={errors.email}
        />
        <TextField
          label="Your phone number"
          name="phone"
          type="tel"
          placeholder="_ _ _ - _ _ _ - _ _ _ _"
          required
          value={values.phone}
          onChange={handleChange('phone')}
          error={errors.phone}
        />
        <TextField
          label="Address"
          name="address"
          required
          value={values.address}
          onChange={handleChange('address')}
          error={errors.address}
        />
        <TextField
          label="City"
          name="city"
          required
          value={values.city}
          onChange={handleChange('city')}
          error={errors.city}
        />
        <SelectField
          label="State"
          name="state"
          options={US_STATES}
          placeholder="Select a state"
          required
          value={values.state}
          onChange={handleChange('state')}
          error={errors.state}
        />
        <TextField
          label="Zip code"
          name="zipCode"
          required
          value={values.zipCode}
          onChange={handleChange('zipCode')}
          error={errors.zipCode}
        />
      </div>
    </FormStepLayout>
  )
}
