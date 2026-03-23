import React from 'react'
import { render, screen } from '@testing-library/react'
import { Tile } from './Tile'

describe('Tile', () => {
  it('renders a link with a heading', () => {
    render(<Tile heading="Tile heading" href="/" />)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
    expect(link).toHaveTextContent('Tile heading')
  })

  it('renders the tile description', () => {
    render(
      <Tile
        heading="Tile heading"
        href="/"
        description="This is the description"
      />
    )
    const desc = screen.getByTestId('tile-description')
    expect(desc).toBeInTheDocument()
    expect(desc).toHaveTextContent('This is the description')
  })

  describe('icon prop', () => {
    it('renders the icon component with the expected attributes', () => {
      function Icon(props: JSX.IntrinsicElements['svg']) {
        return <svg {...props} />
      }

      render(<Tile icon={Icon} heading="Icon test" href="#" />)
      const icon = screen.getByTestId('tile-icon')
      expect(icon).toBeInTheDocument()
      expect(icon.tagName).toBe('svg')
      expect(icon.classList).toContain('size-20')
    })
  })
})
