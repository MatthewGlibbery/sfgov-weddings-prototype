import { render, screen } from '@testing-library/react'
import { DocumentLink } from './DocumentLink'
import { DocumentValueFactory } from '@/lib/factories'

describe('DocumentLink', () => {
  const document = DocumentValueFactory.make()
  it('renders a DocumentLink', () => {
    render(<DocumentLink document={document} />)

    const link = screen.getByRole('link')
    expect(link).toHaveTextContent(document.title)
  })

  it('does not render a DocumentLink', () => {
    const deletedDoc = { ...document, file: '' }
    render(<DocumentLink document={deletedDoc} />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
