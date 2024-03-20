import { render, screen } from '@testing-library/react'
import { PageLabel } from './PageLabel'

describe('PageLabel', () => {
  it('renders a PageLabel', () => {
    render(<PageLabel label="label" />)

    const heading = screen.getByText('LABEL')
    expect(heading).toBeInTheDocument()
  })
})
