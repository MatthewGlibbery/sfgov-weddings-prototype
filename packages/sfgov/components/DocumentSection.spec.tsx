import { DocumentSectionBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { DocumentSectionBlock } from './DocumentSection'

describe('DocumentSectionBlock', () => {
  const documentSectionBlock = DocumentSectionBlockFactory.make()
  it('renders a document section block with a title and documents', () => {
    render(<DocumentSectionBlock {...documentSectionBlock.value} />)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
  })
})
