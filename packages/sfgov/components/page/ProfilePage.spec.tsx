import { ProfilePageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { ProfilePage } from './ProfilePage'

describe('ProfilePage', () => {
  const page = ProfilePageFactory.make()

  it('renders a profile page with a title', () => {
    render(<ProfilePage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })

  it('renders an anchor for direct contact', () => {
    render(<ProfilePage page={page} />)

    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '#direct-contact'
    )
  })

  it('renders an anchor for contact if direct contact does not exist', () => {
    page.email = []
    page.phone = []
    page.social_media = []
    render(<ProfilePage page={page} />)

    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '#agency-contact'
    )
  })
})
