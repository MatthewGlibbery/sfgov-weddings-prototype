import { ResourceCollectionPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { ResourceCollectionPage } from './ResourceCollectionPage'

const observe = jest.fn()
const unobserve = jest.fn()
const disconnect = jest.fn()

// @ts-expect-error erg
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect
}))

describe('ResourceCollectionPage', () => {
  const page = ResourceCollectionPageFactory.make()

  it('renders a resource collection page', () => {
    render(<ResourceCollectionPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })
})
