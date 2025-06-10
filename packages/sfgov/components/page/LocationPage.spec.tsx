import { LocationPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { LocationPage } from './LocationPage'

describe('LocationPage', () => {
  it('renders a location page', () => {
    const page = LocationPageFactory.make()
    render(<LocationPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })

  it('renders the permit center page with QLess data', () => {
    const page = LocationPageFactory.make({
      id: 2736
    })
    render(<LocationPage page={page} />)
  })

  it('does not render a map if there is no address', () => {
    const page = LocationPageFactory.make()
    page.contact[0].value.address = []
    render(<LocationPage page={page} />)

    expect(screen.queryByTestId('location-map')).not.toBeInTheDocument()
  })
})
