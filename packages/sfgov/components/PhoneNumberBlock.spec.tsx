import { PhoneNumberFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { PhoneNumberBlock } from './PhoneNumberBlock'

describe('PhoneNumberBlock', () => {
  const { value: phoneNumberBlockValues } = PhoneNumberFactory.make()
  const { owner, phone_number: phoneNumber, details } = phoneNumberBlockValues

  it.each([
    { what: 'owner field', input: phoneNumberBlockValues.owner },
    { what: 'phone number field', input: phoneNumberBlockValues.phone_number },
    { what: 'details field', input: phoneNumberBlockValues.details }
  ])('renders the $what', ({ input }) => {
    render(<PhoneNumberBlock {...phoneNumberBlockValues} />)
    expect(screen.getByText(input)).toBeInTheDocument()
  })

  it.each([
    {
      what: 'owner field',
      input: { owner: '', phone_number: phoneNumber, details },
      expected: owner
    },
    {
      what: 'phone number field',
      input: { owner, phone_number: '', details },
      expected: phoneNumber
    },
    {
      what: 'details field',
      input: { owner, phone_number: phoneNumber, details: '' },
      expected: details
    }
  ])('does not render the $what when not present', ({ input, expected }) => {
    render(<PhoneNumberBlock {...input} />)
    expect(screen.queryByText(expected)).not.toBeInTheDocument()
  })
})
