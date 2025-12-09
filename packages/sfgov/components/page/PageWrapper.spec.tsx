import { render, screen, waitFor } from '@testing-library/react'

import { PageWrapper } from './PageWrapper'
import { useRouter } from 'next/router'
import { SitewideAlertBlockFactory } from '@/lib/factories'
import type { MockedRouter } from '__mocks__/next/router'

jest.mock('next/router', () => ({ useRouter: jest.fn() }))
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [
          SitewideAlertBlockFactory.make({ alert_text: 'alert' }),
          SitewideAlertBlockFactory.make({ alert_text: 'alerta', lang: 'es' })
        ]
      })
  })
) as jest.Mock

describe('<PageWrapper>', () => {
  const data = {
    items: [SitewideAlertBlockFactory.make()]
  }
  beforeEach(() => {
    useRouter.mockReturnValue({ pathname: '/' })
  })

  it('renders a <title> as "SF.gov" by default', async () => {
    render(<PageWrapper />)
    const title = screen.getAllByText('SF.gov')
    expect(title[0].nodeName).toBe('TITLE')
  })

  it('renders a page title as "{title} | SF.gov"', async () => {
    render(<PageWrapper title="Page title" />)
    const title = screen.getByText('Page title | SF.gov')
    expect(title.nodeName).toBe('TITLE')
  })

  it('renders the desired meta tags', async () => {
    const meta = {
      type: 'sf.ContentType',
      locale: 'en',
      html_url: 'https://some-url.com',
      description: 'Test description'
    }
    render(
      <PageWrapper title="some page title" meta={meta}>
        <div>Test content</div>
      </PageWrapper>
    )
    expect(screen.getByTestId('meta-test-type')).toHaveAttribute(
      'content',
      meta.type
    )
    expect(screen.getByTestId('meta-test-locale')).toHaveAttribute(
      'content',
      meta.locale
    )
    expect(screen.getByTestId('meta-test-description')).toHaveAttribute(
      'content',
      meta.description
    )
    expect(screen.queryByTestId('meta-test-html_url')).not.toBeInTheDocument()
    expect(screen.queryByTestId('meta-robots')).not.toBeInTheDocument()
  })

  it('renders a noindex meta tag for search results page', async () => {
    useRouter.mockReturnValue({ pathname: '/search' })
    render(<PageWrapper title="Page title" />)
    expect(screen.getByTestId('meta-robots')).toHaveAttribute(
      'content',
      'noindex, follow'
    )
  })

  it('renders the google site verification meta tag', async () => {
    render(
      <PageWrapper title="some page title">
        <div>Test content</div>
      </PageWrapper>
    )
    expect(screen.getByTestId('meta-google-site-verification')).toHaveAttribute(
      'name',
      'google-site-verification'
    )
  })

  it('sets the locale to spanish and renders the spanish alert banner', async () => {
    ;(useRouter as MockedRouter).mockImplementationOnce(() => ({
      locale: 'es'
    }))
    render(<PageWrapper />)
    await waitFor(() => {
      expect(screen.getByText('alerta')).toBeInTheDocument()
    })
  })
})
