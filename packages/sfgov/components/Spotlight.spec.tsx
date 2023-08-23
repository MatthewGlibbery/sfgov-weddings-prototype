import { PageFactory, SpotlightFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { Spotlight } from './Spotlight'

describe('Spotlight', () => {
  const spotlight = SpotlightFactory.make()
  it('renders a spotlight with an external link', () => {
    render(<Spotlight {...spotlight} />)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })

  it('renders a spotlight with an external link', () => {
    spotlight.value.button = {
      link_to: 'page',
      url: '',
      page: PageFactory.make(),
      link_text: 'website'
    }
    render(<Spotlight {...spotlight} />)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })
})
