import { NewsPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { NewsPage } from './NewsPage'

describe('NewsPage', () => {
  const page = NewsPageFactory.make()

  it('renders a news page', () => {
    render(<NewsPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })

  describe('primary agency', () => {
    it('renders if present', () => {
      render(<NewsPage page={page} />)
      expect(screen.getByText(page.primary_agency!.title)).toBeInTheDocument()
    })
    it('does not render if empty', () => {
      render(<NewsPage page={{ ...page, primary_agency: null }} />)
      expect(
        screen.queryByText(page.primary_agency!.title)
      ).not.toBeInTheDocument()
    })
  })
})
