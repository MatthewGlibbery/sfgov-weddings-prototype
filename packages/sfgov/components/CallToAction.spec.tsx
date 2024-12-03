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
    const link = screen.getByText(ctaValues.button_link.button.link_text)

    expect(link).toBeInTheDocument()
  })

  it('renders the link with designated url', () => {
    render(<CallToAction {...ctaValues} />)
    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('href', ctaValues.button_link.button.url)
  })

  it.each([
    {
      title: ctaValues.title,
      description: '',
      button_link: {
        button: {
          link_to: 'page',
          link_text: '',
          url: ctaValues.button_link.button.url,
          page: null
        }
      }
    },
    {
      title: ctaValues.title,
      description: '',
      button_link: {
        button: {
          link_to: 'page',
          link_text: ctaValues.button_link.button.link_text,
          url: ''
        }
      }
    },
    {
      title: ctaValues.title,
      description: '',
      button_link: { button: { link_to: 'page', link_text: '', url: '' } }
    }
  ])(
    'does not render the button when a link field is not present',
    (ctaValues) => {
      render(<CallToAction {...ctaValues} />)
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    }
  )

  it('renders a link button with an aria label', () => {
    render(<CallToAction {...ctaValues} />)
    const link = screen.getByLabelText(
      ctaValues.button_link.screenreader_label ||
        `${ctaValues.title} ${ctaValues.button_link.button.link_text}`
    )

    expect(link).toBeInTheDocument()
  })
})
