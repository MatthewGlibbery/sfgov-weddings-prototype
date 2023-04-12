import { EmailBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { EmailBlockLink } from './EmailBlockLink'

describe('EmailBlockLink', () => {
  const email = EmailBlockFactory.make()

  it('renders an email anchor tag', () => {
    render(<EmailBlockLink {...email} />)

    const emailLink = screen.getByRole('link')
    expect(emailLink).toBeInTheDocument()
  })

  it('does not render without value.email', () => {
    // @ts-expect-error simulating bad data
    expect(render(<EmailBlockLink value={null} />).container).toBeEmptyDOMElement()
  })

  it('renders value.email if the title is falsy or empty', () => {
    const email = 'foo@bar.com'
    render(<EmailBlockLink value={{ email, title: '' }} type={'email'} id={''} />)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', `mailto:${email}`)
    expect(link).toHaveTextContent(email)
  })
})
