import { render, screen } from '@testing-library/react'
import { CallToActionFactory } from '@/lib/factories'
import { CallToAction } from './CallToAction'

describe('<CallToAction />', () => {
  const { value: ctaValues } = CallToActionFactory.make()

  it('renders the title', () => {
    render(<CallToAction {...ctaValues} />)
    const title = screen.getByText(ctaValues.title)

    expect(title).toBeInTheDocument()
  })

  it('renders the link with designated text', () => {
    render(<CallToAction {...ctaValues} />)
    const link = screen.getByText(ctaValues.link.text)

    expect(link).toBeInTheDocument()
  })

  it('renders the link with designated url', () => {
    render(<CallToAction {...ctaValues} />)
    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('href', ctaValues.link.url)
  })

  it.each([
    { title: ctaValues.title, link: { text: '', url: ctaValues.link.url } },
    { title: ctaValues.title, link: { text: ctaValues.link.text, url: '' } },
    { title: ctaValues.title, link: { text: '', url: '' } }
  ])('does not render the button when a link field is not present', (ctaValues) => {
    render(<CallToAction {...ctaValues} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders a link button with an aria label of the title and the link text', () => {
    render(<CallToAction {...ctaValues} />)
    const link = screen.getByLabelText(`${ctaValues.title} ${ctaValues.link.text}`)

    expect(link).toBeInTheDocument()
  })
})
