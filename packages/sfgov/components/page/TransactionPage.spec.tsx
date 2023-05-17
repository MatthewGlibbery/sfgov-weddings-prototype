import { TransactionPageFactory } from '@/lib/factories'
import { PageProps } from '@/types'
import { render, screen } from '@testing-library/react'
import { TransactionPage } from './TransactionPage'

describe('TransactionPage', () => {
  const fixture = TransactionPageFactory.make()

  const pageProps: Omit<PageProps, 'page'> = {
    path: '/some-transaction-page',
    locale: 'en'
  }

  it('renders the page title', () => {
    render(<TransactionPage page={fixture} {...pageProps} />)
    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(fixture.title)
  })

  describe('description', () => {
    it('renders if present', () => {
      render(<TransactionPage page={fixture} {...pageProps} />)
      const description = screen.getByText(fixture.description, {
        selector: 'p'
      })
      expect(description).toBeInTheDocument()
    })

    it('does not render if empty', async () => {
      render(<TransactionPage page={{ ...fixture, description: '' }} {...pageProps} />)
      expect(screen.queryByTestId('step-by-step-description')).not.toBeInTheDocument()
    })
  })

  it.each([
    { what: 'related_content_agencies', input: fixture.related_content_agencies[0].page_content.title },
    { what: 'things_to_know', input: fixture.things_to_know[0].value.title },
    { what: 'what_to_do', input: fixture.what_to_do[0].type },
    { what: 'custom_section', input: fixture.custom_section[0].value.title },
    { what: 'special_cases', input: fixture.special_cases[0].value.title },
    { what: 'good_for_community', input: fixture.good_for_community[0].value.title },
    { what: 'get_help', input: fixture.get_help[0].value.title },
    { what: 'get_help', input: fixture.get_help[1].value.owner }
  ])('renders the $what section when present', ({ input }) => {
    render(<TransactionPage page={fixture} {...pageProps} />)

    const section = screen.getByText(input)
    expect(section).toBeInTheDocument()
  })

  it.each([
    { what: 'related_content_agencies' },
    { what: 'things_to_know' },
    { what: 'what_to_do' },
    { what: 'custom_section' },
    { what: 'special_cases' },
    { what: 'good_for_community' },
    { what: 'get_help' }
  ])('does not render the $what section when not present', ({ what }) => {
    // @ts-expect-error 'blegh'
    fixture[what] = []
    render(<TransactionPage page={fixture} {...pageProps} />)

    expect(screen.queryByTestId(`${what}-section`)).not.toBeInTheDocument()
  })
})
