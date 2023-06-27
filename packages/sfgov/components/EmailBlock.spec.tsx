import { EmailBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { EmailBlock } from './EmailBlock'

describe('EmailBlockLink', () => {
  const email = EmailBlockFactory.make()

  it('renders an email anchor tag', () => {
    render(<EmailBlock {...email.value} />)

    const emailLink = screen.getByRole('link')
    expect(emailLink).toBeInTheDocument()
  })

  it('does not render without value.email', () => {
    expect(
      // @ts-expect-error simulating bad data
      render(<EmailBlock value={null} />).container
    ).toBeEmptyDOMElement()
  })

  it('renders value.email if the title is falsy or empty', () => {
    const email = 'foo@bar.com'
    render(<EmailBlock email={email} title="" />)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', `mailto:${email}`)
    expect(link).toHaveTextContent(email)
  })
})
