import { EmbeddedContentFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { EmbeddedContentBlock } from './EmbeddedContentBlock'

describe('EmbeddedContentBlock', () => {
  it('renders the embedded content block', async () => {
    const fixture = EmbeddedContentFactory.make()
    render(<EmbeddedContentBlock {...fixture.value} />)
    expect(await screen.getAllByTitle(fixture.value.alt_text).length).toBe(2)
  })

  it('renders the embedded content block without data notes', async () => {
    const fixture = EmbeddedContentFactory.make()
    fixture.value.data_notes = ''
    render(
      <EmbeddedContentBlock
        {...fixture.value}
        data-testid="embedded-no-notes"
      />
    )
    expect(screen.queryByTestId('embedded-no-notes')).not.toBeInTheDocument()
  })

  it('renders the embedded content block without source data', async () => {
    const fixture = EmbeddedContentFactory.make()
    fixture.value.source_data = ''
    render(
      <EmbeddedContentBlock
        {...fixture.value}
        data-testid="embedded-no-source"
      />
    )
    expect(screen.queryByTestId('embedded-no-source')).not.toBeInTheDocument()
  })

  it('renders the embedded content block with navigation instructions', async () => {
    const fixture = EmbeddedContentFactory.make()
    render(<EmbeddedContentBlock {...fixture.value} />)
    const navInstructEl = screen.getByTestId('embed-nav-instructions')
    expect(navInstructEl).toHaveClass('sr-only')
    navInstructEl.focus()
    expect(navInstructEl).not.toHaveClass('sr-only')
  })
})
