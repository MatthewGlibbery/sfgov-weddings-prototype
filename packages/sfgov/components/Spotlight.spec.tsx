import { PageFactory, SpotlightFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { Spotlight } from './Spotlight'

describe('Spotlight', () => {
  const spotlight = SpotlightFactory.make()
  it('renders a spotlight with an external link', () => {
    render(<Spotlight {...spotlight} />)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute(
      'aria-label',
      spotlight.value.button_link[0].value.screenreader_label
    )
  })

  it('renders a spotlight with an internal page link', () => {
    spotlight.value.button_link[0].value = {
      button: {
        link_to: 'page',
        url: '',
        page: PageFactory.make(),
        link_text: 'website'
      },
      screenreader_label: ''
    }
    render(<Spotlight {...spotlight} />)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute(
      'aria-label',
      `${spotlight.value.title} ${spotlight.value.button_link[0].value.button.link_text}`
    )
  })
})
