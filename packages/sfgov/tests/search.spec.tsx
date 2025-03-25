import { render, screen } from '@testing-library/react'
import { SearchResultsPageFactory } from '@/lib/factories'
import SearchPage from '../pages/search'

describe('search', () => {
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
})
