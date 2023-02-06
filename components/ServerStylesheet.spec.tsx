import ServerStylesheet from './ServerStylesheet'
import { render, screen, configure } from '@testing-library/react'

configure({
  testIdAttribute: 'id'
})

describe('ServerStylesheet', () => {
  it('renders the <style> element for critical CSS', () => {
    render(<ServerStylesheet />)
    const sheet = screen.queryByTestId('sfgov-ssr-css')
    expect(sheet).toBeInTheDocument()
  })

  it.skip('renders the <link> tags for Google Fonts', () => {
    render(<ServerStylesheet />)
    const links = screen.queryAllByRole('link')
    expect(links).toHaveLength(3)
  })
})
