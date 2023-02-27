import { render, screen } from '@testing-library/react'
import { Flex } from './Flex'

describe('Flex', () => {
  it('renders an empty flex', () => {
    render(<Flex data-testid="flex" />)

    const flex = screen.getByTestId('flex')
    expect(flex).toBeEmptyDOMElement()
  })
})
