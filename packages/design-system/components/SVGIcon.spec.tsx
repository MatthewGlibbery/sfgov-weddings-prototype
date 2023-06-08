import React from 'react'
import { render, screen } from '@testing-library/react'
import { SVGIcon } from './SVGIcon'

describe('SVGIcon', () => {
  it('renders an SVGIcon', () => {
    render(<SVGIcon data-testid='svg' />)

    const svg = screen.getByTestId('svg')
    expect(svg).toBeInTheDocument()
  })
})
