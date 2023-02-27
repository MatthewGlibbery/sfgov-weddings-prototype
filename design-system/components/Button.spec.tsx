import { render, screen } from '@testing-library/react'
import { Button, InverseButton, LinkButton, PrimaryButton, SecondaryButton } from './Button'

describe('Button', () => {
  it('renders a button', () => {
    render(<Button />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  it('renders a primary button', () => {
    render(<PrimaryButton data-testid="primary" />)

    const button = screen.getByTestId('primary')
    expect(button).toBeInTheDocument()
  })

  it('renders a secondary button', () => {
    render(<SecondaryButton data-testid="secondary" />)

    const button = screen.getByTestId('secondary')
    expect(button).toBeInTheDocument()
  })

  it('renders an inverse button', () => {
    render(<InverseButton data-testid="inverse" />)

    const button = screen.getByTestId('inverse')
    expect(button).toBeInTheDocument()
  })

  it('renders a link button', () => {
    render(<LinkButton data-testid="link" />)

    const button = screen.getByTestId('link')
    expect(button).toBeInTheDocument()
  })
})
