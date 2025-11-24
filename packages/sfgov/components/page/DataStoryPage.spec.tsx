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

  it('renders a data story page', () => {
    render(<DataStoryPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })

  describe('primary agency', () => {
    it('renders if present', () => {
      render(<DataStoryPage page={page} />)
      expect(screen.getByText(page.primary_agency!.title)).toBeInTheDocument()
    })
    it('does not render if empty', () => {
      render(<DataStoryPage page={{ ...page, primary_agency: null }} />)
      expect(
        screen.queryByText(page.primary_agency!.title)
      ).not.toBeInTheDocument()
    })
  })
})
