import { CalloutFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { Callout } from './Callout'

describe('Callout', () => {
  const fixture = CalloutFactory.make()

  it('renders the info icon', () => {
    render(<Callout html={fixture.value} />)

    const icon = screen.getByTestId('info-icon')
    expect(icon).toBeInTheDocument()
  })

  it('renders the callout text', () => {
    render(<Callout html={fixture.value} />)

    const text = screen.queryByText(fixture.value)
    expect(text).toBeInTheDocument()
  })
})
