import { render, screen } from '@testing-library/react'
import { IndicatorWithTitle } from './Indicator'

describe('Indicator', () => {
  it('renders an Indicator with a title', () => {
    const title = 'Title'
    render(<IndicatorWithTitle title={title} />)

    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent(title)
  })
})
