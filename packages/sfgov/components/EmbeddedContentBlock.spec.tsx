import { EmbeddedContentFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { EmbeddedContentBlock } from './EmbeddedContentBlock'

describe('EmbeddedContentBlock', () => {
  it('renders the embedded content block', () => {
    const fixture = EmbeddedContentFactory.make()
    render(<EmbeddedContentBlock {...fixture.value} />)
    expect(screen.getByTitle(fixture.value.alt_text)).toBeInTheDocument()
  })
})
