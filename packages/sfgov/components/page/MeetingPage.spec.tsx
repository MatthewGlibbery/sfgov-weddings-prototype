import { MeetingPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { MeetingPage } from './MeetingPage'

describe('MeetingPage', () => {
  const page = MeetingPageFactory.make()

  it('renders a meeting page', () => {
    render(<MeetingPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })
})
