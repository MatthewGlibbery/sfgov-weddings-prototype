import { render, screen } from '@testing-library/react'
import { createStyledIcon, SVGIcon } from './SVGIcon'
import { IconAccessibility } from '@/design-system'

describe('SVGIcon', () => {
  it('renders an SVGIcon', () => {
    render(<SVGIcon data-testid="svg" />)

    const svg = screen.getByTestId('svg')
    expect(svg).toBeInTheDocument()
  })

  it('creates an SVGIcon from an icon component', () => {
    const Icon = createStyledIcon(IconAccessibility, { width: 10, height: 10 })
    const IconWithoutSize = createStyledIcon(IconAccessibility)
    render(<Icon data-testid="styled-icon" />)
    render(<IconWithoutSize data-testid="styled-icon2" />)

    const icon = screen.getByTestId('styled-icon')
    const iconWithoutSize = screen.getByTestId('styled-icon2')
    expect(icon).toBeInTheDocument()
    expect(iconWithoutSize).toBeInTheDocument()
  })

  it('throws an error if no icon component is present', () => {
    expect(() => {
      const Icon = createStyledIcon(null)
      render(<Icon />)
    }).toThrowError()
  })
})
