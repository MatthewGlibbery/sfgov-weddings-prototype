import { PageData } from '@/types'
import { render, screen } from '@testing-library/react'
import PageLink from './PageLink'

describe('PageLink', () => {
  it('renders the page URL as the href', () => {
    const page: PageData = {
      meta: {
        url_path: '/foo',
        type: 'foo'
      }
    }
    render(<PageLink page={page}>test</PageLink>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/foo')
  })

  it('renders the provided children', () => {
    const page: PageData = {
      title: 'Page title',
      meta: {
        url_path: '/foo',
        type: 'foo'
      }
    }
    render(<PageLink page={page}>test</PageLink>)
    const link = screen.getByRole('link')
    expect(link).toHaveTextContent('test')
  })

  it('renders the page title if no children are provided', () => {
    const page: PageData = {
      title: 'Page title',
      meta: {
        url_path: '/foo',
        type: 'foo'
      }
    }
    render(<PageLink page={page} />)
    const link = screen.getByRole('link')
    expect(link).toHaveTextContent(page.title)
  })
})
