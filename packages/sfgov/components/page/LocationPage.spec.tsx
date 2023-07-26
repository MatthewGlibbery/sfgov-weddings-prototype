import { LocationPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { LocationPage } from './LocationPage'

describe('LocationPage', () => {
  const page = LocationPageFactory.make()

  it('renders a location page', () => {
    render(<LocationPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })
})
