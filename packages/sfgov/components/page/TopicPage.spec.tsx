import { TopicPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { TopicPage } from './TopicPage'

describe('TopicPage', () => {
  const fixture = TopicPageFactory.make()

  it('renders the page title', () => {
    render(<TopicPage page={fixture} />)
    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(fixture.title)
  })
})
