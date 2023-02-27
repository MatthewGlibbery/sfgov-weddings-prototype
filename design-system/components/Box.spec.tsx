import { render, screen } from '@testing-library/react'
import { Box } from './Box'

describe('Box', () => {
  it('renders an empty Box', () => {
    render(<Box data-testid="box" />)

    const box = screen.getByTestId('box')
    expect(box).toBeEmptyDOMElement()
  })
})
