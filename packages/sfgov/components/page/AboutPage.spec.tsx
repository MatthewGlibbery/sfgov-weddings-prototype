import { AboutPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { AboutPage } from './AboutPage'

describe('AboutPage', () => {
  const fixture = AboutPageFactory.make()

  it('renders the page title', () => {
    render(<AboutPage page={fixture} />)
    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(fixture.title)
  })
})
