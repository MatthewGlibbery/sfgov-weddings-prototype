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

  it('does not render a paragraph w/o description', () => {
    const page = ResourceCollectionPageFactory.make({
      description: undefined
    })
    render(<ResourceCollectionPage page={{ ...page, description: '' }} />)
    expect(screen.queryByTestId('page-description')).not.toBeInTheDocument()
  })

  it('does not render related topics list w/o topics', () => {
    render(<ResourceCollectionPage page={{ ...page, topics: [] }} />)
    expect(screen.queryByTestId('related-topics-list')).not.toBeInTheDocument()
  })

  it('does not render the agencies list w/o agencies', () => {
    render(<ResourceCollectionPage page={{ ...page, partner_agencies: [] }} />)
    expect(
      screen.queryByTestId('partner-agencies-list')
    ).not.toBeInTheDocument()
  })

  describe('primary agency', () => {
    it('renders if present', () => {
      render(<ResourceCollectionPage page={page} />)
      expect(screen.getByText(page.primary_agency!.title)).toBeInTheDocument()
    })
    it('does not render if empty', () => {
      render(
        <ResourceCollectionPage page={{ ...page, primary_agency: null }} />
      )
      expect(
        screen.queryByText(page.primary_agency!.title)
      ).not.toBeInTheDocument()
    })
  })
})
