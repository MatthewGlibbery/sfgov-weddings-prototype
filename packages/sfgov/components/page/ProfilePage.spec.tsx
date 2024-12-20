import { ProfilePageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { ProfilePage } from './ProfilePage'
import {
  EmailBlockFactory,
  LocationBlockFactory,
  PhoneNumberFactory,
  SocialMediaFactory
} from '../../lib/factories'

describe('ProfilePage', () => {
  it('renders a profile page with a title', () => {
    const page = ProfilePageFactory.make()
    render(<ProfilePage page={page} />)
    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })

  it('renders an anchor for direct contact', () => {
    const page = ProfilePageFactory.make()
    render(<ProfilePage page={page} />)
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '#direct-contact'
    )
  })

  it('renders an anchor for contact if direct contact does not exist', () => {
    const page = ProfilePageFactory.make({
      email: [],
      phone: [],
      social_media: []
    })
    render(<ProfilePage page={page} />)
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '#agency-contact'
    )
  })

  it('uses the primary agency contact info where appropriate', () => {
    const page = ProfilePageFactory.make()

    // wipe out factory contact address and phone number
    page.contact[0].value.address = []
    page.contact[0].value.phone = []
    render(<ProfilePage page={page} />)

    // expect manual entries to override agency contact appropriately
    expect(
      screen
        .getByTestId('contact-email')
        .textContent?.indexOf(page.contact[0].value.email[0].value.email)
    ).toBeGreaterThanOrEqual(0)
    expect(
      screen.getAllByRole('link', { name: 'facebook' })[1]
    ).toHaveAttribute(
      'href',
      page.contact[0].value.social_media_other[0].value.facebook
    )

    // expect agency contact info to be present where no manual entry exists
    expect(
      screen
        .getByTestId('contact-address')
        .textContent?.indexOf(
          page.agency_contact[0].value.address[0].value.address_title
        )
    ).toBeGreaterThanOrEqual(0)
    expect(
      screen
        .getByTestId('contact-phone')
        .textContent?.indexOf(
          page.agency_contact[0].value.phone[0].value.phone_number
        )
    ).toBeGreaterThanOrEqual(0)
  })
})
