import { DataStoryPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { DataStoryPage } from './DataStoryPage'

const observe = jest.fn()
const unobserve = jest.fn()
const disconnect = jest.fn()

// @ts-expect-error erg
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect
}))

describe('DataStoryPage', () => {
  const page = DataStoryPageFactory.make()

  it('renders a meeting page', () => {
    render(<DataStoryPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })
})
