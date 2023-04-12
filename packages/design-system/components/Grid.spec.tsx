import { render, screen } from '@testing-library/react'
import { Grid } from './Grid'

describe('Grid', () => {
  it('renders an empty grid', () => {
    render(<Grid data-testid="grid" />)

    const grid = screen.getByTestId('grid')
    expect(grid).toBeEmptyDOMElement()
  })
})
