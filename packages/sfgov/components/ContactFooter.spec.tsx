import {
  PhoneNumberFactory,
  EmailBlockFactory,
  SocialMediaFactory,
  TitleAndTextFactory,
  LocationBlockFactory
} from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { ContactFooter } from './ContactFooter'

describe('ContactFooter', () => {
  it('renders a contact footer with social media', () => {
    const contact = [
      {
        type: 'contact',
        value: {
          address: [LocationBlockFactory.make()],
          phone: [],
          email: [EmailBlockFactory.make()],
          social_media_other: [SocialMediaFactory.make()]
        }
      }
    ]
    render(<ContactFooter items={contact[0]} />)
    expect(screen.getByRole('link', { name: 'facebook' })).toBeInTheDocument()
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
  it('renders a contact footer from an array', () => {
    const phone = { type: 'phone', value: PhoneNumberFactory.make().value }
    const socialMedia = {
      type: 'social_media_other',
      value: [SocialMediaFactory.make()]
    }
    const titleAndText = {
      type: 'social_media_other',
      value: [TitleAndTextFactory.make()]
    }
    const contactArray = [
      phone,
      EmailBlockFactory.make(),
      socialMedia,
      titleAndText
    ]

    render(<ContactFooter items={contactArray} />)
    expect(screen.getByText(phone.value.owner)).toBeInTheDocument()
  })

  it('renders a contact footer with something something', () => {
    const contact = [{ type: 'not-contact-type', value: 'blah' }]
    render(<ContactFooter items={contact} />)
  })
})
