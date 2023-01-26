import { render, screen } from '@testing-library/react'
import AboutPage from './AboutPage'

describe('AboutPage', () => {
  it('renders a heading', () => {
    render(<AboutPage />)

    const heading = screen.getByRole('heading', {
      name: /About SF\.gov/
    })

    expect(heading).toBeInTheDocument()
  })
})
