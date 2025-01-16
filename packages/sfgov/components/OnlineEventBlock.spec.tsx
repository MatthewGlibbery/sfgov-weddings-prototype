import { InfoPageFactory, OnlineEventFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { OnlineEventBlock } from './OnlineEventBlock'

describe('OnlineEventBlock', () => {
  it('renders the online event block', () => {
    const fixture = OnlineEventFactory.make()
    render(<OnlineEventBlock {...fixture.value} />)
    expect(screen.getByText(fixture.value.description)).toBeInTheDocument()
  })

  it('renders the online event block with the button link to an internal page', () => {
    const fixture = OnlineEventFactory.make({
      value: {
        link: {
          link_to: 'page',
          link_text: 'some link text',
          url: '',
          page: InfoPageFactory.make()
        }
      }
    })
    render(<OnlineEventBlock {...fixture.value} />)
    expect(
      screen.getByRole('link', { name: 'some link text' })
    ).toBeInTheDocument()
  })
})
