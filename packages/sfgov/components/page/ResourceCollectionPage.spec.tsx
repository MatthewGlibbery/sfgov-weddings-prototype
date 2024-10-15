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
  it('renders a resource collection page', () => {
    const page = ResourceCollectionPageFactory.make()
    render(<ResourceCollectionPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })

  it('does not render a paragraph w/o description', () => {
    const page = ResourceCollectionPageFactory.make({
      description: undefined
    })
    render(<ResourceCollectionPage page={page} />)
    expect(screen.queryByTestId('page-description')).not.toBeInTheDocument()
  })

  it('does not render related topics list w/o topics', () => {
    const page = ResourceCollectionPageFactory.make({
      topics: []
    })
    render(<ResourceCollectionPage page={page} />)
    expect(screen.queryByTestId('related-topics-list')).not.toBeInTheDocument()
  })

  it('does not render the agencies list w/o agencies', () => {
    const page = ResourceCollectionPageFactory.make({
      partner_agencies: []
    })
    render(<ResourceCollectionPage page={page} />)
    expect(
      screen.queryByTestId('partner-agencies-list')
    ).not.toBeInTheDocument()
  })
})
