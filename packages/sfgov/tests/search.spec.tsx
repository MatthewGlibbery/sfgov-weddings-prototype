import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { SearchResultsPageFactory } from '@/lib/factories'
import SearchPage from '../pages/search'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('search', () => {
  const mockUseRouter = useRouter as jest.Mock
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      query: { q: '' }
    })
  })

  it('renders a default search results page with a services list', () => {
    const data = SearchResultsPageFactory.make({ query: '', results: [] })
    render(<SearchPage {...data} />)
    expect(
      screen.getByText('Services', { selector: '.text-heading-lg-li' })
    ).toBeInTheDocument()
    expect(screen.getByText(data.services[0].title)).toBeInTheDocument()
  })

  it('renders a search results page with results', () => {
    const data = SearchResultsPageFactory.make()
    render(<SearchPage {...data} />)
    expect(
      screen.getByText(data.results[0].document.derivedStructData.title)
    ).toBeInTheDocument()
  })

  it('renders a "no results" search page', () => {
    const data = SearchResultsPageFactory.make({ results: [] })
    render(<SearchPage {...data} />)
    expect(
      screen.getByText("We don't have anything that matches your search")
    ).toBeInTheDocument()
    expect(
      screen.getByText('Services', { selector: '.text-heading-lg-li' })
    ).toBeInTheDocument()
  })

  it('renders a "no results" search page if the response contains undefined results', () => {
    const data = SearchResultsPageFactory.make({
      results: undefined
    })
    render(<SearchPage {...data} />)
    expect(
      screen.getByText("We don't have anything that matches your search")
    ).toBeInTheDocument()
    expect(
      screen.getByText('Services', { selector: '.text-heading-lg-li' })
    ).toBeInTheDocument()
  })
})

describe('search vertex analytics', () => {
  beforeEach(() => {
    ;(window as any).dataLayer = []
    const mockUseRouter = useRouter as jest.Mock
    mockUseRouter.mockReturnValue({
      query: { q: 'affordable housing' }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('pushes reset, view_search_results, and vertex_search on initial load', async () => {
    const pushSpy = jest.spyOn(window.dataLayer, 'push')
    const data = SearchResultsPageFactory.make({
      query: 'affordable housing',
      normalizedQuery: 'affordable housing'
    })
    render(<SearchPage {...data} />)
    expect(pushSpy).toHaveBeenCalledTimes(3)

    // first call: reset function
    expect(typeof pushSpy.mock.calls[0][0]).toBe('function')

    // second call: event payload
    expect(pushSpy.mock.calls[1][0]).toEqual(
      expect.objectContaining({
        event: 'view_search_results',
        search_term: 'affordable housing',
        contentType: undefined,
        partnerAgencies: undefined,
        primaryAgency: undefined
      })
    )

    expect(pushSpy.mock.calls[2][0]).toEqual(
      expect.objectContaining({
        event: 'vertex_search',
        cloud_retail: {
          eventType: 'search',
          visitorId: 'id-replaced-in-gtm',
          searchQuery: 'affordable housing',
          attributionToken: data.attributionToken
        }
      })
    )
  })

  it('pushes the expected vertex cloud retail object on search result click', async () => {
    const pushSpy = jest.spyOn(window.dataLayer, 'push')
    const data = SearchResultsPageFactory.make({
      query: 'affordable housing',
      normalizedQuery: 'affordable housing'
    })
    data.results[0].document.derivedStructData.title = 'Affordable Housing'
    data.results[0].document.derivedStructData.link =
      'https://www.sf.gov/affordable-housing'
    render(<SearchPage {...data} />)
    const resultLink = screen.getByRole('link', { name: 'Affordable Housing' })
    await userEvent.click(resultLink)
    expect(pushSpy).toHaveBeenCalledTimes(4) // 3 on load + 1 on click
    expect(pushSpy.mock.calls[3][0]).toEqual(
      expect.objectContaining({
        event: 'vertex_search_click',
        cloud_retail: {
          eventType: 'search',
          visitorId: 'id-replaced-in-gtm',
          searchQuery: 'affordable housing',
          productDetails: [{ product: { id: data.results[0].id } }],
          attributionToken: data.attributionToken
        }
      })
    )
  })

  it('prevents redirect on disallowed hosts in search results links', async () => {
    const warnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined)
    const pushSpy = jest.spyOn(window.dataLayer, 'push')
    const data = SearchResultsPageFactory.make({
      query: 'test'
    })
    data.results[0].document.derivedStructData.title = 'Test Result'
    data.results[0].document.derivedStructData.link =
      'https://malicious-site.com/phishing'
    render(<SearchPage {...data} />)
    const resultLink = screen.getByRole('link', { name: 'Test Result' })
    await userEvent.click(resultLink)
    expect(pushSpy).toHaveBeenCalledTimes(4) // 3 on load + 1 on click
    const event = pushSpy.mock.calls[3][0] as { eventCallback?: () => void }
    event.eventCallback?.()
    // assert warning
    expect(warnSpy).toHaveBeenCalled()
    // assert push
    expect(pushSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'vertex_search_click'
      })
    )
  })
})
