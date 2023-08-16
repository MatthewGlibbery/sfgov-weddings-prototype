import { OnlineEventFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { OnlineEventBlock } from './OnlineEventBlock'

describe('OnlineEventBlock', () => {
  it('renders the online event block', () => {
    const fixture = OnlineEventFactory.make()
    render(<OnlineEventBlock {...fixture.value} />)
    expect(screen.getByText(fixture.value.description)).toBeInTheDocument()
  })
})
