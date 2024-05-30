import {
  PhoneNumberFactory,
  EmailBlockFactory,
  SocialMediaFactory,
  TitleAndTextFactory
} from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { ContactFooter } from './ContactFooter'

describe('ContactFooter', () => {
  it('renders a contact footer with social media', () => {
    const contact = [
      {
        type: 'contact',
        value: {
          address: [],
          phone: [PhoneNumberFactory.make()],
          email: [EmailBlockFactory.make()],
          social_media_other: [SocialMediaFactory.make()]
        }
      }
    ]
    render(<ContactFooter items={contact[0]} />)
    expect(
      screen.getByText(contact[0].value.phone[0].value.owner)
    ).toBeInTheDocument()
  })

  it('renders a contact footer with additional info', () => {
    const contact = [
      {
        type: 'contact',
        value: {
          address: [],
          phone: [PhoneNumberFactory.make()],
          email: [EmailBlockFactory.make()],
          social_media_other: [TitleAndTextFactory.make()]
        }
      }
    ]
    render(<ContactFooter items={contact[0]} />)
    expect(
      screen.getByText(contact[0].value.phone[0].value.owner)
    ).toBeInTheDocument()
  })
})
