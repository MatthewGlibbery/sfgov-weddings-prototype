import { render, screen } from '@testing-library/react'
import { BaseTile, TileSection, TileTitle } from './Tile'

describe('Tile', () => {
  it('renders an empty TileSection', () => {
    render(<TileSection data-testid="tile-section" />)

    const tileSection = screen.getByTestId('tile-section')
    expect(tileSection).toBeEmptyDOMElement()
  })

  it('renders a BaseTile with a title', () => {
    render(
      <BaseTile href='#'>
        <TileTitle>Hello</TileTitle>
      </BaseTile>
    )

    const baseTile = screen.getByRole('link')
    const title = screen.getByText('Hello')
    expect(baseTile).toContainElement(title)
  })
})
