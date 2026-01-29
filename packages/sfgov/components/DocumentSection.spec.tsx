import { DocumentSectionBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { DocumentSectionBlock } from './DocumentSection'

describe('DocumentSectionBlock', () => {
  it('renders a document section block with a title and documents', () => {
    const documentSectionBlock = DocumentSectionBlockFactory.make()
    render(<DocumentSectionBlock {...documentSectionBlock.value} />)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('does not render a title for document section if it does not exist ', () => {
    const documentSectionBlock = DocumentSectionBlockFactory.make({
      value: { title: undefined }
    })
    render(<DocumentSectionBlock {...documentSectionBlock.value} />)
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument()
  })
})
