import { render, screen } from '@testing-library/react'
import { PageWrapper } from './PageWrapper'

describe('<PageWrapper>', () => {
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
})
