import { HomePageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  const page = HomePageFactory.make()
  it('renders the home page with a spotlight', () => {
    render(<HomePage page={page} />)

    const spotlightTitle = screen.getByText(page.spotlight[0].value.title)
    expect(spotlightTitle).toBeInTheDocument()
  })
})
